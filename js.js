const img = document.querySelector('img');

async function firstPageLoad() {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=IdutASa6egE584geNPWAhYGUBr2CL2H7&s=where', { mode: 'cors' });
    const mysteryData = await response.json();
    img.src = mysteryData.data.images.original.url;
}

async function updateDisplay() {
    //Get weather data for search bar terms
    let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    let weatherRequest = document.querySelector('.searchText');
    weatherUrl+= weatherRequest.value + '&APPID=71013180d2f420234b1712abb4967d04';
    const weatherResponse = await fetch( weatherUrl , { mode: 'cors' })
    const weatherData = await weatherResponse.json();
    //console.log(weatherData);

    const city = document.querySelector('.city');
    city.textContent = weatherData.name;
    const tempHigh = document.querySelector('.tempHigh');
    let temp = weatherData.main.temp_max;
    tempHigh.textContent = "High of " + Math.round(convertTemp(temp)) + sayUnit();
    const tempLow = document.querySelector('.tempLow');
    temp = weatherData.main.temp_min;
    tempLow.textContent = "Low of " + Math.round(convertTemp(temp)) + sayUnit();
    const currentTemp = document.querySelector('.currentTemp');
    temp = weatherData.main.temp;
    currentTemp.textContent = "Current temperature is " + Math.round(convertTemp(temp)) + sayUnit();
    const condition = document.querySelector('.condition');
    condition.textContent = weatherData.weather[0].description;

    //Get Gif matching weather condition
    let gifUrl = 'https://api.giphy.com/v1/gifs/translate?api_key=IdutASa6egE584geNPWAhYGUBr2CL2H7&s=';
    gifUrl+= condition.textContent.split(' ').join('_');
    const gifResponse = await fetch( gifUrl , { mode: 'cors' })
    const gifData = await gifResponse.json();
    img.src = gifData.data.images.original.url;
}

function convertTemp(temp) {
    return document.querySelector('.checkbox').checked ? temp-273.15 : 1.8 * (temp - 273.15) + 32
}

function sayUnit() {
    return document.querySelector('.checkbox').checked ? " Celcius" : " Fahrenheit";
}

firstPageLoad();

document.querySelector('.searchBar').addEventListener('click', (e)=>{
    if(e.target.classList.contains('searchBtn')){
        updateDisplay();
    }
});

document.querySelector('.switch').addEventListener('click', (e)=>{
    if(e.target.classList.contains('slider')){
        updateDisplay();
    }
});