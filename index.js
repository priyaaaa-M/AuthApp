const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000;



app.use(express.json());

require("./config/database").connect();



// Use cookie-parser

app.use(cookieParser());


//route import and  moute

const user = require("./route/User")

app.use("/api/v1/user", user);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});