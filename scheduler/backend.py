from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class Shift(BaseModel):
    headcount: int


class Day(BaseModel):
    shifts: list[Shift]


class WeekScheduleRequest(BaseModel):
    location: str
    days: list[Day]


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/scheduler")
async def make_schedule():
    return {"schedule": "people"}


# Response Models
class ScheduledShift(BaseModel):
    start_time: str
    end_time: str
    employees: list[str]


class ScheduledDay(BaseModel):
    date: str
    shifts: list[ScheduledShift]


class WeekScheduleResponse(BaseModel):
    location: str
    days: list[ScheduledDay]


@app.post("/generate_schedule", response_model=WeekScheduleResponse)
async def generate_schedule(request: WeekScheduleRequest):
    try:
        #Implement scheduling algorithm
        return WeekScheduleResponse(
            location=request.location,
            days=[
                ScheduledDay(
                    date="2024-09-22",
                    shifts=[
                        ScheduledShift(
                            start_time="09:00",
                            end_time="17:00",
                            employees=["Employee1", "Employee2"],
                        )
                    ],
                )
            ],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
