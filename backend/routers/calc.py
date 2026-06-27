from fastapi import APIRouter
from models import calcData

import calculators

router = APIRouter()

@router.post("/calc")
def get_bmr(data: calcData):
    result = calculators.calc_tdee(data)
    return result