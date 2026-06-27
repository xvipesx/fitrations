from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os

from services.backups.backup_file import BackupFile
from db.connection import DB_PATH

router = APIRouter()

@router.get('/backup_db')
async def download_db():
    db_file = BackupFile(DB_PATH)
    zip_path = db_file.compress()
    filename = os.path.basename(zip_path)
    return FileResponse(path=zip_path, media_type="application/octet-stream", filename=filename)