require("dotenv").config();
const axios = require("axios");
const BaseObj = require("../Structures/BaseObj");

// API

const { Client, UserFlags } = require("discord.js");
const client = new Client();
const noblox = require("noblox.js");

// JSON
const dadjoke = require("../JSON/dadjokes.json");
const fact = require("../JSON/facts.json");
const jokes = require("../JSON/joke.json");
const names = require("../JSON/name.json");
const never = require("../JSON/never-have-i-ever.json");
const pick = require("../JSON/pickup.json");
const riddles = require("../JSON/riddles.json");
const roasts = require("../JSON/roasts.json");
const rps = require("../JSON/rps.json");
const topics = require("../JSON/topics.json");
const test = require("../JSON/test.json");

module.exports = class Fetch {
	constructor() {
		this.Fact = this.Fact.bind(this);
		this.Pickup = this.Pickup.bind(this);
		this.Roast = this.Roast.bind(this);
		this.Joke = this.Joke.bind(this);
		this.Riddles = this.Riddles.bind(this);
		this.Topic = this.Topic.bind(this);
		this.Dadjoke = this.Dadjoke.bind(this);
		this.Instagram = this.Instagram.bind(this);
		this.Roblox = this.Roblox.bind(this);
		this.Discord = this.Discord.bind(this);
		this.NeverHaveIEver = this.NeverHaveIEver.bind(this);
		this.Name = this.Name.bind(this);
		this.RPS = this.RPS.bind(this);
	}
	async Fact() {
		return new Promise(function (resolve, reject) {
			try {
				const ranNum = Math.floor(Math.random() * fact.length);
				const number = ranNum;
				const body = fact[number];

				const data = {
					id: body.id,
					fact: body.fact,
					source: body.source,
					url: body.url,
					author: body.author,
				};

				resolve(
					new BaseObj({
						success: true,
						status: 200,
						statusMessage: "OK",
						data: data,
					})
				);
			} catch (e) {
				console.log(e);

				reject(
					new BaseObj({
						success: false,
						status: 500,
						statusMessage: "An unexpected error has occurred",
						data: null,
					})
				);
			}
		});
	}
	Pickup() {
		const { pickup, source } = pick;
		const ranNum = Math.floor(Math.random() * pickup);
	}
	Roast() {
		const { roast, source } = roasts;
	}
	Joke() {
		const { joke, punchline, author, url } = jokes;
	}
	Riddles() {
		const { riddle, source } = riddles;
	}
	Topic() {
		const { topic, sources } = topics;
	}
	Dadjoke() {
		const { joke, author, url, punchline } = dadjoke;
	}
	async Instagram(username) {
		if (!username) return null;

		const url = `https://www.instagram.com/${username}/?__a=1`;

		try {
			const res = await axios.get(url);
			const body = res.data;

			const count = Object.keys(body).length;

			if (count === 0 || count === "0") {
				const data = null;
				return new BaseObj({ success: false, data: data });
			}

			const data = {
				status: res.status,
				statusMessage: res.statusText,
				url: `https://www.instagram.com/${body.graphql.user.username}/`,
				user: {
					thumbnail: body.graphql.user.profile_pic_url_hd,
					full_name: body.graphql.user.full_name,
					bio: body.graphql.user.biography,
					username: body.graphql.user.username,
					id: body.graphql.user.id,
				},
				account: {
					followers: body.graphql.user.edge_followed_by.count,
					following: body.graphql.user.edge_follow.count,
					posts: body.graphql.user.edge_owner_to_timeline_media.count,
					private: body.graphql.user.is_private ? true : false,
					verified: body.graphql.user.is_verified ? true : false,
				},
			};

			return new BaseObj({
				success: true,
				status: res.status,
				statusMessage: res.statusText,
				data: data,
			});
		} catch (e) {
			if (e.response.status == 404) {
				return new BaseObj({
					success: false,
					status: e.response.status ? e.response.status : null,
					statusMessage: e.response.statusText ? e.response.statusText : null,
					data: null,
				});
			}
			console.log(e);
			return new BaseObj({
				success: false,
				status: e.response.status ? e.response.status : null,
				statusMessage: e.response.statusText ? e.response.statusText : null,
				data: null,
			});
		}
	}
	async Roblox(username) {
		if (!username) return new BaseObj({ success: false, status: 422, statusMessage: "Missing query" })

		const id = await noblox.getIdFromUsername(username);
		try {
			if (id) {
				try {
					const info = await noblox.getPlayerInfo(parseInt(id));
					const data = {
						isBanned: info.isBanned,
						username: info.username,
						pastNames: info.oldNames,
						bio: info.bio,
						join_date: info.joinDate,
						age: info.age,
						friends: info.friendCount,
						following: info.followingCount,
						followers: info.followerCount,
						profile_url: `https://roblox.com/users/${id}/profile`,
						thumbnail: `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`,
					};
					return new BaseObj({
						success: true,
						status: 200,
						statusMessage: "OK",
						data: data,
					});
				} catch (err) {
					console.log(err);

					return new BaseObj({
						success: true,
						status: 500,
						statusMessage: "An unexpected error has occurred",
						data: null,
					});
				}
			}
		} catch (e) {
			console.log(e);

			return new BaseObj({
				success: true,
				status: 500,
				statusMessage: "An unexpected error has occurred",
				data: null,
			});
		}
	}
	async Discord(id) {
		const flags = {
			DISCORD_EMPLOYEE: `Discord employee`,
			DISCORD_PARTNER: `Discord partner`,
			BUGHUNTER_LEVEL_1: `Level 1 bug hunter`,
			BUGHUNTER_LEVEL_2: `Level 2 bug hunter`,
			HYPESQUAD_EVENTS: `Hypesquad events`,
			HOUSE_BRAVERY: `Hypesquad bravery`,
			HOUSE_BRILLIANCE: `Hypesquad brilliance`,
			HOUSE_BALANCE: `Hypesquad balance`,
			EARLY_SUPPORTER: `Early supporter`,
			TEAM_USER: "Team User",
			SYSTEM: `System`,
			VERIFIED_BOT: `Bot emoji`,
			VERIFIED_DEVELOPER: `Verified discord bot developer`,
		};
		try {
			const res = await client.users.fetch(id);
			const userflag = new UserFlags(res.flags);
			const userFlag = userflag.toArray();
			const userflags = `${
				userFlag.length ? userFlag.map((f) => flags[f]).join(" ") : null
			}`;

			if (!res)
				return new BaseObj({
					success: true,
					status: 404,
					statusMessage: "User not found",
				});

			const data = {
				username: res.username,
				id: res.id,
				system: res.system ? true : false,
				bot: res.bot ? true : false,
				discriminator: res.discriminator,
				createdAt: res.createdAt,
				pfp: res.displayAvatarURL({ dynamic: true }),
				flags: userflags,
			};

			return new BaseObj({
				success: true,
				status: 200,
				statusMessage: "OK",
				data: data,
			});
		} catch (e) {
			console.log(e);

			return new BaseObj({
				success: false,
				status: 500,
				statusMessage: "An unexpected error has occurred",
				data: null,
			});
		}
	}
	async NeverHaveIEver() {
		const { neverhaveiever, source } = never;
	}
	async Name() {
		const { name, source } = names;
	}
	async RPS() {
		try {
			const ranNum = Math.floor(Math.random() * test.length);
			const number = ranNum;
			const body = test[number];

			const data = {
				id: body.id,
				quote: body.quote,
				author: body.author,
				url: body.url,
				source: body.source,
			};

			return new BaseObj({
				success: true,
				status: 200,
				statusMessage: "OK",
				data: data,
			});
		} catch (e) {
			console.log(e);

			return new BaseObj({
				success: false,
				status: 500,
				statusMessage: "An unexpected error has occurred",
				data: null,
			});
		}
	}
	async subreddit(subreddit) {
		if(!subreddit) return;
	}
	
};
