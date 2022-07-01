const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const flightData = require("./flightData.json")
const app = express();
const fs = require('fs');

app.use(json());

// 1. Add/Book Flight
app.post('/', (req, res)=>{
  // get the data sent from client & add it to the flightdata array
  flightData.push(req.body); 
  // stringify the json file
  let stringifiedData = JSON.stringify(flightData, null, 2);
  fs.writeFile('flightData.json', stringifiedData, (err)=>{
    if(err){
    return res.status(500).json({message: err})
    }
})
  // send a response back to the client
  res.status(200).json({message: "new flight created"}) 
  
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
  // query the array with the id
  const searchResult = flightData.find(data => {
    return data.time === id
  })
  if(searchResult){
    return res.status(200).json({flight: searchResult})
  }else{
    return res.status(404).json({message: "flight not found"})
  }
  // if id matches any, return found else return error 404 flight not found
})

// 4. Update/Edit Flight
app.put('/:id', (req,res)=>{
  const {id} = req.params
  const {time} = req.body

  // query the array with the id
  const queryResult = flightData.find(data => {
    if(data.time === id){
      return data.time = time;
    }
    return data;
  })

  if(queryResult){
    let stringifiedData = JSON.stringify(flightData, null, 2);
    fs.writeFile('flightData.json', stringifiedData, (err)=>{
      if(err){
      return res.status(500).json({message: err})
      }
    })
    return res.status(200).json({message: "flight successfully updated"})
  }else{
    return res.status(404).json({message: "flight not found"})
  }
  // if id matches any, return found else return error 404 flight not found
  //  write the updata flightdata to the flightdata.json file
  
})

// 5. Delete Flight
app.delete('/:id', (req, res)=>{
  // check if the time matches any flight
  let {id} = req.params
  const flight = flightData.find(data => data.time === id);
  if(!flight){
    return res.status(404).json({message: "no flight matches this time"})
  }
  // filter the array with the id
  const newData = flightData.filter(data => data.time !== id)
  console.log(id, newData);
  if(newData){
    // if we have newData, write it to the json file
    let stringifiedData = JSON.stringify(newData, null, 2);
    fs.writeFile('flightData.json', stringifiedData, (err)=>{
      if(err){
      return res.status(500).json({message: err})
      }
    })
    return res.status(200).json({message: "flight successfuly deleted"})
  }else{
    return res.status(404).json({message: "flight not found"})
  }
  
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
