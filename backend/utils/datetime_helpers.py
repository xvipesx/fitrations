from zoneinfo import ZoneInfo
from datetime import datetime
import os

TIMEZONE = os.environ.get("TIME_ZONE", "America/New_York")

# Dedicated function to be called when database needs current DTG
# Must be called as needed to ensure DTG isn't cached at runtime
def get_date():
    set_timezone = ZoneInfo(TIMEZONE)
    now = datetime.now()
    # Adjust current date and time based on user preference
    adjusted_now = now.astimezone(set_timezone)
    formatted_date = adjusted_now.strftime("%Y-%m-%d")
    return formatted_date