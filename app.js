const express = require('express')

const app = express()

app.use(express.json())

app.get('/', async(req,res) =>{
  const data = {
    status : "200",
    data : "baju",
  }
  res.status(200).json({
    status: {
      code: 200,
      message: "Success"
    },
    data: data
  })
})

const port = 8080
app.listen(port, ()=>{
  console.log(
    `listening on port http://localhost:${port}`
    )
});

