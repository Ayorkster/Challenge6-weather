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
        const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${queryParam}&limit=5&appid=${apiKey}`;

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
        const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // Use the Fetch API to send a GET request to the One Call Weather API
        fetch(oneCallApiUrl)
            .then(response => response.json())
            .then(data => {
                if(data.length > 0){
                    const date = data[0].list.dt_txt;

                }
                // Handle the One Call Weather API response data here
                console.log("One Call Weather API Response:", data);
                const dateOne = document.getElementById("date1");
                dateOne.textContent = date;
            })
            .catch(error => {
                console.error("One Call Weather API Request Error:", error);
            });
    }
});
