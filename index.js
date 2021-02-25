require("dotenv").config();
const express = require("express");
const app = express();
const { facts, sources, url } = require("./facts.json");

app.get("/fact/", (req, res) => {
	try {
		const ranNum = Math.floor(Math.random() * facts.length);
		const number = ranNum;
		const obj = {
			fact: facts[number],
			source: sources[number],
			url: url[number],
			success: true,
			error: false,
		};
		return res.status(200).send(obj);
	} catch (e) {
		const obj = {
			fact: null,
			source: null,
			url: null,
			success: false,
			error: true,
		};
		return res.status(500).send(obj);
	}
});

app.use((req, res) => {
	res.status(404).send("Oops, this route is invalid!");
});

app.listen(process.env.PORT, () =>
	console.log(`Online and listening to port #${process.env.PORT}`)
);
