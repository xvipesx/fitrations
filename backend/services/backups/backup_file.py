from zipfile import ZipFile
import os

from utils import datetime_helpers
from db.connection import BACKUP_DIR

class BackupFile:
    def __init__(self, file):
        self.target = file

    def compress(self):
        timestamp = datetime_helpers.file_timestamp()
        filename = f"FitRationsDB_{timestamp}.zip"
        archive_path = os.path.join(BACKUP_DIR, filename)
        os.makedirs(BACKUP_DIR, exist_ok=True)
        with ZipFile(archive_path, mode='x') as zip_file:
            zip_file.write(self.target)
        return archive_path