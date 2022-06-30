const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const flightData = require("./flightData.json")
const app = express();
const fs = require('fs');

app.use(json());

// app.use('/', routes);


// 1. Add/Book Flight
app.post('/', (req, res)=>{
  // get the data sent from client & add it to the flightdata array
  flightData.push(req.body);
  // console log data
  // console.log(data);  
  // stringify the json file
  let stringifiedData = JSON.stringify(flightData, null, 2);
  fs.writeFile('flightData.json', stringifiedData, (err)=>{
    if(err){
    return res.status(500).json({message: err})
    }
})
  

  // send a response back to the client
  res.status(200).json({message: "new user created"}) 
  
})

// 2. Get all Flight
app.get('/', (req, res)=>{
  // send all flightdata
  return res.json({flightData})
})

// 3. Get a single Flight
app.get('/:id', (req,res)=>{
  // store the params in an id variable
  let id = req.params.id
  console.log(id);
  // query the array with the id
  const searchResult = flightData.find(data => {
    return data.time === id
  })
  if(searchResult){
    return res.status(200).json({user: searchResult})
  }else{
    return res.status(404).json({message: "user not found"})
  }
  // if id matches any, return found else return error 404 flight not found
})

// 4. Update/Edit Flight


// 5. Delete Flight

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
