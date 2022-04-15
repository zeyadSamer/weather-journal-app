// Setup empty JS object to act as endpoint for all routes
let projectData={};

// Require Express to run server and routes
const express= require('express');
// Start up an instance of app
const app =express();
/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

//choosing our port to run our server
const port=8080;
const server = app.listen(port,listening);

//this function informs us that the server is running when setting up completes

function listening(){
  console.log('server running on local host:',port);
}


//making a GET route for our application when it requests to get data from server
app.get('/all',(req,res)=>{

//it sends the projectdata to /all
 res.send(projectData);
 
  
});


//making a POST route for our app when it requets to post data to the server
app.post('/add',(req,res)=>{
 
  //storing the desired data (req.body)
 const dataReceived=req.body;
 //logging in the console the received data
 console.log('server recieved:',dataReceived);
 
 //storing the received data in the object project data

projectData={
  temperature:dataReceived.temp,
  date:dataReceived.date,
  userResponse:dataReceived.userResponse,


}

 
});







