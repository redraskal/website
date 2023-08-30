import { Route, RouteWebSocket } from "gateway";
import { spotify } from "../../src";

export default class implements Route {
	data() {
		return spotify || {};
	}

	ws(): RouteWebSocket {
		return {
			open(ws) {
				ws.send(JSON.stringify(spotify || {}));
				ws.subscribe("spotify:live");
			},
		};
	}

	body() {
		return Response.redirect("/");
	}
}
