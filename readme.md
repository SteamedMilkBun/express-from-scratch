# EXPRESS FROM SCRATCH

## The purpose of this assignment is to:
- build a server,
- create and populate a database,
- communicate with the database using postgres
- and handle CRUD operations in a RESTful way

### The database is written in SQL, 
which can be read using postgres. In order to use postgres to access the SQL data in the database, we will use psql, which is a front-end terminal to give commands to postgres. We will use a Docker volume to persist data while we use Postgres from within a Docker container. 

We will use the restful.js file to dynamically give commands to Postgres - based on user inputs - in order to perform RESTful CRUD operations on our database.

### Dependencies
- express
- nodemon
- pg