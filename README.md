# Local API

Using the help of [this](https://www.youtube.com/watch?v=25_RgVDGGuE) tutorial, I was able to start the "base" of an API

## Endpoints

Base URL: localhost:3000

- [GET] `/fact` | Returns a fact 🧠 | [STATUS WIP]

Example response

```json
{
	"fact": "Armadillo shells are bulletproof! So when the world goes to shit grab yourself some armadillo armour",
	"source": "https://www.rd.com/list/interesting-facts/",
	"url": "https://www.reddit.com/r/facts/comments/lqe1ed/armadillo_shells_are_bulletproof_so_when_the/?utm_source=share&utm_medium=web2x&context=3",
	"success": true,
	"error": false
}
```

- [GET] `/roast` | Returns a nice roast 🔥 | [STATUS: WIP]
- [GET] `/pickup` | A nice pickup line 😏 | [STATUS: WIP]
- [GET] `/joke` | A joke 😂 | [STATUS: WIP]
- [GET] `/insta` | Fetch a users instagram profile info [STATUS: WORKING]

Example response:

```json
{
	"success": true,
	"data": {
		"status": 200,
		"statusMessage": "OK",
		"url": "https://www.instagram.com/processversion/",
		"user": {
			"thumbnail": "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-19/s320x320/67832374_2338021513182518_5064876506346422272_n.jpg?tp=1&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_ohc=WTg63IsDPHUAX9HSBly&oh=cc6d70e949c15864b069e1282d867762&oe=60635F59",
			"full_name": "Mohanmad El-Hassan",
			"bio": "I don't know what I should post on here.",
			"username": "processversion",
			"id": "11144968699"
		},
		"account": {
			"followers": 45,
			"following": 78,
			"posts": 5,
			"private": true,
			"verified": false
		}
	}
}
```

# Contact me!

Contact me `Tech!#0620` (398264990567628812)!
