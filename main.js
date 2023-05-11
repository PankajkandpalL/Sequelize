const express = require("express")
const { UserRoute } = require("./Routes/batch/.route")
const app = express()
app.use(express.json())

app.use("/api/batches", UserRoute)
app.use("/api/students", )

app.listen(8080, ()=>{
    console.log("Running on 8080 port")
})