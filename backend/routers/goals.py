from fastapi import APIRouter, HTTPException
from models import Goal

import database

router = APIRouter()

@router.post("/initial_goal")
def set_goal(goal: Goal):
    result = database.set_initial_goal(goal)
    return result

@router.get("/retrieve_goal")
def obtain_goal():
    result = database.retrieve_goal()
    return result

@router.put("/modify_goal")
def modify_goal(goal: Goal):
    result = database.modify_goal(goal)
    return result