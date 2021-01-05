# Scratch

This is a serverless backend API which uses triggers events on a third-party PubSub service to which the front-end client responds in real-time. This is an extension of an app built by Serverless Stack.

I’ve upgraded the simple 'Notes' app a bit by adding real-time collaboration.

The application is modified to allow users to collaborate with others. There’s now a `Collaboration` tab in the nav bar to reflect that. Without collaboration, notes a user creates show up on the `Home` page. With collaboration, a collaborator's notes will show up on the `Home` page as well. You can perform the same actions on a collaborator's notes that you can on your own notes.

## Real-Time

Real-time means that if you’re on the `Home` page, and one of your collaborators is also logged in, when they add or delete a note, you’ll see it show up without having to reload the page.

## How to Test Collaboration

- Create 2+ accounts
- Make the accounts collabors by following the instructions on the collaboration page
- Create some notes
- Open 2+ separate browsers
- Add / delete notes && observe the changes in real-time

## How It's Done

In order to real-time possible, events are broadcast with DynamoDB streams. The DynamoDB stream triggers a lambda which interacts with a third party service. The challenge with Lambda as opposed to a persistent backend is the they are ephemeral. In a traditional architecture, it would be possible for *n* clients to maintain a connection with a backend server through a websocket connection or server-sent events in order for real-time updates to take place.

With a serverless backend it’s necessary to incorporate a third-party service to allow a persistent connection. **Pusher** is used in this application to allow a websocket connection between browser clients (the react app) and allow triggering events from a Lambda on the backend.

## Future Work

There are several things I’d do to improve on the current state of the app:
- At present users reveal their user ids to their collaborators, and I’d hash those ids in the future.
- There’s an implied entity in that the notes on the `Home` page are listed. Those notes could be abstracted into `Notebooks` or `Lists` and allow collaboration at a list level.
- Also, it would be reasonable to provide granular permissions for what particular collaborators can do with notes, lists.
- At present, the React `Collaboration` page isn’t very modular and is a bit hideous from a *code-hygiene* standpoint.
- Further, the app lacks an abundance of tests. These are all examples of things that time could allow improving.