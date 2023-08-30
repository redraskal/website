import database from "./database";

export type SpotifyTrackRow = {
	track_id: string;
	album: string;
	album_art_url: string;
	artist: string;
	song: string;
};

export type SpotifyHistoryRow = {
	played_at: number;
} & SpotifyTrackRow;

export type SpotifyTopTrackRow = {
	plays: number;
} & SpotifyTrackRow;

const insert = database.query("INSERT INTO spotify_history VALUES ($played_at, $track_id)");
const insertTrack = database.query(
	"INSERT INTO spotify_track VALUES ($track_id, $album, $album_art_url, $artist, $song)"
);
const selectLastN = database.query(
	"SELECT * FROM spotify_history NATURAL JOIN spotify_track ORDER BY played_at DESC LIMIT $n"
);
const selectTopN = database.query(
	"SELECT track_id, album, album_art_url, artist, song, COUNT(played_at) as plays FROM spotify_history NATURAL JOIN spotify_track GROUP BY track_id ORDER BY plays DESC LIMIT $n"
);

export default class history {
	static last(n: number) {
		return selectLastN.all(n) as SpotifyHistoryRow[] | null;
	}

	static top(n: number) {
		return selectTopN.all(n) as SpotifyTopTrackRow[] | null;
	}

	static insert(row: SpotifyHistoryRow) {
		try {
			insertTrack.run(row.track_id, row.album, row.album_art_url, row.artist, row.song);
		} catch (e) {}
		insert.run(row.played_at, row.track_id);
	}
}
