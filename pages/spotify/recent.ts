import { Route } from "gateway";
import history from "../../src/history";

export default class implements Route {
	data() {
		return history.last(10);
	}

	body() {
		return Response.redirect("/");
	}
}
