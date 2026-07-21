## [0.3.0] - 2026-07-20
- Feature: Implemented calendar date selection for journal entries
- Feature: Include pre and post workout options for meal types
- Feature: TDEE calculator now allows for imperial or metric calculations
- Bugfix: Fixed rounding error with partial portions in macro calculations
- UI: Various UI styling changes for organization and more flexible layout
## [0.2.0] - 2026-06-27
- Bugfix: Journal now highlights selected items separately from hover
- Bugfix: Calorie and macro goals update in the right panel on modify without needing page refresh
- Feature: Calculator provides TDEE values with user activity selection
- Feature: Dedicated Settings panel
- Feature: Database backup implemented that also downloads a compressed database copy to user
- Feature: Added visible version number
## [0.1.0] - 2026-06-22
- Publish first image and set version 0.1.0.
## [Unreleased]
### 2026-06-22
- Journal entry date and time are now pulled on journal submissions
- Environment variable set for user to set their own timezone
- Add logos and branding
### 2026-06-21
- Set default goals to 0
- Removed unnecessary code
### 2026-06-19
- Various UI updates
- Database config changes to support containerization
- Establish supervisord config for management of multiple internal container services
### 2026-06-18
- Various UI updates
### 2026-06-17
- Established Dockerfiles and compose file to provide containerization capability.
### 2026-06-15
- Established database clearing capability
- Management of individual journal entries on selection and clearing of entire journal
### 2026-06-13
- Code cleanup and various UI updates
### 2026-06-11
- Began migration from inline styles to dedicated CSS files.
- UI updates
### 2026-06-11
- Database management functions to add, delete, or modify items.
- Bug fixes
- Inclusion of daily intake calculations for accurate daily tracking against goals.
- Added goal update mechanism
### 2026-05-23
- Established daily pull to populate journal entries
- Changed formatting styles in Journal Component
- Modifications to journal date query function and inclusion of possible helper function for consistency
### 2026-05-23
- Completed addition of food journal routers and modified router handling of UUIDs to distinguish the journal UUID from database UUID.
- Updated database SQL statement to ensure column consistency
- Added food journal database management functions
- Established basic journal frontend search function
- Established FoodSearch component to act as a child of journal and pass selected item from database for future journal modifications
### 2026-05-20
- Modified primary display navigation to clarify components and add selection for a Calculator
- Added BMR calculator functionality
### 2026-05-19
- Changed backend file nesting
- Page now displays daily goal correctly
### 2026-05-18
- Added food search API router and ability to query foods in database by UUID
- Completed funcationality of nutrition goal API routing and database table functionality
- Separated database creation into multiple functions into main.py for simplicity, including schema checks on all tables.
- Database now consists of 3 separate tables: 1 food database table, a journal table and a goals table
### 2026-05-17
- Established extremely basic front end via REACT and VITE.
- Began UX design decisions
### 2026-05-05
- Working sqlite3 database creation
- Separated database query and UUID functions into the database.py file
- Added router files for summary, goals and general food database management
### 2026-05-01
- Separated main backend program to create a dedicated API router location for import
### 2026-04-24
- Set basic Pydantic base models for various classes
- Implemented two API endpoint functions to cover adding foods with their calories and macros, and another to query if a food is included.
- Established a local Uvicorn web server to conduct API testing
### 2026-04-21
- Initial concept established and project layout considered

