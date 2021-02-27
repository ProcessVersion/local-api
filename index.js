require("dotenv").config();
const express = require("express");
const app = express();
const { facts, sources, url } = require("./Utils/json/facts.json");
const fetch = require("./Utils/Functions/Functions");
const { Instagram, Discord } = new fetch();

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

app.get("/insta/:query", async (req, res) => {
	const username = req.params.query;

	const ig = await Instagram(username);
	return res.status(ig.status ? ig.status : 200).send(ig);
});

app.get("/discord/:query", async (req, res) => {
	const id = req.params.query;

	const test = await Discord(id);
	return res.status(test.status ? test.status : 200).send(test);
});

app.get("/roblox/:query", async (req, res) => {
	//
});

app.get("/reddit/subreddit/:query", async (req, res) => {
	//
});

app.get("/reddit/users/:query", async (req, res) => {
	//
});

app.use((req, res) => {
	res.status(404).send("Oops, this route is invalid!");
});

app.listen(process.env.PORT, () =>
	console.log(`Online and listening to port #${process.env.PORT}`)
);
