
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", function(req, res) {
    res.json({
        project: "Fitness Activity Tracker",
        status: "Server is running"
    });
});

app.listen(PORT, function() {
    console.log("Fitness Activity Tracker running at http://localhost:" + PORT);
});
