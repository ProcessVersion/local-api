require("dotenv").config();
const express = require("express");
const app = express();
const { facts, sources, url } = require("./JSON/facts.json");
const fetch = require("./Functions/Functions");
const BaseObj = require("./Structures/BaseObj");
const { Instagram, Discord, RPS, Roblox, Fact, User, Subreddit } = new fetch();

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
	return res.status(response.status ? response.status : 200).send(response)
});

app.get("/reddit/users/:query", async (req, res) => {
	const username = req.params.query;

	const response = await User(username);
	return res.status(response.status ? response.status : 200).send(response);
});

app.get("/testing/", async (req, res) => {
	const yoink = await RPS();
	res.status(200).send(yoink);
});

app.use((req, res) => {
	const obj = new BaseObj({
		success: false,
		status: 404,
		statusMessage: "Oops, this route is invalid!",
		data: null,
	});
	res.status(404).send(obj);
});

app.listen(process.env.PORT, () =>
	console.log(`Online and listening to port #${process.env.PORT}`)
);
