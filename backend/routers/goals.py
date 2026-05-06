from fastapi import APIRouter, HTTPException
from backend.models import Goal

import backend.database

router = APIRouter()

@router.post("/goal")
def set_goal(goal: Goal):
    backend.database.create_goal_table()
    result = backend.database.set_goal(goal)
    return result

@router.get("/goal")
def obtain_goal():
    result = backend.database.retrieve_goal()
    return result