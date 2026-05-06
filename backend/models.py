from pydantic import BaseModel
from datetime import datetime

class FoodItem(BaseModel):
    name: str
    calories: int
    protein: float
    carbs: float
    fat: float

class Journal(BaseModel):
    food_uuid: str
    portion: float
    meal_type: str
    timestamp: datetime

class Goal(BaseModel):
    calorie_goal: int
    protein_goal: float
    carbs_goal: float
    fat_goal: float