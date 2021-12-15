# Devroom Eco Bot

This small bot will give coins to users when they perform certain actions.

## Commands

A `/balance` command is available for everyone. This will show your current money and the actions you can perform.

## Actions

- Send a message - 1 coin
- Join a voice channel - 2 coins

## Technical part

The plugin uses a Mongo database to store user data.

There is a simple cache manager which will keep track of the user data. This is to prevent database calls every time a
user requests his balance or writes in chat.