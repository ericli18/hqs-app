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

for d in days:
    for s in shifts:
        model.add(sum(schedule[e][d][s] for e in employees) == headcounts[d][s])

# They work up to one shift a day...
for e in employees:
    for d in days:
        model.add(sum(schedule[e][d][s] for s in shifts) <= 1)


solver = cp_model.CpSolver()
status = solver.solve(model)

print(status, cp_model.OPTIMAL, cp_model.FEASIBLE)

if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
    schedule_data = []

    for e in employees:
        for d in days:
            for s in shifts:
                if solver.value(schedule[e][d][s]):
                    schedule_data.append({"Employee": e, "Day": d, "Shift": s})

    df = pd.DataFrame(schedule_data)

    print(df)
else:
    print("No solution found.")
