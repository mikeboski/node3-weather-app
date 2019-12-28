const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getLongLatOfAddress = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    getLongLatOfAddress(address, (error, obj) => {
        if (error) {
            res.send({error});
        } else {
            console.log("Callback for getLongLat:", obj);
            forecast(obj.lat, obj.long, (error2, weather) => {
                if (error2) {
                    res.send({error2});
                } else {
                    console.log(`Weather for '${obj.place_name}'`);
                    console.log(`${weather.summary} It is currently ${weather.temp} degees F out. There is a ${weather.rainPercent}% chance of rain.`);
                    const weatherString = `${weather.summary} It is currently ${weather.temp} degees F out. There is a ${weather.rainPercent}% chance of rain.`;
                    res.send({
                        forecast: 'It is snowing',
                        location: obj.place_name,
                        address,
                        weatherString
                    });
                }
            });
        }
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})