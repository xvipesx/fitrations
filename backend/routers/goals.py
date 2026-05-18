from fastapi import APIRouter, HTTPException
from backend.models import Goal

import backend.database

router = APIRouter()

@router.post("/initial_goal")
def set_goal(goal: Goal):
    result = backend.database.set_initial_goal(goal)
    return result

@router.get("/retrieve_goal")
def obtain_goal():
    result = backend.database.retrieve_goal()
    return result

@router.post("/modify_goal")
def modify_goal(goal: Goal):
    result = backend.database.modify_goal(goal)
    return result