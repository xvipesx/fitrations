from pydantic import BaseModel

class FoodItem(BaseModel):
    name: str
    calories: int
    protein: float
    carbs: float
    fat: float
    serving_size: str

class Journal(BaseModel):
    food_uuid: str
    meal_type: str
    portion: float

class Goal(BaseModel):
    calorie_goal: int
    protein_goal: float
    carbs_goal: float
    fat_goal: float

class calcData(BaseModel):
    weight: float
    height: float
    age: int
    sex: str
    activity: str
    measurement: str
