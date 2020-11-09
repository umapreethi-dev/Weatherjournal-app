// Personal API Key for OpenWeatherMap API
const key = "f2a7f269346e2cbdea428d67b574bd88";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = `&appid=${key}`;
const units = "&units=imperial";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performFunction);

/* Function called by event listener */
function performFunction() {
  let today = new Date();
  let date =
    (today.getMonth() + 1) + "-" + today.getDate() + "-" +   today.getFullYear();
  const zipCode = document.getElementById("zip").value;
  console.log(zipCode);
  const feelings = document.getElementById("feelings").value;
  console.log(feelings);
  let url = baseURL + zipCode + apiKey + units;
  console.log(url);
  getWeather(url).then(function (data) {
    console.log(data);
    postData("/add", {
      date: date,
      icon: data.weather[0].icon,
      city: data.name,
      temp: data.main.temp,
      feelings: feelings,
    });
    updateUI();
  });
}

/* Function to GET Web API Data*/
const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const apiData = await res.json();
    console.log(apiData);
    return apiData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("content").textContent = "The Weather Details";
    document.getElementById(
      "icon"
    ).innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${allData.icon}@2x.png" alt="Weather icon">`;
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("city").innerHTML = allData.city;
    document.getElementById("temperature").innerHTML = allData.temp + " F";
    document.getElementById("feel").innerHTML = allData.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
