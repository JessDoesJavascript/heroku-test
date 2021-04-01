const express = require('express');
const path = require('path');

const app = express();





const sendRouter = require('./src/routers/sendRouter')
const port = process.env.PORT || 5000
const cors = require("cors");


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
app.use(express.json())
app.use(sendRouter)

app.listen(port, () => console.log("Backend server live on " + port));