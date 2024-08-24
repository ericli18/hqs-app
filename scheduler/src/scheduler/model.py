from ortools.sat.python import cp_model
import pandas as pd

model = cp_model.CpModel()
employees = {
    "Phil": [],
    "Emma": [],
    "David": [],
    "Rebecca": [],
}
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
shifts = ["Morning", "Afternoon", "Evening"]

schedule = {
    e: {
        d: {s: model.new_bool_var(f"schedule_{e}_{d}_{s}") for s in shifts}
        for d in days
    }
    for e in employees
}

for e in employees:
    for d in days:
        model.add(sum(schedule[e][d][s] for s in shifts) == 1)
        
print(schedule["Phil"]["Monday"]["Morning"])

solver = cp_model.CpSolver()
status = solver.solve(model)

print(status, cp_model.OPTIMAL, cp_model.FEASIBLE)

if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
    schedule_data = []

    for e in employees:
        for d in days:
            for s in shifts:
                if solver.value(schedule[e][d][s]):
                    schedule_data.append({
                        'Employee': e,
                        'Day': d,
                        'Shift': s
                    })

    df = pd.DataFrame(schedule_data)

    print(df)
else:
    print("No solution found.")