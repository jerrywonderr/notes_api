# Notes API
## Description
A simple API built on Node.js to help users create and manage notes. 
## How to consume this API
To get started, (create an account)[https://notesapi.cyclic.app/], then you can use those credentials to get an access token. This token should be placed in the header of every request with the key of `X-Access-Token`.

The following actions can be carried out on this API:
* Create a user - POST - /auth/user/new (can be accessed without an access token)
* Get access token for authentication - POST - /auth/login (can be accessed without an access token)
* Create a note - POST - /notes/new
* Get all notes - GET - /notes/all
* Get a note - GET - /notes/<hash_code>
* Update a note - PUT - /notes/<hash_code>
* Delete a note - DELETE - /notes/<hash_code>

More details can be found on the (wiki page)[https://github.com/JerryWonder2126/notes_api/wiki]