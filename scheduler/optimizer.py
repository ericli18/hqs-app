from typing import Dict, List, Tuple, Literal, NamedTuple
from datetime import time
from ortools.sat.python import cp_model


EmployeeName = str
Day = Literal["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class Shift(NamedTuple):
    name: Literal["Morning", "Afternoon", "Evening"]
    start_time: time
    end_time: time

Availability = List[Tuple[Day, Shift]]

morning_shift = Shift("Morning", time(8, 0), time(16, 0))
afternoon_shift = Shift("Afternoon", time(12, 0), time(20, 0))
evening_shift = Shift("Evening", time(16, 0), time(22, 0))

shifts: List[Shift] = [morning_shift, afternoon_shift, evening_shift]

employees: Dict[EmployeeName, Availability] = {
    "Phil": [("Monday", morning_shift), ("Tuesday", afternoon_shift)],
    "Emma": [("Wednesday", evening_shift), ("Thursday", morning_shift)],
    "David": [("Friday", afternoon_shift), ("Saturday", morning_shift)],
    "Rebecca": [("Sunday", evening_shift)]
}

shift_durations: Dict[Literal["Morning", "Afternoon", "Evening"], int] = {
    "Morning": 8, "Afternoon": 8, "Evening": 6
}

headcounts: Dict[Day, Dict[Literal["Morning", "Afternoon", "Evening"], int]] = {
    "Monday": {"Morning": 2, "Afternoon": 3, "Evening": 1},
    "Tuesday": {"Morning": 2, "Afternoon": 2, "Evening": 1},
    "Wednesday": {"Morning": 3, "Afternoon": 3, "Evening": 2},
    "Thursday": {"Morning": 2, "Afternoon": 2, "Evening": 1},
    "Friday": {"Morning": 3, "Afternoon": 4, "Evening": 2},
    "Saturday": {"Morning": 3, "Afternoon": 3, "Evening": 2},
    "Sunday": {"Morning": 2, "Afternoon": 2, "Evening": 1}
}

days: List[Day] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

model = cp_model.CpModel()

# Variables: x[(employee, day, shift)] = 1 if the employee is assigned to the shift on the day
x = {}

for employee in employees:
    for day, shift in [(d, s) for d in headcounts for s in shifts]:
        x[(employee, day, shift.name)] = model.new_bool_var(f'{employee}_{day}_{shift.name}')

# Constraint: Each employee works at most one shift per day
for employee in employees:
    for day in headcounts:
        model.add(sum(x[employee, day, shift.name] for shift in shifts) <= 1)

# Constraint: Employees only work on their available days and shifts
for employee, availability in employees.items():
    for day in headcounts:
        for shift in shifts:
            if (day, shift) not in availability:
                model.add(x[(employee, day, shift.name)] == 0)

# Constraint: Employees work a maximum of 40 hours per week
for employee in employees:
    model.add(sum((x[(employee, day, shift.name)] * shift_durations[shift.name]) 
        for day in headcounts for shift in shifts) <= 40)

# Constraint: Adhere to headcounts (hard constaint)
# for day, needed in headcounts.items():
#     for shift in shifts:
#         model.add(sum(x[(employee, day, shift.name)] for employee in employees) == needed[shift.name])


# Constraint: No morning shift after an evening shift 
# for employee in employees:
#     for i in range(len(days)):
#         nextIndex = i + 1 if i + 1 < len(days) else 0
#         model.add(x[(employee, days[i], evening_shift.name)] + x[(employee, days[nextIndex], morning_shift.name)] <= 1)
        

# Constraint: Soft headcount constraints
for day, shifts_needed in headcounts.items():
    for shift in shifts:
        required = shifts_needed[shift.name]
        assigned = sum(x[(employee, day, shift.name)] for employee in employees)

        # Penalize under-staffing or over-staffing
        model.add(assigned <= required)
        model.minimize(10 * (required - assigned))

# Constraint: Equalize the number of shifts assigned to each employee
# total_shifts = sum([sum(headcounts[day][shift.name] for shift in shifts) for day in headcounts])
# for employee, availability in employees.items():
#     num_shifts_assigned = sum(x[(employee, day, shift.name)] for day, shift in availability)
#     model.Minimize(abs(total_shifts // len(employees) - num_shifts_assigned))


# Custom Solution Printer
class SolutionPrinter(cp_model.CpSolverSolutionCallback):
    def __init__(self, x, employees, shifts, headcounts):
        cp_model.CpSolverSolutionCallback.__init__(self)
        self._x = x
        self._employees = employees
        self._shifts = shifts
        self._headcounts = headcounts
        self._solution_count = 0

    def OnSolutionCallback(self):
        self._solution_count += 1
        print(f'Solution {self._solution_count}:')
        for employee in self._employees:
            for day in self._headcounts:
                for shift in self._shifts:
                    if self.Value(self._x[(employee, day, shift.name)]):
                        print(f'  {employee} works on {day} during {shift.name} shift.')
        print()

    def SolutionCount(self):
        return self._solution_count

# # Create the solver and solution printer
# solver = cp_model.CpSolver()
# solution_printer = SolutionPrinter(x, employees, shifts, headcounts)

# # Search for all solutions
# solver.SearchForAllSolutions(model, solution_printer)

# # Output the number of solutions found
# print(f'Number of solutions found: {solution_printer.SolutionCount()}')

solver = cp_model.CpSolver()
status = solver.solve(model)

for employee in employees:
    for day in days:
        for shift in shifts:
            if (status != cp_model.OPTIMAL and status != cp_model.FEASIBLE):
                print('no feasible solution')
                exit()
            if solver.value(x[employee, day, shift.name]):
                print(f'{employee} - {day} - {shift.name}')

# Constraints:
# Phase 1:
# - No employee works more than 40 hours or on days they aren't scheduled (done)
# - No employee works more than 1 shift per day (done)
# - employees can't go from a night shift to a morning shift(must be an 8 hour gap miminum)
# - Soft constraint on headcounts, but high weight
# - Try to keep # of shifts per employee as equal as possible relative to days available to work
# Phase 2:
# - Employees generally have the same shifts as the last weeks
# - Employees can also have shifts they would rather not work
# Phase 3:
# - Scheduling doesn't have to happen one week at a time, we can do lookahead or
#   other ways to try to keep the schedule balanced throughout the week