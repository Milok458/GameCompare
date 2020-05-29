<h1>Game Compare</h1>
<p>This application is a catalogue of video games where users can consult reviews for games, as well as build their own bookmark catalogue.</p>
<p>The following is a list of all endpoints for the backend:</p>
<ul>
    <li>POST /user creates a new user in db</li>
    <li>PATCH /user updates the values of a user, using the body as parameters</li>
    <li>GET /users/:username obtains a user by its username</li>
    <li>POST /game creates a new game in db</li>
    <li>GET /games gets all games in db</li>
    <li>GET /games/:id gets game in db by ID</li>
    <li>PATCH /game updates the values of a game, using the body as parameters</li>
    <li>DELETE /game/:id deletes game using ID as parameter</li>
    <li>POST /comment creates a new comment in db</li>
    <li>GET /comments gets all comments in db</li>
    <li>DELETE /comment/:id deletes comment using ID as parameter</li>
</ul>