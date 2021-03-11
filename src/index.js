require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("./Functions/Functions");
const BaseObj = require("./Structures/BaseObj");
const cats = require("http-status-cats").cats;
const axios = require("axios");
const {
	Instagram,
	Discord,
	RPS,
	Roblox,
	Fact,
	User,
	Subreddit,
	PrequelMeme,
	Riddles,
	Dadjoke,
	Joke,
	Pickup,
} = new fetch();

app.get("/fact/", async (req, res) => {
	const fact = await Fact();
	return res.status(fact.status ? fact.status : 200).send(fact);
});

app.get("/insta/:query", async (req, res) => {
	const username = req.params.query;

	const ig = await Instagram(username);
	res.statusMessage = ig.statusMessage;
	return res.status(ig.status ? ig.status : 200).send(ig);
});

app.get("/discord/:query", async (req, res) => {
	const id = req.params.query;

	const response = await Discord(id);
	return res.status(response.status ? response.status : 200).send(response);
});

app.get("/roblox/:query", async (req, res) => {
	const username = req.params.query;

	const response = await Roblox(username);
	return res.status(200).send(response);
});

app.get("/reddit/subreddit/:query", async (req, res) => {
	const subreddit = req.params.query;

	const response = await Subreddit(subreddit);
	return res.status(response.status ? response.status : 200).send(response);
});

app.get("/reddit/users/:query", async (req, res) => {
	const username = req.params.query;

	const response = await User(username);
	return res.status(response.status ? response.status : 200).send(response);
});

app.get("/testing/", async (req, res) => {
	const yoink = await RPS();
	return res.status(200).send(yoink);
});

app.get("/prequelmeme/", async (req, res) => {
	const cool = await PrequelMeme();
	return;
});

app.get("/riddle/", async (req, res) => {
	const cool = await Riddles();
	return res.status(200).send("Working");
});

app.get("/pickup/", async (req, res) => {
	const cool = await Pickup();
	return res.status(200).send("Working");
});

app.get("/joke/", async (req, res) => {
	const response = await Joke();
	return res.status(200).send("Working");
});

app.get("/dadjoke/", async (req, res) => {
	const response = await Dadjoke();
	return res.status(200).send("Working");
});

app.use((req, res) => {
	return res.status(404).send(cats[404]);
});

app.listen(process.env.PORT, () =>
	console.log(`Online and listening to port #${process.env.PORT}`)
);
