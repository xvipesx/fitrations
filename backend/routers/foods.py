from fastapi import APIRouter, HTTPException
from backend.models import FoodItem

import backend.database

router = APIRouter()

@router.get("/foods")
def get_all_foods():
    result = backend.database.query_all_foods()
    return result

@router.get("/foods/{id}")
def get_food(id: str):
    return id

@router.post("/foods")
def add_food(food: FoodItem):
    result = backend.database.add_food(food)
    return result

@router.delete("/foods/{id}")
def delete_food(id: str):
    result = backend.database.delete_food(id)
    if result is None:
        raise HTTPException(status_code=404, detail="Food not found.")
    return result

@router.put("/foods/{id}")
def modify_food(id: str, food: FoodItem):
    result = backend.database.modify_food(id, food)
    if result is None:
        raise HTTPException(status_code=404, detail="Food not found.")
    return result