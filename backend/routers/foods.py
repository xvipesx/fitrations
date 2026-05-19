from fastapi import APIRouter, HTTPException
from models import FoodItem

import database

router = APIRouter()

@router.get("/foods")
def get_all_foods():
    result = database.query_all_foods()
    return result

@router.get("/foods/{id}")
def get_food(id: str):
    result = database.return_food(id)
    return result

@router.post("/foods")
def add_food(food: FoodItem):
    result = database.add_food(food)
    return result

@router.delete("/foods/{id}")
def delete_food(id: str):
    result = database.delete_food(id)
    if result is None:
        raise HTTPException(status_code=404, detail="Food not found.")
    return result

@router.put("/foods/{id}")
def modify_food(id: str, food: FoodItem):
    result = database.modify_food(id, food)
    if result is None:
        raise HTTPException(status_code=404, detail="Food not found.")
    return result

@router.get("/foods/search")
def search_foods(query: str):
    result = database.search_foods(query)
    if result is None:
        raise HTTPException(status_code=404, detail="No foods found.")
    return result