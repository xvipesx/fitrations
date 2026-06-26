from fastapi import APIRouter, HTTPException
from models import FoodItem

from db import foods

router = APIRouter()

@router.get("/foods")
def get_all_foods():
    result = foods.query_all_foods()
    return result

# The food search capability has to reside before any ID search options below, as the ID search will attempt to query the provided string.
@router.get("/foods/search")
def search_foods(query: str):
    result = foods.search_foods(query)
    if result is None:
        raise HTTPException(status_code=404, detail="No foods found.")
    return result

@router.post("/foods")
def add_food(food: FoodItem):
    result = foods.add_food(food)
    if result is None:
        raise HTTPException(status_code=404, detail="Unable to add the food item into the database.")
    return result

@router.delete("/clear_foods")
def delete_all_food():
    result = foods.clear_db()
    return result

# APIs below run based on a provided UUID that matches the FOOD_UUID in the database. 

@router.get("/foods/{id}")
def get_food(id: str):
    result = foods.return_food(id)
    if result is None:
        raise HTTPException(status_code=404, detail="Food item cannot be found by the provided ID.")
    return result

@router.delete("/foods/{id}")
def delete_food(id: str):
    result = foods.delete_food(id)
    if result is None:
        raise HTTPException(status_code=404, detail="Food item cannot be found by the provided ID.")
    return result

@router.put("/foods/{id}")
def modify_food(id: str, food: FoodItem):
    result = foods.modify_food(id, food)
    if result is None:
        raise HTTPException(status_code=404, detail="There was an issue in modifying the food item. Please check the submission again.")
    return result

