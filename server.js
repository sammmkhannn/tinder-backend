
import express from 'express';
import mongoose from 'mongoose';
import Card from './dbCards.js';
import cors from 'cors';

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:1990xe98@cluster0.h1sd1.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//Middleware
app.use(express.json());
app.use(cors());
//DB config
mongoose.connect(connection_url, {
	useFindAndModify: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology:true
});
let db = mongoose.connection;

db.
	once('open', () => {
		console.log('connected to the mongodb cluster');
	})
 .on('error', (error) => {
	console.log('database access denied');
})
.on('close', () => {
	console.log('connection is closed');
})

//API Endpoints
app.get('/', (req, res) => {
	res.status(200).send("HELLO CLEVER PROGRAMMERS");
})

app.post('/tinder/cards', (req, res) => {
	
	const dbCard = req.body;

	Card.create(dbCard, (err, data) => {
		if (!err) {
			res.status(200).send(data)
		} else {
			res.status(500).send(err);
		}
	})
});
app.get('/tinder/cards', (req, res) => {
	
	Card.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
})
//Listener
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});