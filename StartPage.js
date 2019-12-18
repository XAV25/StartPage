//Défini des variables qui contiennent l'heure, les minutes et les secondes (avec un 0 si < 10)
let currentHour = addZeros(new Date().getHours());
let currentMinute = addZeros(new Date().getMinutes());
let currentSec = addZeros(new Date().getSeconds());

//J'appelle les fonctions setTime() et getWeather() dès le chargement de la page
setTime();
getWeather();

//Je crée un compteur qui s'actualise toutes les secondes (1000 ms) et qui execute setTime()
setInterval(() => {
    //Fonction executée
    setTime();
}, 1000);

//Mets à jour l'heure
function setTime() {
    currentHour = addZeros(new Date().getHours());
    currentMinute = addZeros(new Date().getMinutes());
    currentSec = addZeros(new Date().getSeconds());
    document.getElementById("spanHour").innerText = currentHour + " : " + currentMinute + " : " + currentSec;
}

// Rajoute un 0 à un nombre (nb) si < 10
function addZeros(nb) {
    if (nb < 10) {
        return "0" + nb;
    }
    return nb;
}

//obtenir la météo
function getWeather() {
    //Objet AJAX
    let xmlhttp = new XMLHttpRequest();

    // Quand l'objet AJAX est prêt
    xmlhttp.onreadystatechange = function () {
        //Si les données renvoyées sont corrects
        if (this.readyState == 4 && this.status == 200) {
            //responseText = Données retournées par l'API
            let weatherData = JSON.parse(this.responseText)
            if (weatherData) {
                document.getElementById("weather").innerText = weatherData.main.temp + "°C"
            }

        }
    };

    //Envoi de la requête AJAX (call API)
    xmlhttp.open("GET", 'https://api.openweathermap.org/data/2.5/weather?lat=48.5839200&lon=7.7455300&units=metric&APPID=5cb51ce8b8a0b840ba9c6b64206801e1', true);
    xmlhttp.send();
}

