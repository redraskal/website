import { MatchedRoute } from "bun";
import { Data, Route, html, meta } from "gateway";
import { articleIndex } from "../src/articles";
import template from "../templates/template";

const dateFormat = new Intl.DateTimeFormat("en-US", {
	dateStyle: "long",
});

export default class implements Route {
	async data(_: Request, route: MatchedRoute) {
		const article = articleIndex[route.params.slug.toLowerCase()];
		return {
			article,
		};
	}

	head(data: Data<this>) {
		return html`
			${meta({
				title: data.article.title + " • redraskal",
				description: data.article.description,
			})}
			<link rel="stylesheet" href="/css/style.css" />
			<link rel="stylesheet" href="/css/templates/article.css" />
		`;
	}

	body(data: Data<this>) {
		if (!data.article) return Response.redirect("/404");
		return template(
			`/posts`,
			html`
				<section>
					<h1>${data.article.title}</h1>
					<p>
						<span>
							${data.article.authors
								.map((author) =>
									author.url ? `<a href="${author.url}" target="_blank">${author.name}</a>` : author.name
								)
								.join(", ")}
							<br />
							${dateFormat.format(data.article.date)}
						</span>
					</p>
					<p>- - - - - - - - - -</p>
				</section>
				<section>${data.article.content}</section>
				<section>
					<a href="/posts"><- More posts</a>
				</section>
			`
		);
	}
}
