// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
	res.json({ greeting: 'hello API' });
});

app.get('/api/date', (req, res) => {
	const currentDate = new Date();

	res.json({ unix: currentDate.getTime(), utc: `${currentDate}` });
});

// Tasks
app.get('/api/:date?', (req, res) => {
	const calcDate = isNaN(req.params.date)
		? req.params.date
		: parseInt(req.params.date);

	const currentDate = new Date(calcDate);

	const errResponse = { error: `${currentDate}` };

	const validResponse = {
		unix: currentDate.getTime(),
		utc: `${currentDate.toUTCString()}`,
	};

	console.log(currentDate);

	res.json(validResponse);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
