const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');

//add event listeners

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city</p>"
        return;
    }

    getWeather(city);
})


function getWeather(city) {
    const apiKey = "54b50c226f130bfc162cff85a8329985";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric"

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("City not found.");
            }

            return response.json();
        })

        .then(function (data) {
            //extract needed data
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            weatherResult.innerHTML =
                "<h2>" +
                city +
                "</h2>" +
                '<img src="https://openweathermap.org/img/wn/' +
                icon +
                '@2x.png" alt="weather icon">' +
                "<p><strong>" +
                temp +
                "°C</strong></p>" +
                "<p>" +
                description +
                "</p>";
        })


        .catch(function (error) {
            weatherResult.innerHTML = "<p>" + error.message + "</p>";
        });
}

