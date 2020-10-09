let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config()

let morgan = require('morgan')

let scrapper = require('./utilities/scrap')

let app = express();
app.use(morgan(':method :url :status - :response-time ms'))


let PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.json({ status: 200 });
});

app.get("/scrap", async function (req, res) {
    try {
        let urlToScrap = req.query.url;
        if(!urlToScrap) throw new Error("No url found")
        let scrappedData = await scrapper(urlToScrap)
        res.json({ status: 200, data: scrappedData })
    } catch (e) {
        res.status(503).json({ status: 503, error: true, description: e.message })
    }
})

app.listen(PORT, function () {
    console.log("The server started on port " + PORT);
});


