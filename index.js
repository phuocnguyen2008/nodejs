const express = require('express')
const app = express()
const port = 3000
// Route
app.get('/', (req, res) => {
    var a = 1;
    var c = a;
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})