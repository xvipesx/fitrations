## [0.0.0] - 2026-06-11
- Database management functions to add, delete, or modify items.
- Bug fixes
- Inclusion of daily intake calculations for accurate daily tracking against goals.
- Added goal update mechanism
## [0.0.0] - 2026-05-23
- Established daily pull to populate journal entries
- Changed formatting styles in Journal Component
- Modifications to journal date query function and inclusion of possible helper function for consistency
## [0.0.0] - 2026-05-23
- Completed addition of food journal routers and modified router handling of UUIDs to distinguish the journal UUID from database UUID.
- Updated database SQL statement to ensure column consistency
- Added food journal database management functions
- Established basic journal frontend search function
- Established FoodSearch component to act as a child of journal and pass selected item from database for future journal modifications
## [0.0.0] - 2026-05-20
- Modified primary display navigation to clarify components and add selection for a Calculator
- Added BMR calculator functionality
## [0.0.0] - 2026-05-19
- Changed backend file nesting
- Page now displays daily goal correctly
## [0.0.0] - 2026-05-18
- Added food search API router and ability to query foods in database by UUID
- Completed funcationality of nutrition goal API routing and database table functionality
- Separated database creation into multiple functions into main.py for simplicity, including schema checks on all tables.
- Database now consists of 3 separate tables: 1 food database table, a journal table and a goals table
## [0.0.0] - 2026-05-17
- Established extremely basic front end via REACT and VITE.
- Began UX design decisions
## [0.0.0] - 2026-05-05
- Working sqlite3 database creation
- Separated database query and UUID functions into the database.py file
- Added router files for summary, goals and general food database management
## [0.0.0] - 2026-05-01
- Separated main backend program to create a dedicated API router location for import
## [0.0.0] - 2026-04-24
- Set basic Pydantic base models for various classes
- Implemented two API endpoint functions to cover adding foods with their calories and macros, and another to query if a food is included.
- Established a local Uvicorn web server to conduct API testing
## [0.0.0] - 2026-04-21
- Initial concept established and project layout considered

