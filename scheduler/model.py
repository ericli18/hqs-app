from ortools.sat.python import cp_model
import pandas as pd

model = cp_model.CpModel()

employees = {
    "Phil": [],
    "Emma": [],
    "David": [],
    "Rebecca": [],
    "Michael": [],
    "Sarah": [],
    "Daniel": [],
    "Olivia": [],
    "James": [],
    "Sophie": [],
}
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
shifts = ["Morning", "Afternoon", "Evening"]

# add shift durations
shift_durations = {"Morning": 8, "Afternoon": 8, "Evening": 6}

headcounts = {
    "Monday": {"Morning": 2, "Afternoon": 3, "Evening": 1},
    "Tuesday": {"Morning": 2, "Afternoon": 2, "Evening": 1},
    "Wednesday": {"Morning": 3, "Afternoon": 3, "Evening": 2},
    "Thursday": {"Morning": 2, "Afternoon": 2, "Evening": 1},
    "Friday": {"Morning": 3, "Afternoon": 4, "Evening": 2},
    "Saturday": {"Morning": 3, "Afternoon": 3, "Evening": 2},
    "Sunday": {"Morning": 2, "Afternoon": 2, "Evening": 1},
}

schedule = {
    e: {
        d: {s: model.new_bool_var(f"schedule_{e}_{d}_{s}") for s in shifts}
        for d in days
    }
    for e in employees
}

# Objective: Minimize total understaffing
#difference between headcount and actual staff
understaff = {}
for d in days:
    for s in shifts:
        understaff[(d, s)] = model.NewIntVar(0, headcounts[d][s], f'understaff_{d}_{s}') # Upper bound is headcount

for d in days:
    for s in shifts:
        model.Add(sum(schedule[e][d][s] for e in employees) + understaff[(d, s)] == headcounts[d][s])

model.Minimize(sum(understaff[(d, s)] for d in days for s in shifts))

#TODO Objective: Minimize difference shifts worked based off availability of employees 
#TODO Objective: Keep the same shift type for employees throughout the week
# One shift per day constraint
for e in employees:
    for d in days:
        model.add(sum(schedule[e][d][s] for s in shifts) <= 1)

# 40-hour work week constraint
for e in employees:
    total_hours = sum(
        schedule[e][d][s] * shift_durations[s] for d in days for s in shifts
    )
    model.add(total_hours <= 40)

# TODO: Constraint: No more than 6 consecutive days worked
solver = cp_model.CpSolver()
status = solver.solve(model)

if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
    schedule_data = []
    for e in employees:
        employee_hours = 0
        for d in days:
            for s in shifts:
                if solver.value(schedule[e][d][s]):
                    schedule_data.append(
                        {
                            "Employee": e,
                            "Day": d,
                            "Shift": s,
                            "Hours": shift_durations[s],
                        }
                    )
                    employee_hours += shift_durations[s]
        print(f"{e}: {employee_hours} hours")

    df = pd.DataFrame(schedule_data)
    print(df)
else:
    print("No solution found.")
