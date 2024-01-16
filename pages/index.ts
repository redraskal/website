import { Route, html, RouteWebSocket } from "gateway";
import { spotify } from "../src";
import history, { SpotifyTrackRow } from "../src/history";
import { meta } from "../templates/meta";
import template from "../templates/template";

const head = html`
	${meta({
		title: "Benjamin Ryan",
		description: "Computer Science Student @ Maryville University",
		url: "https://redraskal.sh",
	})}
	<link rel="stylesheet" href="/css/style.css" />
`;

function spotifyTrack(track: SpotifyTrackRow, progress?: number) {
	return html`<a
		href="https://open.spotify.com/track/${track.track_id}"
		target="_blank"
		class="green"
		${progress ? ` style="--progress: ${progress}%;"` : ""}
	>
		${track.song} by ${track.artist.split(";").join(", ")}
	</a>`;
}

export default class implements Route {
	head() {
		return head;
	}

	ws(): RouteWebSocket {
		return {
			open(ws) {
				ws.subscribe("spotify:live");
			},
		};
	}

	body() {
		return template(
			"/",
			html`
				<section>
					<h1>Benjamin Ryan</h1>
					<p>
						Hey, I'm a CS student at Maryville University! I love programming, design, as well as listening to &
						producing music. I publish my side projects on GitHub! Feel free to <a href="/contact">connect</a> with me.
					</p>
				</section>
				<section id="spotify">
					<p>
						<span class="recording" ${!spotify ? "disabled" : ""}></span>
						Currently listening to
						<span style="color: red" id="spotify-live"
							>${spotify
								? spotifyTrack(
										spotify,
										((Date.now() - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start)) *
											100
								  )
								: html`N/A`}</span
						>
					</p>
					<div>
						<button id="spotify-recent" disabled>+ Recent</button>
						<button id="spotify-top">+ Top</button>
					</div>
					<ul id="spotify-list">
						${history.last(5)?.map((row, i) => html`<li>${i + 1}. ${spotifyTrack(row)}</li>`) || ""}
					</ul>
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
							<a href="https://github.com/redraskal/clips" target="_blank">clips</a>
							<span> - self-hosted video game clips website harnessing the speed of Bun</span>
						</li>
						<li>
							<a href="https://github.com/redraskal/obs-replay-folders" target="_blank">obs-replay-folders</a>
							<span> - OBS script to automatically categorize replays with game-specific folders</span>
						</li>
						<li>Myth of Lohim - programming lead & devops, medieval fantasy dungeon crawler</li>
					</ul>
				</section>
				<section>
					<h2>Past projects</h2>
					<ul>
						<li>
							<a href="https://github.com/redraskal/bun-migrate" target="_blank">bun-migrate</a>
							<span> - simple SQLite file-based migration system for Bun</span>
						</li>
						<li>
							<a href="https://github.com/redraskal/bun-kv" target="_blank">bun-kv</a>
							<span> - simple KV store using Bun's SQLite module</span>
						</li>
						<li>
							<a href="https://github.com/redraskal/css" target="_blank">css</a>
							<span> - tiny CSS-only framework based on Vercel</span>
						</li>
					</ul>
				</section>
				<script src="/js/home.js" type="text/javascript"></script>
			`
		);
	}
}
