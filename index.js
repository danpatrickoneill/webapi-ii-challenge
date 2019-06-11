const express = require("express");

express.json();

const apiRoutes = require("./api/apiRoutes");

const server = express();

server.use(express.json());

const port = 3000;

server.use("/api", apiRoutes);

server.listen(port, () => console.log(`Server running on port ${port}`));
