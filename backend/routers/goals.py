from fastapi import APIRouter, HTTPException
from models import Goal

from db import goals

router = APIRouter()

@router.get("/retrieve_goal")
def obtain_goal():
    result = goals.retrieve_goal()
    return result

@router.put("/modify_goal")
def modify_goal(goal: Goal):
    result = goals.modify_goal(goal)
    return result