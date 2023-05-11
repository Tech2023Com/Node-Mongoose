const express = require('express')
const app = express()
const PORT = 8765
const UserRoutes = require('./Routes/UserRoutes')
const AdminRoutes =  require('./Routes/AdminRoutes')
const db = require('./DB/db')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))



app.use('/user', UserRoutes)
app.use('/admin' , AdminRoutes)










app.listen(PORT , ()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})