const express = require("express");
const app = express();
const http = require("http");

const httpServer = http.createServer(app);

// Test endpoint.
app.get(
    "/ping", (req, res) => {
        res.send("pongping")
    }
  );


httpServer.listen(4000, () => {
	console.log("listening on 4000");
});
