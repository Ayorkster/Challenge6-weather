// var apiKey = "2f2dfde83031272424c77ab771924459";
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const saveButton = document.getElementById("searchBtn");
    const savedList = document.getElementById("savedList");
    const apiKey = "2f2dfde83031272424c77ab771924459"; // Replace with your OpenWeatherMap API key


    loadSavedItems();

  
    saveButton.addEventListener("click", function () {
        const searchText = searchInput.value.trim();

        // Check if the input is not empty
        if (searchText !== "") {
            // Save the input to local storage
            saveToLocalStorage(searchText);

            // Clear the input field
            searchInput.value = "";

            // Reload the saved items
            loadSavedItems();
        }
    });

    // Function to save an item to local storage
    function saveToLocalStorage(item) {
        const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        savedItems.push(item);
        localStorage.setItem("savedItems", JSON.stringify(savedItems));
    }

    // Function to load and display saved items from local storage
    function loadSavedItems() {
        const savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

        // Clear the list before re-rendering
        savedList.innerHTML = "";

        savedItems.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            savedList.appendChild(listItem);
        });

        // Check if there are saved items and add the last one to the OpenWeatherMap Geocoding API request
        if (savedItems.length > 0) {
            const lastSavedItem = savedItems[savedItems.length - 1];
            // Make a request to OpenWeatherMap Geocoding API
            makeGeocodingApiRequest(lastSavedItem);
        }
    }

    // Function to make a request to OpenWeatherMap Geocoding API
    function makeGeocodingApiRequest(queryParam) {
        const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${queryParam}&limit=5&appid=${apiKey}`;

        // Use the Fetch API to send a GET request to the OpenWeatherMap Geocoding API
        fetch(geocodingApiUrl)
            .then(response => response.json())
            .then(data => {
                // Extract latitude and longitude from the response
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    const name = data[0].name;

                    // Make a request to the One Call Weather API with lat and lon
                    makeOneCallWeatherApiRequest(lat, lon, name);
                   const cityName = document.getElementById('cityName');
                   cityName.textContent = name;
                   console.log(data)
                } else {
                    console.error("Geocoding API returned no results.");
                }
            })
            .catch(error => {
                console.error("Geocoding API Request Error:", error);
            });
    }

 // Function to make a request to OpenWeatherMap One Call Weather API
 function makeOneCallWeatherApiRequest(lat, lon) {
    const apiKey = "2f2dfde83031272424c77ab771924459"; 
    const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=5&units=imperial&appid=${apiKey}`;

    // Use the Fetch API to send a GET request to the One Call Weather API
    fetch(oneCallApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(let index = 0; index < 1; index++){
               var dateText = data.list[0].dt_txt;
               var temp = data.list[0].main.feels_like;
               var wind = data.list[0].wind.speed;
               var icon = data.list[0].weather[0].icon;
               var humid = data.list[0].main.humidity;
               var desc = data.list[0].weather[0].description
               const date = dateText.split(" ")[0];
               const descOne = document.getElementById('desc1')
               const dateone = document.getElementById('date1');
               const tempOne = document.getElementById('temp1');
               const windOne = document.getElementById('wind1');
               const humidOne = document.getElementById('humid1');
               let iconOne = document.getElementById("img");
               iconOne.src = 'https://openweathermap.org/img/w/'+ icon + '.png';
               dateone.textContent = date;
               descOne.textContent = desc;
               tempOne.textContent = 'Temp: ' + temp + 'F';
               windOne.textContent = 'Wind: ' + wind + 'mph';
               humidOne.textContent = 'Humidity: ' + humid + '%';

               var dateText2 = data.list[8].dt_txt;
               var temp2 = data.list[8].main.feels_like;
               var wind2 = data.list[8].wind.speed;
               var icon2 = data.list[8].weather[0].icon;
               var humid2 = data.list[8].main.humidity;
               var desc2 = data.list[8].weather[0].description
               const date2 = dateText2.split(" ")[0];
               const descTwo = document.getElementById('desc2')
               const datetwo = document.getElementById('date2');
               const temptwo = document.getElementById('temp2');
               const windTwo = document.getElementById('wind2');
               const humidTwo = document.getElementById('humid2');
               const iconTwo = document.getElementById("img2");
               iconTwo.src = 'https://openweathermap.org/img/w/'+ icon2 + '.png';
               datetwo.textContent = date2;
               descTwo.textContent = desc2;
               temptwo.textContent = 'Temp: ' + temp2 + 'F';
               windTwo.textContent = 'Wind: ' + wind2 + 'mph';
               humidTwo.textContent = 'Humidity: ' + humid2 + '%';

            
            var dateText3 = data.list[16].dt_txt;
               var temp3 = data.list[16].main.feels_like;
               var wind3 = data.list[16].wind.speed;
               var icon3 = data.list[16].weather[0].icon;
               var humid3 = data.list[16].main.humidity;
               var desc3 = data.list[16].weather[0].description
               const date3 = dateText3.split(" ")[0];
               const descThree = document.getElementById('desc3')
               const datethree = document.getElementById('date3');
               const tempThree = document.getElementById('temp3');
               const windThree = document.getElementById('wind3');
               const humidThree = document.getElementById('humid3');
               const iconThree = document.getElementById("img3");
               iconThree.src = 'https://openweathermap.org/img/w/'+ icon3 + '.png';
               datethree.textContent = date3;
               descThree.textContent = desc3;
               tempThree.textContent = 'Temp: ' + temp3 + 'F';
               windThree.textContent = 'Wind: ' + wind3 + 'mph';
               humidThree.textContent = 'Humidity: ' + humid3 + '%';

            
            var dateText4 = data.list[24].dt_txt;
               var temp4 = data.list[24].main.feels_like;
               var wind4 = data.list[24].wind.speed;
               var icon4 = data.list[24].weather[0].icon;
               var humid4 = data.list[24].main.humidity;
               var desc4 = data.list[24].weather[0].description
               const date4 = dateText4.split(" ")[0];
               const descFour = document.getElementById('desc4')
               const datefour = document.getElementById('date4');
               const tempFour = document.getElementById('temp4');
               const windFour = document.getElementById('wind4');
               const humidFour = document.getElementById('humid4');
               const iconFour = document.getElementById("img4");
               iconFour.src = 'https://openweathermap.org/img/w/'+ icon4 + '.png';
               descFour.textContent = desc4;
               datefour.textContent = date4;
               tempFour.textContent = 'Temp: ' + temp4 + 'F';
               windFour.textContent = 'Wind: ' + wind4 + 'mph';
               humidFour.textContent = 'Humidity: ' + humid4 + '%';

            
            var dateText5 = data.list[32].dt_txt;
               var temp5 = data.list[32].main.feels_like;
               var wind5 = data.list[32].wind.speed;
               var icon5 = data.list[32].weather[0].icon;
               var desc5 = data.list[32].weather[0].description
               var humid5 = data.list[32].main.humidity;
               const date5 = dateText5.split(" ")[0];
               const datefive = document.getElementById('date5');
               const tempFive = document.getElementById('temp5');
               const windFive = document.getElementById('wind5');
               const humidFive = document.getElementById('humid5');
               const descFive = document.getElementById('desc5')
               const iconFive = document.getElementById("img5");
               iconFive.src = 'https://openweathermap.org/img/w/'+ icon5 + '.png';
               datefive.textContent = date5;
               descFive.textContent = desc5;
               tempFive.textContent = 'Temp: ' + temp5 + 'F';
               windFive.textContent = 'Wind: ' + wind5 + 'mph';
               humidFive.textContent = 'Humidity: ' + humid5 + '%';
            }
        })
        .catch(error => {
            console.error("One Call Weather API Request Error:", error);
        });
}});
const clearbtn = document.getElementById('clear');
clearbtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();

});
