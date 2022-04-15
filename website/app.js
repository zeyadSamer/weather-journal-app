

/* Global Variables */


const baseUrl='api.openweathermap.org/data/2.5/forecast?';

const apiKey='3685b3f8659ce3f81cc381117687b906&units=metric';
const generatingButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


//helper functions
// Async POST

//creating the postData function
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
  };
  
// creating an async function that gets the weather from api
const gettingWeatherData=async function(baseUrl,apiKey,zipCode)
{

    const completeUrl=`http://${baseUrl}zip=${zipCode},&appid=${apiKey}`;


    //fetching the weatherdata from api
    const apiData=await fetch(completeUrl);
    //transform the data in the form oj json
    const weatherData= await apiData.json();
    
    //if everything is good
    try{
        console.log('data recieved');
        return weatherData;
    }
    //if an error happened
    catch(error)
    {
        console.log('error:',error);


    }


}

//function that asks server to get our required data and update UI

async function  updateUI()
{

    // fetching the server data(project data object)
     const serverData=await fetch('http://localhost:8080/all');
     //transform fetched data to json
     fetchedData=await serverData.json();
    //getting the date div
    const dateDiv=document.getElementById('date');
    //getting the temperature div
    const tempDiv=document.getElementById('temp');
    //getting the content div
    const contentDiv=document.getElementById('content');
    
    //updating UI
    dateDiv.innerHTML=`Date: ${fetchedData.date}`;
    tempDiv.innerHTML=`Temperature: ${fetchedData.temperature} Celsius`;
    contentDiv.innerHTML=`I feel ${fetchedData.userResponse}`;




}

//main program


//listening for the click
generatingButton.addEventListener('click',()=>{
    
    //getting zip code value
    let zipCode=document.getElementById('zip').value;
    //getting feelings value
    let feelings=document.getElementById('feelings').value;

    

    //calling the getttingWeatherData function
    gettingWeatherData(baseUrl,apiKey,zipCode).then(function(weatherData){
        
        //storing weather temp from api fetched data
        const weatherTemp=weatherData.list[0].main.temp;

        //making apost request to the server to store our data 
        postData('http://localhost:8080/add',{date:newDate,temp:weatherTemp,userResponse:feelings});
        //updating theUI
        updateUI();


    })
    
    
});



    
