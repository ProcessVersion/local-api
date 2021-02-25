require("dotenv").config();
const express = require("express");
const app = express();
const { facts, sources, url } = require("./facts.json");

app.get("/fact/", (req, res) => {
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
});

app.listen(process.env.PORT, () =>
	console.log(`Online and listening to port #${process.env.PORT}`)
);
