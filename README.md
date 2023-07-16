# Notes API
## Description
This is a simple API built on Node.js to help users create and manage notes. Basically, it's synonymous with an API-based backend of a note-taking application where users can create notes and perform basic CRUD operations on them. This API can be used for exactly just that, excusing the need to build out a full-fledged backend application to handle the notes. 

_*By the way, I have plans to niche this down to an API to manage tasks, that way, it will be more useful for frontend developers working on a simple task manager application. Yeah, so, be on the lookout if you're interested.*_
## How to consume this API
To get started, [create an account](https://notesapi.cyclic.app/), and then you can use those credentials to get an access token. This token should be placed in the header of every request with the key of `X-Access-Token`. You will find extensive info on how to use this API in the [wiki](https://github.com/JerryWonder2126/notes_api/wiki)

Here is a summary of actions that can be carried out on this API and their corresponding endpoint (do check the wiki for extensive info):
<table>
  <thead>
    <tr>
      <th>NO</th>
      <th>Action</th>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Create a user</td>
      <td>/auth/user/new</td>
      <td>POST</td>
      <td>This endpoint is responsible for creating a user account. This endpoint can be accessed without an access token, i.e., it doesn't require authentication. Alternatively, users can create accounts directly on the project's page.</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Get an access token</td>
      <td>/auth/login</td>
      <td>POST</td>
      <td>This endpoint returns the token that should be placed in the header of all requests sent to protected endpoints (this token must be sent with the key of X-Access-Token). It expects the user's email and password to verify the user's identity. It also doesn't require authentication.</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Create a note</td>
      <td>/notes/new</td>
      <td>POST</td>
      <td>This endpoint is responsible for creating a note.</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Get all notes</td>
      <td>/notes/all</td>
      <td>GET</td>
      <td>This endpoint fetches all notes owned by the auth user.</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Get a note</td>
      <td>/notes/<hash_code></td>
      <td>GET</td>
      <td>This endpoint finds and returns the note with the <code>id</code> of <code>hash_code</code> from the auth user's notes.</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Update a note</td>
      <td>/notes/<hash_code></td>
      <td>PUT</td>
      <td>
        This endpoint updates the note with the <code>id</code> of <code>hash_code</code> from the auth user's notes.
      </td>
    </tr>
    <tr>
      <td>7</td>
      <td>Delete a note</td>
      <td>/notes/<hash_code></td>
      <td>DELETE</td>
      <td>This endpoint deletes the note with the <code>id</code> of <code>hash_code</code> from the auth user's notes.</td>
    </tr>
  </tbody>
</table>

## Credit
 This project is inspired by Uptick Engineering Fellowship and was initially written to fulfil one of the requirements for joining the fellowship.
