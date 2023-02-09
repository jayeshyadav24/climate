var x = document.getElementById("location");

// console.log("*********----------////////////")

function getWeatherData(latitude, longitude) {
  let apiKey = "b25ca364bc04acd2ca3e3aa725eb7097";
  let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;


  let map = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={b25ca364bc04acd2ca3e3aa725eb7097}`;

  fetch(weatherAPIUrl)
    .then((response) => response.json())
    .then((data) => {
      // alert(JSON.stringify(data));
      renderWeatherData(data);
    })
    .catch((error) => {
      alert(error);
    });

    
}



function renderWeatherData(data) {
  let locationElement = document.getElementById("location");
  locationElement.innerText = `${data.name}`;

  let weatherPara = document.getElementById("forecast");
  let iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  console.log(typeof data.main.temp);

  weatherPara.innerHTML = `<span class="line1"><div>Temperature = <span id="tempCelcius">${data.main.temp.toFixed(2)}</span><span id="sign">&#8457; </span></div> <div>Weather = ${data.weather[0].description}.</div> <img id="icon" src="${iconUrl}"></span>`;
}

function tempCelcius() {
  var t = document.getElementById("button1");
  if (t.value == "ON") {
    t.value = "OFF";

    let temperature = document.getElementById("tempCelcius").innerText;
    temperature = ((temperature - 32) * (5 / 9)).toFixed(2);
    document.getElementById("tempCelcius").innerText = `${temperature}`;

    document.getElementById("sign").innerHTML = "&#8451";

    t.innerHTML = `temp &#8457; `; 
  } else {
    t.value = "ON";

    let temperature = document.getElementById("tempCelcius").innerText;
    temperature = (temperature * (9 / 5) + 32).toFixed(2);
    document.getElementById("tempCelcius").innerText = `${temperature}`;

    document.getElementById("sign").innerHTML = "&#8457";

    t.innerHTML = "temp &#8451; ";
  }
}

function successCallback(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;

  let { latitude, longitude } = position.coords;

  getWeatherData(latitude, longitude);
}

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
