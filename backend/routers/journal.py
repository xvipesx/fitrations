from fastapi import APIRouter, HTTPException
from backend.models import Journal

import backend.database

router = APIRouter()