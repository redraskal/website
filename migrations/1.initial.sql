CREATE TABLE spotify_track (
	track_id TEXT NOT NULL PRIMARY KEY,
	album TEXT NOT NULL,
	album_art_url TEXT NOT NULL,
	artist TEXT NOT NULL,
	song TEXT NOT NULL
) WITHOUT ROWID;

CREATE TABLE spotify_history (
	played_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY,
	track_id TEXT NOT NULL REFERENCES spotify_track(track_id) ON DELETE CASCADE
) WITHOUT ROWID;
