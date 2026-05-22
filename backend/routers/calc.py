from fastapi import APIRouter, HTTPException
from models import CalcBMR

import calculators

router = APIRouter()

@router.post("/calc")
def get_bmr(data: CalcBMR):
    result = calculators.calc_bmr(data)
    return result