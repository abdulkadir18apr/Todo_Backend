const express = require('express')
const env = require('dotenv').config({ path: __dirname + '/.env' })
const connectToMongo=require("./db");

 connectToMongo();





var cors = require('cors')

const app = express();

const port = 8000
app.use(cors())
//middleware
app.use(express.json())

//Routes

app.use('/api/auth',require("./routes/auth"))
app.use('/api/todo',require("./routes/todo"))


app.get('/', (req, res) => {
  res.send('Hello Abdul!')
})

app.listen(port, () => {
  console.log(`Todo Listneing on port ${port}`)
})