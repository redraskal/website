import { Route, html, cache } from "gateway";
import { listedArticles } from "../src/articles";
import { meta } from "../templates/meta";
import template from "../templates/template";

@cache()
export default class implements Route {
	head() {
		return html`
			${meta({
				title: "Posts",
				url: "https://redraskal.sh/posts",
			})}
			<link rel="stylesheet" href="/css/style.css" />
		`;
	}

	body() {
		return template(
			"/posts",
			html`
				<section>
					<h1>Posts</h1>
					${listedArticles.length == 0 ? html`<p>No posts yet.</p>` : ""}
					${listedArticles.map(
						(article) => html`
							<a href="/${article.slug}">${article.slug}.md - ${article.title}</a>
							<br />
						`
					)}
				</section>
			`
		);
	}
}
