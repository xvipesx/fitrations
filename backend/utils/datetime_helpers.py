from zoneinfo import ZoneInfo
from datetime import datetime, timezone
import os

TIMEZONE = os.environ.get("TIME_ZONE", "America/New_York")
SET_TIMEZONE = ZoneInfo(TIMEZONE)

# Dedicated function to be called when database needs current DTG
# Must be called as needed to ensure DTG isn't cached at runtime

def get_date():
    utc_now = datetime.now(timezone.utc)
    # Adjust current date and time based on user preference
    adjusted_now = utc_now.astimezone(SET_TIMEZONE)
    formatted_date = adjusted_now.strftime("%Y-%m-%d")
    return formatted_date

def file_timestamp():
    utc_now = datetime.now(timezone.utc)
    adjusted_now = utc_now.astimezone(SET_TIMEZONE)
    adjusted_timestamp = adjusted_now.strftime("%Y-%m-%d_%H%M%S") # No spaces in timestamp format to match REGEX at frontend for proper filename
    return adjusted_timestamp