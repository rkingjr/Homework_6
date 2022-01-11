var city ="";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvindex = $("un-index");

function find(c) {
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity(i)) {
            return -1;
        }
    }
    return 1;
}

var myAPIkey = "f75e72d2170270e8c7a14e9e14fb76bf";

function displayWeather(event) {
    event.preventDefault();
    if(searchCity.val().trim()=="") {
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myAPIkey;
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(response){

        console.long(response);

        var weathericon = response.weather(0).icon;
        var iconurl = "https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        var date = new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "img src="+iconurl+">");

        var tempf = (response.main.temp - 273.15) * 1.0 +32;
        $(currentTemperature).html((tempf).toFixed(2)+"&#8457");
        $(currentHumidty).html(response.main.humidity+"%");

        var windSpeed = response.wind.speed;
        var windMPH = (windSpeed*2.237).toFixed(1);
        $(currentWSpeed).html(windMPH + "mph");

        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if (sCity==null){
            sCity=[];
            sCity.push(city.toUpperCase()
            );
            localStorage.setItem("cityname",JSON.stringify(sCity));
            addToList(city);
        }
        else {
            if(find(city)>0){
                sCity.push(city.toUpperCase());
                localStorage.setItem("cityname",JSON.stringify(sCity));
                addToList(city);
            }
        }
    })
}

