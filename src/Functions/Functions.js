require("dotenv").config();
const axios = require("axios");
const BaseObj = require("../Structures/BaseObj");

// APIS

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
		this.formatNumber = this.formatNumber.bind(this);
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
		this.User = this.User.bind(this);
		this.Subreddit = this.Subreddit.bind(this);
		this.capitalize = this.capitalize.bind(this);
	}
	formatNumber(x) {
		if (typeof x !== "number")
			throw new ReferenceError("Param must be a number.");
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	capitalize(string) {
		if (!string) throw new ReferenceError("No value given");
		if (typeof string !== "string")
			throw new ReferenceError("Given value is not a string");
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	async Fact() {
		try {
			const res = await axios.get(
				"https://www.reddit.com/r/facts.json?sort=top&t=week"
			);
			const body = res.data.data;

			const ranNum = Math.floor(Math.random() * body.children.length);

			const index = body.children[ranNum];

			const data = {
				url: index.data.url,
				author: index.data.author,
				fact: index.data.title,
				description: index.data.selftext,
				subreddit: index.data.subreddit_name_prefixed,
				ratio: index.data.upvote_ratio,
				upvotes: index.data.ups,
				downvotes: index.data.downs,
				score: index.data.score,
				over18: index.data.over_18,
				created_UTC: index.data.created_utc,
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
				status: e.response.status ? e.reponse.status : 500,
				statusMessage: e.response.statusText
					? e.response.statusText
					: "An unexpected error has occurred",
				data: null,
			});
		}
	}
	async Pickup() {
		const res = await axios.get(
			"https://www.reddit.com/r/pickuplines.json?sort=top&t=week"
		);
		const body = res.data.data.children[0];
		console.log(body);
	}
	Roast() {
		const { roast, source } = roasts; // No subreddit for this :yikes:
	}
	async Joke() {
		const res = await axios.get(
			"https://www.reddit.com/r/riddles.json?sort=top&t=week"
		);
		const body = res.data.data.children[0];
		console.log(body);
	}
	async Riddles() {
		const res = await axios.get(
			"https://www.reddit.com/r/riddles.json?sort=top&t=week"
		);
		const body = res.data.data.children[0];
		console.log(body);
	}
	Topic() {
		const { topic, sources } = topics;
	}
	async Dadjoke() {
		const res = await axios.get(
			"https://www.reddit.com/r/dadjokes.json?sort=top&t=week"
		);
		const body = res.data.data.children[0];
		console.log(body);
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
		if (!username)
			return new BaseObj({
				success: false,
				status: 422,
				statusMessage: "Missing query",
			});
		try {
			const id = await noblox.getIdFromUsername(username);
			if (id) {
				try {
					const info = await noblox.getPlayerInfo(parseInt(id));
					const data = {
						isBanned: info.isBanned,
						username: info.username,
						pastNames: info.oldNames,
						bio: info.bio,
						join_date: info.joinDate,
						age: this.formatNumber(info.age),
						friends: info.friendCount,
						following: this.formatNumber(info.followingCount),
						followers: this.formatNumber(info.followerCount),
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
			if (e.message == "User not found")
				return new BaseObj({
					success: false,
					status: 404,
					statusMessage: "This user doesn't exist",
					data: null,
				});

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
			if (e.httpStatus == 400)
				return new BaseObj({
					success: false,
					status: 400,
					statusMessage: "Provided query is not a snowflake (ID)",
					data: null,
				});
			if (e.httpStatus == 404)
				return new BaseObj({
					success: false,
					status: 404,
					statusMessage: "This user doesn't exist or is banned",
					data: null,
				});

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
	async Subreddit(subreddit) {
		if (!subreddit)
			return new BaseObj({
				success: false,
				status: 422,
				statusMessage: "Missing query",
			});
		try {
			const res = await axios.get(
				`https://www.reddit.com/r/${subreddit}/about.json`
			);
			const body = res.data.data;

			const data = {
				url: `https://www.reddit.com/${body.url}`,
				name_prefix: body.display_name_prefixed,
				name: body.display_name,
				title: body.title,
				description: body.public_description,
				created: body.created,
				created_UTC: body.created_utc,
				type: this.capitalize(body.subreddit_type),
				id: body.id,
				over18: body.over18,
				quarantined: body.quarantine,
				lang: this.capitalize(body.lang),
				members: {
					online: this.formatNumber(body.accounts_active),
					subscribers: this.formatNumber(body.subscribers),
				},
				colors: {
					primary_color: body.primary_color,
					key_color: body.key_color,
				},
				images: {
					header_img: body.header_img.replace(/(amp;)/gi, ""),
					community_icon: body.community_icon.replace(/(amp;)/gi, ""),
					background_img: body.banner_background_image.replace(/(amp;)/gi, ""),
				},
			};

			return new BaseObj({
				success: true,
				status: 200,
				statusMessage: "OK",
				data: data,
			});
		} catch (e) {
			console.log(e);

			if (e.response.status == 404)
				return new BaseObj({
					success: true,
					status: 404,
					statusMessage: "Subreddit not found",
					data: null,
				});

			return new BaseObj({
				success: true,
				status: 500,
				statusMessage: "An unexpected error has occurred",
				data: null,
			});
		}
	}
	async User(user) {
		if (!user)
			return new BaseObj({
				success: false,
				status: 422,
				statusMessage: "Missing query",
			});
		try {
			const res = await axios.get(
				`https://www.reddit.com/user/${user}/about.json`
			);
			const body = res.data;

			if (body.data.hide_from_robots == true) {
				return new BaseObj({
					success: true,
					status: 200,
					statusMessage: "OK",
					data: { hidden: true },
				});
			}

			const data = {
				url: `https://reddit.com/${body.data.subreddit.url}`,
				name: body.data.name,
				name_prefixed: body.data.subreddit.display_name_prefixed,
				id: body.data.id,
				pfp: body.data.icon_img.replace(/(amp;)/gi, ""),
				verified: body.data.verified,
				created: body.data.created,
				created_UTC: body.data.created_utc,
				total_karma: this.formatNumber(body.data.total_karma),
				link_karma: this.formatNumber(body.data.link_karma),
				awarder_karma: body.data.awarder_karma,
				awardee_karma: body.data.awardee_karma,
				mod: body.data.is_mod,
				gold: body.data.is_gold,
				employee: body.data.is_employee,
			};

			return new BaseObj({
				success: true,
				status: 200,
				statusMessage: "OK",
				data: data,
			});
		} catch (e) {
			console.log(e);

			if (e.response.status == 404)
				return new BaseObj({
					success: false,
					status: e.response.status,
					statusMessage: "I couldn't find this user!",
				});

			return new BaseObj({
				success: true,
				status: 500,
				statusMessage: "An unexpected error has occurred",
				data: null,
			});
		}
	}
	async PrequelMeme() {
		const res = await axios.get(
			"https://www.reddit.com/r/prequelmemes.json?sort=top&t=week"
		);
		const body = res.data;

		console.log(res.data);
	}
	async SequelMeme() {}
	async OTMeme() {}
};
