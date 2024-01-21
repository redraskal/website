import { Route, html, cache, meta } from "gateway";
import template from "../templates/template";

@cache()
export default class implements Route {
	head() {
		return html`
			${meta({
				title: "Contact • redraskal",
			})}
			<link rel="stylesheet" href="/css/style.css" />
		`;
	}

	body() {
		return template(
			"/contact",
			html`
				<section>
					<h1>Contact</h1>
					<p>
						Email:
						<span> </span>
						<a href="mailto:ben@ctos.sh" target="_blank">ben@ctos.sh</a>
					</p>
					<p>
						LinkedIn:
						<span> </span>
						<a href="https://www.linkedin.com/in/ryben-dev" target="_blank">in/ryben-dev</a>
					</p>
					<p>
						GitHub:
						<span> </span>
						<a href="https://github.com/redraskal" target="_blank">@redraskal</a>
					</p>
					<p>
						Discord:
						<span> </span>
						<a href="https://discord.com/users/117016705796014083" target="_blank">@redraskal</a>
					</p>
					<p>
						X:
						<span> </span>
						<a href="https://twitter.com/redraskal_" target="_blank">@redraskal_</a>
					</p>
				</section>
			`
		);
	}
}
