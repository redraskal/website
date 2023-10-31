import { Route, html } from "gateway";
import { meta } from "../templates/meta";
import template from "../templates/template";

export default class implements Route {
	head() {
		return html`
			${meta({
				title: "Contact",
				url: "https://redraskal.sh/contact",
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
						<a href="mailto:ben@ryben.dev" target="_blank">ben@ryben.dev</a>
					</p>
					<p>
						Discord:
						<span> </span>
						<a href="https://discord.com/users/117016705796014083" target="_blank">redraskal</a>
					</p>
					<p>
						GitHub:
						<span> </span>
						<a href="https://github.com/redraskal" target="_blank">redraskal</a>
					</p>
					<p>
						X:
						<span> </span>
						<a href="https://twitter.com/ItsRedraskal" target="_blank">@ItsRedraskal</a>
					</p>
				</section>
			`
		);
	}
}
