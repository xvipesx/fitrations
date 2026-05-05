from pydantic import BaseModel
from datetime import date, datetime

class FoodItem(BaseModel):
    name: str
    calories: int
    protein: float
    carbs: float
    fat: float

class FoodLog(BaseModel):
    food_uuid: str
    grams: float
    meal_type: str
    timestamp: datetime

class DailyGoal(BaseModel):
    date: date
    calorie_goal: int
    protein_goal: float
    carbs_goal: float
    fat_goal: float