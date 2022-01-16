# Minimalist Chatrooms

## What it is

A practice app using `socket.io` to emulate chat rooms. Code is based off of <i>Node.js in Action</i> by Mike Cantelon, et al.

## How it is used

Visit github pages (coming soon).

Locally: Clone the repo down to your desktop and run `node server.js`. The app is hosted on `localhost:3000`.

Features multiple rooms for users to join. Rooms without a user will be automatically deleted.

Slash Commands:
```
/join <name of room>  // joins a room
/nick <name>          //assigns the user a name
```

## Disadvantages/Issues

The <u>Node.js in Action</u> was published in 2014 and contains some deprecated code. Some of the code was refactored to accomodate current versions of `Socket.io` (v4).
