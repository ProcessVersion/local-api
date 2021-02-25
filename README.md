# local-api

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
