import { Route, html } from "gateway";
import { meta } from "../templates/meta";

export default class implements Route {
	head() {
		return html`
			${meta({
				title: "404",
				description: "Page not found.",
				url: "https://redraskal.sh/404",
			})}
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/pages/404.css" />
		`;
	}

	body(_: any, err?: Error) {
		return html`
			<main>
				<h1>404: Page not found.</h1>
				<a href="/">
					<button>travel home</button>
				</a>
				<footer>
					photo by <a href="https://unsplash.com/@nasa" target="_blank">NASA</a>
					<span> on </span>
					<a href="https://unsplash.com/photos/8Hjx3GNZYeA" target="_blank">Unsplash</a>
				</footer>
			</main>
		`;
	}
}
