const recording = document.querySelector(".recording");
const spotifyRecent = document.getElementById("spotify-recent");
const spotifyTop = document.getElementById("spotify-top");
const spotifyList = document.getElementById("spotify-list");
const spotifyLive = document.getElementById("spotify-live");
let spotifyProgressInterval;

function songElement(json) {
	let song = document.createElement("a");
	song.href = `https://open.spotify.com/track/${json.track_id}`;
	song.target = "_blank";
	song.innerHTML = `${json.song} by ${json.artist.split(";").join(", ")}`;
	song.className = "green";
	return song;
}

async function list(type, n) {
	const response = await fetch(`/spotify/${type}.json`);
	const json = await response.json();
	spotifyList.innerHTML = "";
	for (let i = 0; i < json.length && i < n; i++) {
		const row = json[i];
		const li = document.createElement("li");
		const song = songElement(row);
		li.innerText = `${i+1}. `;
		li.appendChild(song);
		if (row.plays) {
			li.innerHTML += ` - ${row.plays} plays`;
		}
		spotifyList.appendChild(li);
	}
}

async function songProgressInterval(json) {
	let response;
	if (!json) {
		response = await fetch("/spotify/live.json");
		json = await response.json();
	}
	if (!json?.timestamps) return;
	const total = json.timestamps.end - json.timestamps.start;
	const spotifyLiveLink = document.querySelector("#spotify-live > a");
	const timer = setInterval(() => {
		const progress = ((Date.now() - json.timestamps.start) / total) * 100;
		if (progress >= 100) {
			clearInterval(timer);
		}
		spotifyLiveLink.style = `--progress: ${progress}%`;
	}, 100);
	return timer;
}

if (window.location.search.startsWith("?top")) {
	spotifyTop.setAttribute("disabled", true);
	spotifyRecent.removeAttribute("disabled");
	(async () => {
		await list("top", 5);
	})();
} else {
	spotifyRecent.setAttribute("disabled", true);
}

spotifyRecent.addEventListener("click", async () => {
	spotifyRecent.setAttribute("disabled", true);
	spotifyTop.removeAttribute("disabled");
	history.pushState("", document.title, window.location.pathname);
	await list("recent", 5);
});

spotifyTop.addEventListener("click", async () => {
	spotifyTop.setAttribute("disabled", true);
	spotifyRecent.removeAttribute("disabled");
	history.pushState("", document.title, window.location.pathname + "?top=1");
	await list("top", 5);
});

ws.addEventListener("message", async (event) => {
	const json = JSON.parse(event.data);
	if (json.track_id) {
		const song = songElement(json);
		spotifyLive.innerText = "";
		spotifyLive.appendChild(song);
		recording.removeAttribute("disabled");
		if (spotifyRecent.hasAttribute("disabled")) {
			await list("recent", 5);
		} else {
			await list("top", 5);
		}
		if (spotifyProgressInterval) {
			clearInterval(spotifyProgressInterval);
		}
		spotifyProgressInterval = songProgressInterval(json);
	} else {
		spotifyLive.style.color = "red";
		spotifyLive.innerText = "N/A";
		recording.setAttribute("disabled", true);
		if (spotifyProgressInterval) {
			clearInterval(spotifyProgressInterval);
		}
	}
});

(async () => {
	await songProgressInterval();
})();
