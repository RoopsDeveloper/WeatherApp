
import { useEffect, useState } from "react"
import "./WeatherApp/Weather.css"
const App = ()=> {

  const[search,setsearch]=useState("")
  const[weather,setWeather]=useState({})
  let latitude;
  let longitude;
  useEffect(()=>{
    let a=document.querySelector("input")
    if(!navigator.geolocation){
      console.log('not available');
    }
    else{
      navigator.geolocation.getCurrentPosition(success,error);
      console.log('1');
    }
    function success(position){
      latitude=position.coords.latitude;
      longitude=position.coords.longitude;
      console.log(latitude,longitude);
      console.log('2');
      locDetails()

    }
    function error(){
      console.log("Unable to retrieve your location");
    }
    function locDetails(){
      fetch(`${api.base}?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(d=>setWeather(d))
      console.log('3');

    }
  },[search])
  
  
  const api ={
    key:"6c107568780ddef0d05e78dacef3817d",
    base:"https://api.openweathermap.org/data/2.5/weather"
  }
  function handlesearch(){
    fetch(`${api.base}?q=${search}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(d=>setWeather(d))
  }
  return(
    <div className="container">
    <section>
      <h1>Weather App</h1>
      <input className="border-2 bg-black text-white border-black" type="search"placeholder="Enter Your City" onChange={(e)=>setsearch(e.target.value)}></input>
      <br></br>
      <br></br>
      <button className="border-2 bg-black text-white border-black" onClick={handlesearch}>search</button>
      <br></br>
      <br></br>

      
      <div className="main">
        {(typeof weather.main !=="undefined")?(<div>
          <p>Location: {weather.name}</p>
          <br></br>
      
          <p>Temperature: {weather.main.temp} <sup>0</sup>c</p>
          <br></br>
      
          <p>Weather: {weather.weather[0].main}</p>
          <br></br>
      
          <p>Weather: {weather.weather[0].description}</p>
          
          </div>):("Not Found")}
      </div>
    </section>
    </div>

  )
}
export default App
