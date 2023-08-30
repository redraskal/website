const DISCORD_ID = "117016705796014083"; // redraskal

class Lanyard {
	#ws;
	#heartbeat;
	#discord_ids;
	#listeners;

	constructor(discord_ids) {
		this.#discord_ids = Array.isArray(discord_ids) ? discord_ids : [discord_ids];
		this.#listeners = {};
		this.#connect();
	}

	#connect() {
		this.#ws = new WebSocket("wss://api.lanyard.rest/socket");
		this.#ws.addEventListener("message", (event) => {
			const msg = JSON.parse(event.data);
			switch (msg.op) {
				case 0:
					switch (msg.t) {
						case "INIT_STATE":
							this.#discord_ids.forEach(discord_id => {
								const presence = msg.d[discord_id];
								this.#listeners[discord_id].forEach(listener => listener(presence));
							});
							break;
						case "PRESENCE_UPDATE":
							this.#listeners[msg.d.discord_user.id].forEach(listener => listener(msg.d));
							break;
						default:
							console.warn(`[lanyard] type not found: ${msg.t}`);
					}
					break;
				case 1:
					this.#heartbeat = setInterval(() => {
						if (this.#ws && this.#ws.readyState == 1) {
							this.#ws.send(JSON.stringify({
								op: 3
							}));
						}
					}, msg.d.heartbeat_interval);
					this.#ws.send(JSON.stringify({
						op: 2,
						d: {
							subscribe_to_ids: this.#discord_ids
						}
					}));
					console.log(`[lanyard] subscribed to ${this.#discord_ids}`);
					break;
				default:
					console.warn(`[lanyard] op not found: ${msg.op}`);
			}
		});
		this.#ws.addEventListener("close", () => {
			clearInterval(this.#heartbeat);
			setTimeout(() => this.#connect, 3000);
			console.log(`[lanyard] closed`);
		});
	}

	addEventListener(discord_id, func) {
		if (!this.#listeners[discord_id]) {
			this.#listeners[discord_id] = [];
		}
		this.#listeners[discord_id].push(func);
	}

	removeEventListener(func) {
		if (!func) {
			this.#listeners = {};
		} else {
			Object.keys(this.#listeners).forEach(discord_id => {
				this.#listeners[discord_id] = this.#listeners[discord_id].filter(x => x !== func);
			});
		}
	}
}

const lanyard = new Lanyard(DISCORD_ID);
const spotify = document.getElementById("spotify");

lanyard.addEventListener(DISCORD_ID, presence => {
	if (presence.spotify) {
		let song = document.createElement("a");
		song.href = `https://open.spotify.com/track/${presence.spotify.track_id}`;
		song.target = "_blank";
		song.innerHTML = `${presence.spotify.song} by ${presence.spotify.artist.split(";").join(", ")}`;
		song.className = "green";
		spotify.innerText = "";
		spotify.appendChild(song);
	} else {
		spotify.style.color = "red";
		spotify.innerText = "N/A";
	}
});
