const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('config'),
    routes = require('./src/controllers/routes');

const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use('/', routes);

const {user, pass, dbName} = config.get('dbConfig');
const URI = `mongodb+srv://${user}:${pass}@cluster0.ov5aq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    const db = mongoose.connection;

    db.on('error', () => {
        console.error('connection error:')
    });
    db.once('open', () => {
        // we're connected!
    });

    process.on('SIGINT', () => {
        db.close(function () {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0);
        });
    });
});


const PORT = 3001;
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});