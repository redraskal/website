import { Route, html, RouteWebSocket } from "gateway";
import { spotify } from "../src";
import history, { SpotifyTrackRow } from "../src/history";

function spotifyElement(track: SpotifyTrackRow, progress?: number) {
	// prettier-ignore
	return html`<a href="https://open.spotify.com/track/${track.track_id}" 
		target="_blank" 
		class="green"
		${progress ? ` style="--progress: ${progress}%;"` : ""}>
		${track.song} by ${track.artist.split(";").join(", ")}
	</a>`;
}

export default class implements Route {
	head() {
		return html`
			<meta name="theme-color" content="#000000" />
			<title>Benjamin Ryan • redraskal</title>
			<meta name="title" content="Benjamin Ryan • redraskal" />
			<meta name="description" content="Computer Science Student @ Maryville University" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://redraskal.sh" />
			<meta property="og:title" content="Benjamin Ryan • redraskal" />
			<meta property="og:description" content="Computer Science Student @ Maryville University" />
			<meta property="og:image" content="" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://redraskal.sh" />
			<meta property="twitter:title" content="Benjamin Ryan • redraskal" />
			<meta property="twitter:description" content="Computer Science Student @ Maryville University" />
			<meta property="twitter:image" content="" />
			<link rel="stylesheet" href="/css/style.css" />
		`;
	}

	ws(): RouteWebSocket {
		return {
			open(ws) {
				ws.subscribe("spotify:live");
			},
		};
	}

	body() {
		// prettier-ignore
		return html`
			<main>
				<section>
					<h1>Hey, I'm Benjamin Ryan</h1>
					<p>My capacity for wonder drives my unwavering ambition to evaluate software engineering challenges with curiosity and excellence. I leverage over a decade of personal experience and knowledge as a student at Maryville University to commonly solve problems in Go, TypeScript, C++, C, Java, and Kotlin.</p>
				</section>
				<section id="spotify">
					<p>
						<span class="recording" ${!spotify ? "disabled" : ""}></span>
						Currently listening to 
						<span style="color: red" id="spotify-live">${spotify ? 
							spotifyElement(spotify, (
									(Date.now() - spotify.timestamps.start)
									/
									(spotify.timestamps.end - spotify.timestamps.start)
								) * 100
							) 
							: html`N/A`}</span>
					</p>
					<div>
						<button id="spotify-recent" disabled>+ Recent</button>
						<button id="spotify-top">+ Top</button>
					</div>
					<ul id="spotify-list">
						${history.last(5)?.map((row, i) => html`
							<li>
								${i+1}. ${spotifyElement(row)}
							</li>
						`) || ""}
					</ul>
					<p>I built this realtime Spotify status using TypeScript, <a href="https://bun.sh" target="_blank">Bun</a> (JavaScript runtime) and my minimal web framework called <a href="https://github.com/redraskal/gateway" target="_blank">gateway</a>.</p>
				</section>
				<section>
					<h2>Active projects</h2>
					<ul>
						<li>
							<a href="https://github.com/redraskal/r6-dissect" target="_blank">r6-dissect</a>
							<span> - match replay API & CLI for Rainbow Six: Siege's Dissect (.rec) format</span>
						</li>
						<li>
							<a href="https://github.com/redraskal/gateway" target="_blank">gateway</a>
							<span> - minimal & performant web framework for Bun</span>
						</li>
						<li>
							<a href="https://everus.sh" target="_blank">everus</a>
							<span> - distributed Minecraft networking (soon™)</span>
						</li>
						<li>Myth of Lohim - programming lead & devops, medieval fantasy dungeon crawler</li>
					</ul>
				</section>
				<section>
					<h2>Connect</h2>
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
							<pre>X:           </pre>
							<a href="https://twitter.com/ItsRedraskal" target="_blank">@ItsRedraskal</a>
						</li>
						<li>
							<pre>Public keys: </pre>
							<a href="https://github.com/redraskal.keys" target="_blank">redraskal.keys</a>
						</li>
					</ul>
				</section>
				<footer>
					<p>
						[0.000000] init_memory_mapping: [mem 0x00100000-0xdefa4fff]
						<br>
						[1.169734] found BLUME MP-table mapped at [mem 0x10121989-0x000f9bff]
					</p>
					<p>- - - - - - - - - - - - - - - - - - - - - - -</samp>
					<p>
						Berkeley Mono Font - 
						<a href="https://berkeleygraphics.com/typefaces/berkeley-mono/" target="_blank"
							>https://berkeleygraphics.com/typefaces/berkeley-mono</a
						>
					</p>
					<br />
				</footer>
			</main>
			<script src="/js/home.js" type="text/javascript"></script>
		`;
	}
}
