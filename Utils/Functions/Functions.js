const axios = require("axios");
const BaseObj = require("../Structures/BaseObj");
require("dotenv").config();
const { Client, UserFlags } = require("discord.js");
const client = new Client();

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
	Fact() {}
	Pickup() {}
	Roast() {}
	Joke() {}
	Riddles() {}
	Topic() {}
	Dadjoke() {}
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
	async Roblox(username) {}
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
	async NeverHaveIEver() {}
	async Name() {}
	async RPS() {}
};
