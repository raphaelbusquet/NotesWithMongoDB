// Configurations
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// DB
const db = require('./db/connection')

// Template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const notesRoutes = require('./routes/notes');

// Routes
app.get('/', async function(req, res) {

    const notes = await db.getDb().db().collection('notes').find({}).toArray();
    
    res.render('home', {notes});

})

app.use('/notes', notesRoutes)

db.initDb((err, db) => {
    if(err) {
        console.log(err);
    } else {
        console.log("The DATABASE is connected")
        app.listen(port, () => {
            console.log(`Project running on ${port} port.`);
        })
    }
})