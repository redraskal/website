import history from "./history";
import LanyardClient from "./lanyard";
import "./articles";

const lanyard = new LanyardClient("117016705796014083"); // redraskal
export let spotify: any = null;

lanyard.addEventListener("117016705796014083", (presence) => {
	console.log(presence);
	spotify = presence.spotify;
	if (spotify) {
		for (const activity of presence.activities) {
			if (activity.name != "Spotify") continue;
			try {
				history.insert({
					played_at: activity.created_at,
					track_id: spotify.track_id,
					album: spotify.album,
					album_art_url: spotify.album_art_url,
					artist: spotify.artist,
					song: spotify.song,
				});
			} catch (e) {
				console.log("track already exists in history");
			}
		}
		server.publish("spotify:live", JSON.stringify(spotify));
	} else {
		server.publish("spotify:live", "{}");
	}
});

console.log("Hello via Bun!");
