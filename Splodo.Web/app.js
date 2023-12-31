const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

app.use(express.static(path.join("./Splodo.Web.App", "dist")));
const httpServer = http.createServer(app);

httpServer.listen(8000, () => {
  console.log("listening on 8000");
});

// For any other route, serve the index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Splodo.Web.App/dist", "index.html"));
});
