# Backend_IOT

## Fix for `MongooseError: Operation users.findOne() buffering timed out after 10000ms`

That error happens when Mongoose isn’t connected to MongoDB yet (or can’t connect at all). Queries get **buffered** and then time out.

This project now starts the HTTP server **only after** `mongoose.connect()` succeeds, so you’ll get a clear startup failure instead of random request-time timeouts.

## Configure MongoDB connection

Set `MONGODB_URI` (and optionally `MONGODB_DBNAME`) in your environment.

### Windows cmd.exe

```bat
set MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster-host>/<optional-db>?retryWrites=true&w=majority
set MONGODB_DBNAME=IOT
node server.js
```

### Notes

- If you’re using MongoDB Atlas, make sure:
  - your IP is allowed in **Network Access**
  - the username/password are correct
  - the cluster is running
- If you see `Failed to connect to MongoDB. Server will not start.`, the URI or network access is still wrong.

