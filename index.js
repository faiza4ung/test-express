const express   = require('express');
const app       = express();
const PORT      = 9001

app.listen(PORT, (req,res)=>{
    console.log(`server run at http://localhost:${PORT}`)
})