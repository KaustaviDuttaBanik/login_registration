# login_registration
A restful API for registration, login and getUserList

1. Endpoint for registration: http://localhost:8000/user/Registration (POST)
email, password, firstName, lastName, empId, organizationName - All are mandatory fields

a) you cannot use same email id or employee Id for registration
b) email id should be a valid email id

2. Endpoint for login: http://localhost:8000/user/Login (POST)
email, password are the mandatory fields

a) you will get a JWT token when both email and password are valid

3. Endpoint for getUserList without pagination: http://localhost:8000/user/getUserList (GET)
4. Endpoint for getUserList with pagination: http://localhost:8000/user/getUserList?page=1&limit=1 (GET)

a) you need to pass 'authorization-token' in headers in order to access the userlist
b) you can fetch data with firstName, lastName & empID(you can enter each field or in combination or all of them together):
c) you need to enter fields "sortBy" and "orderBy" in order sort data. You can sort data using 
   email, firstName, lastName, empId and organizationName. orderBy should be either "Asc" or "Desc".

 
5. There are two MongoDB tables - user and employee
6. There should be a .env file in root folder with DB_CONNECTION(connection link from MongoDB) and SECRET_TOKEN(you can define anything for this) details.
   
Any endpoint hits the index.js and from there routes are called accordingly. Data folder contains the table structures. schemaValidation validates the request body.
