import { Route } from "gateway";
import history from "../../src/history";

export default class implements Route {
	data() {
		return history.top(10) || {};
	}

	body() {
		return Response.redirect("/");
	}
}
