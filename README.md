# Chikn Tinder API Documentation

## Overview

Chikn Tinder API is an application backend for a brand new premiere dating and rating app for poultry which is going straight to the moon. It provides the ability to submit new chickens for rating, get a list of all chickens, and rate existing chickens with an updoot or downdoot.

## Configuration

The API uses environment variables for its configuration. The following environment variables are used:

- `DB_USER`: Database user (default: 'postgres')
- `DB_HOST`: Database host (default: 'localhost')
- `DB_NAME`: Database name (default: 'chikn_tinder')
- `DB_PASS`: Database password (default: 'postgres')
- `DB_PORT`: Database port (default: 5432)
- `PORT`: API listening port (default: 5000)

## Endpoints

### `GET /all`

This endpoint retrieves all chickens, sorted by the score (the difference between the number of updoots and downdoots) in descending order and then by name. Each chicken object has the following properties:

- `id`: The unique identifier of the chicken.
- `name`: The name of the chicken.
- `location`: The location of the chicken.
- `imgUrl`: The image URL of the chicken.
- `description`: The description of the chicken.
- `updoots`: The number of updoots (upvotes) the chicken has received.
- `downdoots`: The number of downdoots (downvotes) the chicken has received.
- `score`: The score of the chicken, calculated as `updoots - downdoots`.

### `POST /new`

This endpoint creates a new chicken. The request body should be a JSON object with the following properties:

- `name`: The name of the chicken (required).
- `location`: The location of the chicken (required).
- `imgUrl`: The image URL of the chicken (required).
- `description`: The description of the chicken (required).

Upon success, the API will respond with the ID of the created chicken and a success message. If any required field is missing, the API will respond with a 400 status code and a message indicating invalid data.

### `PUT /updoot`

This endpoint updoots (upvotes) a chicken. The request body should be a JSON object with the following property:

- `id`: The ID of the chicken to updoot (required).

Upon success, the API will respond with the updated chicken object and a success message. If the chicken is not found, the API will respond with a 404 status code and a message indicating that the chicken was not found.

### `PUT /downdoot`

This endpoint downdoots (downvotes) a chicken. The request body should be a JSON object with the following property:

- `id`: The ID of the chicken to downdoot (required).

Upon success, the API will respond with the updated chicken object and a success message. If the chicken is not found, the API will respond with a 404 status code and a message indicating that the chicken was not found.

## Errors

In addition to the errors mentioned above, all endpoints will respond with a 500 status code and a message indicating an internal server error if something goes wrong on the server.
