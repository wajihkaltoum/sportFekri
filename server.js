// import app.js
const app = require("./backend/app");

// BE server is listening on http://localhost:3000
app.listen(3000, () => {
    console.log("express application is listening on port 3000 ...");
});