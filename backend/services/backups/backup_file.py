from zipfile import ZipFile

from utils import datetime_helpers

class BackupFile:
    def __init__(self, file):
        self.target = file

    def compress(self):
        timestamp = datetime_helpers.file_timestamp()
        archive = f"FitRationsDB_{timestamp}.zip"
        with ZipFile(archive, mode='x') as zip_file:
            zip_file.write(self.target)
