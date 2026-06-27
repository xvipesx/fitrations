import os

DB_PATH = os.environ.get("DB_PATH", "fitrations.db")
BACKUP_DIR = os.environ.get("BACKUP_DIR", "./backups")