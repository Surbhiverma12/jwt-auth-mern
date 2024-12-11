const express = require("express")
const app = express()
const bodyParser = require("body-parser") //for getting data in parsed way from client to server
const cors = require("cors")
const AuthRouter = require('./routes/AuthRouter.js')
const productRouter = require('./routes/productRouter.js')

require("dotenv").config()
require('./models/db')
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', productRouter)

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})

// app.get("/" ,(req, res) => {
//     res.send("I'm root")
// })