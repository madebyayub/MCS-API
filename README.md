# MCSS-API
An API that provides UTM'S MCSS program requirements and courses.

Current domain: api.uoftplanner.com

/programs

Returns a list of all programs within the MCSS department at UTM.

/courses/:course

Returns a list of all courses that match that course query by course code.

/programs/:program

Returns a list of all programs that match that program query by program code.

/program/requirements/:year/:code

Valid year: first, second, third, fourth
Provided a year, returns a list of course requirements for that year, for a program matched by code with the code query.
