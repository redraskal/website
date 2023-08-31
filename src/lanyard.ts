export default class LanyardClient {
	private ws?: WebSocket;
	private heartbeat?: Timer;
	private subscribeTo: string[];
	private listeners: Record<string, any> = {};
	private backoff: number = 1000;

	constructor(subscribeTo: string | string[]) {
		this.subscribeTo = Array.isArray(subscribeTo) ? subscribeTo : [subscribeTo];
		this.connect();
	}

	private connect() {
		this.ws = new WebSocket("wss://api.lanyard.rest/socket");
		this.ws.addEventListener("message", (event) => {
			if (event.data instanceof Buffer) return;
			const msg = JSON.parse(event.data);
			switch (msg.op) {
				case 0:
					switch (msg.t) {
						case "INIT_STATE":
							this.subscribeTo.forEach((id) => {
								const presence = msg.d[id];
								this.listeners[id].forEach((listener: any) => listener(presence));
							});
							break;
						case "PRESENCE_UPDATE":
							this.listeners[msg.d.discord_user.id].forEach((listener: any) => listener(msg.d));
							break;
						default:
							console.warn(`[lanyard] type not found: ${msg.t}`);
					}
					break;
				case 1:
					this.heartbeat = setInterval(() => {
						if (this.ws && this.ws.readyState == 1) {
							this.ws.send(
								JSON.stringify({
									op: 3,
								})
							);
						}
					}, msg.d.heartbeat_interval);
					this.ws!.send(
						JSON.stringify({
							op: 2,
							d: {
								subscribe_to_ids: this.subscribeTo,
							},
						})
					);
					console.log(`[lanyard] subscribed to ${this.subscribeTo}`);
					break;
				default:
					console.warn(`[lanyard] op not found: ${msg.op}`);
			}
		});
		this.ws.addEventListener("close", () => {
			clearInterval(this.heartbeat);
			this.backoff *= 2;
			setTimeout(() => this.connect(), this.backoff);
			console.log(`[lanyard] closed`);
		});
	}

	addEventListener(id: string, func: (presence: any) => void) {
		if (!this.listeners[id]) {
			this.listeners[id] = [];
		}
		this.listeners[id].push(func);
	}

	removeEventListener(func: (presence: any) => void) {
		if (!func) {
			this.listeners = {};
		} else {
			Object.keys(this.listeners).forEach((id) => {
				this.listeners[id] = this.listeners[id].filter((x: any) => x !== func);
			});
		}
	}
}
