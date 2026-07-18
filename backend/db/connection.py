import os

# Environment variables come directly from the Docker compose file the user can modify. We set the variables here
# to ensure they are globally updated due to the import of this file across the other db files. 
# Backup default option as ./backups included for development purposes.

DB_PATH = os.environ.get("DB_PATH", "fitrations.db")
BACKUP_DIR = os.environ.get("BACKUP_DIR", "./backups")