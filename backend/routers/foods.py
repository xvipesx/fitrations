from fastapi import APIRouter, HTTPException
from models import FoodItem

import database

router = APIRouter()

@router.get("/foods")
def get_all_foods():
    result = database.query_all_foods()
    return result

# Must come before any id searches so they do not override the specific route
@router.get("/foods/search")
def search_foods(query: str):
    result = database.search_foods(query)
    if result is None:
        raise HTTPException(status_code=404, detail="No foods found.")
    return result

@router.get("/foods/{id}")
def get_food(food_id: str):
    result = database.return_food(food_id)
    return result

@router.post("/foods")
def add_food(food: FoodItem):
    result = database.add_food(food)
    return result

@router.delete("/foods/{id}")
def delete_food(food_id: str):
    result = database.delete_food(food_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Food not found.")
    return result

@router.put("/foods/{id}")
def modify_food(food_id: str, food: FoodItem):
    result = database.modify_food(food_id, food)
    if result is None:
        raise HTTPException(status_code=404, detail="Food not found.")
    return result

