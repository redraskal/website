import { BunFile } from "bun";
import { readdir } from "fs/promises";
import { marked } from "marked";
import { join, parse } from "path";

export type Author = {
	name: string;
	url?: string;
};

export type Article = {
	title: string;
	slug: string;
	id: number;
	description?: string;
	date: Date;
	authors: Author[];
	timeToRead: number;
	content: string;
	unlisted: boolean;
};

type TOMLMetadata = {
	title: string;
	description?: string;
	authors: Author[];
	date: string;
	unlisted?: boolean;
};

let articles: Article[] = [];
let listedArticles: Article[] = [];
const articleIndex: Record<string, Article> = {};
const files = await readdir("./blog", { withFileTypes: true });

async function read(file: BunFile) {
	let text = await file.text();
	let tomlIdentifier = 0;
	let tomlStart = -1;
	let metadata: TOMLMetadata | undefined;

	for (let i = 0; i < text.length; i++) {
		if (text[i] == "+") {
			tomlIdentifier++;
		} else if (text[i] == "\n") {
			if (tomlIdentifier == 3) {
				if (tomlStart < 0) {
					tomlStart = i;
				} else {
					metadata = Bun.TOML.parse(text.slice(tomlStart, i - 4)) as TOMLMetadata;
					text = text.slice(i);
					break;
				}
			}
			tomlIdentifier = 0;
		}
	}

	if (!metadata) {
		throw new Error(`${file.name} has no TOML article metadata.`);
	}

	const title = parse(file.name!).name.split(".");

	const article: Article = {
		title: metadata.title,
		id: Number(title[0]),
		slug: title[1],
		description: metadata.description,
		date: new Date(Date.parse(metadata.date)),
		authors: metadata.authors,
		timeToRead: -1,
		content: marked.parse(text),
		unlisted: metadata.unlisted || false,
	};

	return article;
}

console.log("📰 Parsing articles...");

for (let file of files) {
	if (!file.name.endsWith(".md")) continue;
	const article = await read(Bun.file(join("./blog", file.name)));
	articleIndex[article.slug] = article;
	articles.push(article);
}

articles = articles.sort((a, b) => b.date.getTime() - a.date.getTime());
listedArticles = articles.filter((article) => !article.unlisted);

export { articles, listedArticles, articleIndex };
