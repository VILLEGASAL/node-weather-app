let express = require("express")
let bodyParser = require("body-parser")
let axios = require('axios')
let ejs = require('ejs')

let app = express()
let port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

let toDisplay = {

    weather : "",
    temperature : "",
}

app.get("/", (req, res) => {

    res.render("index", {

        weatherDescription: toDisplay.weather,
        temp : toDisplay.temperature
    })
})

app.post("/", (req, res) => {

    let city = req.body.city

    let url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=163a06221608b6d43aef4bc8eb6cd6cd&units=metric`



    axios.get(url)
    .then((response) => {

        let weatherData = response.data
        let description = weatherData.weather[0].description
        let temp = weatherData.main.temp

        toDisplay.weather = description.toUpperCase()
        toDisplay.temperature = temp

        res.redirect("/")
        
    })
    .catch((error) => {

        console.log("Hey al : " + error);
    })


    
})


app.listen(port, () => {

    console.log("Server is running on port " + port);
})






