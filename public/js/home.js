const recording = document.querySelector(".recording");
const spotifyRecent = document.getElementById("spotify-recent");
const spotifyTop = document.getElementById("spotify-top");
const spotifyList = document.getElementById("spotify-list");
const spotifyLive = document.getElementById("spotify-live");

function songElement(data) {
	let song = document.createElement("a");
	song.href = `https://open.spotify.com/track/${data.track_id}`;
	song.target = "_blank";
	song.innerHTML = `${data.song} by ${data.artist.split(";").join(", ")}`;
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
	const data = JSON.parse(event.data);
	if (data.track_id) {
		const song = songElement(data);
		spotifyLive.innerText = "";
		spotifyLive.appendChild(song);
		recording.removeAttribute("disabled");
		if (spotifyRecent.hasAttribute("disabled")) {
			await list("recent", 5);
		} else {
			await list("top", 5);
		}
	} else {
		spotifyLive.style.color = "red";
		spotifyLive.innerText = "N/A";
		recording.setAttribute("disabled", true);
	}
});
