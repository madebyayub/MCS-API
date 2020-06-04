# MCSS-API
An API that provides UTM'S MCSS program requirements and courses.

Current domain: localhost:3001

/api/programs

Returns a list of all programs within the MCSS department at UTM.

/api/courses/:course

Returns a list of all courses that match that course query by course code.

/api/programs/:program

Returns a list of all programs that match that program query by program code.

/api/program/requirements/:year/:code

Valid year: first, second, third, fourth
Provided a year, returns a list of course requirements for that year, for a program matched by code with the code query.
