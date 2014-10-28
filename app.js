var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();


app.use(express.static(__dirname));
app.use(bodyParser());

var id = 1;

app.post('/chat/messages', function(req, res){
	var body = req.body;
	if (body && body.text) {
		setTimeout(function() {
			return res.send({
				text: body.text,
				id: id++
			});
		}, Math.random() * 1000);
	}
});

app.listen(3000);