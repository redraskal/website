import { Route, html } from "gateway";

export default class implements Route {
	head() {
		return html`
			<meta name="theme-color" content="#000000" />
			<title>Benjamin Ryan • redraskal</title>
			<meta name="title" content="Hey, I'm Benjamin Ryan." />
			<meta name="description" content="Computer Science Student @ Maryville University" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://redraskal.sh" />
			<meta property="og:title" content="Hey, I'm Benjamin Ryan." />
			<meta property="og:description" content="Computer Science Student @ Maryville University" />
			<meta property="og:image" content="" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://redraskal.sh" />
			<meta property="twitter:title" content="Hey, I'm Benjamin Ryan." />
			<meta property="twitter:description" content="Computer Science Student @ Maryville University" />
			<meta property="twitter:image" content="" />
			<link rel="stylesheet" href="/css/style.css" />
		`;
	}

	body() {
		return html`
			<main>
				<section>
					<h1>Hey, I'm Benjamin Ryan.</h1>
					<p>Computer Science Student @ Maryville University</p>
				</section>
				<section>
					<p>Listening to <span style="color: red" id="spotify">N/A</span></p>
				</section>
				<section>
					<h2>Current projects:</h2>
					<ul>
						<li>
							<a href="https://github.com/redraskal/r6-dissect" target="_blank">r6-dissect</a>
							<span> - match replay API & CLI for Rainbow Six: Siege's Dissect (.rec) format</span>
						</li>
						<li>
							<a href="https://github.com/redraskal/gateway" target="_blank">gateway</a>
							<span> - experimental Bun web framework</span>
						</li>
						<li>Myth of Lohim - programming lead & devops, medieval fantasy dungeon crawler</li>
					</ul>
				</section>
				<section>
					<h2>Past projects:</h2>
					<ul>
						<li>
							<a href="https://mccisland.net" target="_blank">MCC Island</a> - public MC Championship Minecraft server
						</li>
					</ul>
				</section>
				<section>
					<h2>Connect:</h2>
					<ul>
						<li>
							<pre>Email:       </pre>
							<a href="mailto:ben@ryben.dev" target="_blank">ben@ryben.dev</a>
						</li>
						<li>
							<pre>Discord:     </pre>
							<a href="https://discord.com/users/117016705796014083" target="_blank">redraskal</a>
						</li>
						<li>
							<pre>GitHub:      </pre>
							<a href="https://github.com/redraskal" target="_blank">redraskal</a>
						</li>
						<li>
							<pre>Twitter:     </pre>
							<a href="https://twitter.com/ItsRedraskal" target="_blank">@ItsRedraskal</a>
						</li>
						<li>
							<pre>Public keys: </pre>
							<a href="https://github.com/redraskal.keys" target="_blank">redraskal.keys</a>
						</li>
					</ul>
				</section>
				<footer>
					<samp>[ 0.000000] init_memory_mapping: [mem 0x00100000-0xdefa4fff]</samp>
					<samp>[ 1.169734] found BLUME MP-table mapped at [mem 0x10121989-0x000f9bff]</samp>
					<samp>[ 0.031006] scanned 1 areas for footer</samp>
					<samp>- - - - - - - - - - - - - - - - - - - - - - -</samp>
					<samp
						>Discord Presence WS (Lanyard) -
						<a href="https://github.com/Phineas/lanyard" target="_blank">https://github.com/Phineas/lanyard</a></samp
					>
					<samp
						>Berkeley Mono Font -
						<a href="https://berkeleygraphics.com/typefaces/berkeley-mono/" target="_blank"
							>https://berkeleygraphics.com/typefaces/berkeley-mono</a
						></samp
					>
					<samp
						>Sevastopol Interface Font -
						<a href="https://www.dafont.com/sevastopol-interface.font" target="_blank"
							>https://www.dafont.com/sevastopol-interface.font</a
						></samp
					>
				</footer>
			</main>
			<script src="/js/lanyard.js" type="text/javascript"></script>
		`;
	}
}
