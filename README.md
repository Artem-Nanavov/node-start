# CWuS-API

If you don't have knex installed: run the command `npm i knex -g`

If you don't have postgreSQl: you cant install postgreSQL here
Or leave it empty and use the [here][postgreSQL link].

[postgreSQL link]: https://www.postgresql.org/download/

first time:

Run: `npm i`

Run: `knex migrate:latest`

Run: `npm run dev`

API port: 8000

## Errors codes


`Authentication`
~~~~
0 - Invalid login or password
1 - User already exist
2 - User not found
~~~~

`Authorization`
~~~~
3 - Invalid access token
4 - Invalid refresh token
5 - Invalid tokens
6 - Token has expired
~~~~

## API endpoints


`/auth/reg`
~~~~
Description:
    Registers new user and returns cookie with sid or access/refresh token in response data and some user data

Protocol:
    http

Method:
    POST

Request body data:
    email: string;
    username: string;
    password: string;

Response cookie with sid;

OR

Response data:
	access: string;
    refresh: string;
~~~~


`/auth/login`
~~~~~
Description:
    user auth, returns cookie with sid or access/refresh tokens in response data and some user data

Protocol:
    http

Method:
    POST

Request body data:
    email: string;
    password: string;

Response cookie with sid;

OR

Response data:
	access: string;
    refresh: string;
~~~~~

`/user/me`
~~~~
Description:
    get user info, return info about user

Protocol:
    http

Method:
    GET

Request header data:
    Authorization: Bearer ur access token

OR

Request cookie data:
    sid

Response data:
    username: string;
    user_id: string;
    email: string;
~~~~

`/user/logout`
~~~~
Description:
    logout user

Protocol:
    http

Method:
    POST

Request header data:
    Authorization: Bearer ur access token
Request body data:
    refresh: string;

OR

Request cookie data:
    sid
~~~~

`/user/refresh-tokens`
~~~~
Description:
    update ur tokens, and returning new tokens

Protocol:
    http

Method:
    POST

Request header data:
    Authorization: Bearer ur access token
Request body data:
    refresh: string;

Response data:
    username: string;
    user_id: string;
    email: string;
~~~~

`/user/isAuth`
~~~~
Description:
    check user is authorized

Protocol:
    http

Method:
    POST

Request header data:
    Authorization: Bearer ur access token


OR

Request cookie data:
    sid
~~~~
