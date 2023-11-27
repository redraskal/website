import { html, HTMLTemplateString } from "gateway";

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
		href: "/posts",
		label: "Posts",
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
				<a href="mailto:ben@ctos.sh" target="_blank">ben@ctos.sh</a>
				<br />
				<a href="https://discord.com/users/117016705796014083">discord.com/@redraskal</a>
				<br />
				<a href="https://github.com/redraskal.keys" target="_blank">redraskal.keys</a>
			</footer>
			<hr />
		</main>
	`;
}
