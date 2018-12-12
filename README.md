# indoor

> A Vue.js project

## Running the project:
1. In the terminal, run the command: 
`yarn install`
3. After dependencies are finished to be installed, run the command: 
`yarn run dev`
4. Open your browset at: `http://localhost:8080​`

##Notes:
1. For testing reasons, the diff time between 2 missions of the same type is 10 **seconds** (and not minutes), so you can see this feature implemented.
2. I've exported a REST API to manipulated the DB fields (battery & location for now).

### How to use the REST API:
1. In the terminal, run the command: 
`yarn run server` 
2. Send a PUT request (with Postman or similar app):
>* Address: http://localhost:8081/api/robots/1 
>* Headers: Content-Type: application/json
>* Body (for example...):
```json
{
 "battery": 50,
 "location": {
  "lang": 2323.47547,
  "lat": -45665.565
 }
}

```
