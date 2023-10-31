import { html, HTMLTemplateString } from "gateway";
import { currentCommit } from "../src/git";

type NavLink = {
	href: string;
	label: string;
	current: boolean;
};

function navLink(link: NavLink) {
	return html`
		<a href="${link.href}" ${link.current ? `aria-current="page"` : ""}>
			<button>${link.label}</button>
		</a>
	`;
}

const pages = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/blog",
		label: "Blog",
	},
	{
		href: "/contact",
		label: "Contact",
	},
] as NavLink[];

export default function (path: string, body: HTMLTemplateString) {
	return html`
		<main>
			<div id="horizon"></div>
			<hr />
			<nav>${pages.map((page) => navLink({ ...page, current: page.href == path }))}</nav>
			<hr />
			${body}
			<footer>
				<a href="mailto:ben@ryben.dev" target="_blank">ben@ryben.dev</a>
				<br />
				<a href="https://github.com/redraskal.keys" target="_blank">redraskal.keys</a>
				<br />
				version: main/${currentCommit}
			</footer>
			<hr />
		</main>
	`;
}
