import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function SongEditForm() {
	let { id } = useParams();
	let navigate = useNavigate();

	const [song, setSong] = useState({
		name: "",
		artist: "",
		album: "",
		time: "",
		is_favorite: false,
	});

	const updateSong = (newSong) => {
		axios
			.put(`${API}/songs/${id}`, newSong)
			.then(() => {
				navigate(`/songs/${id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleTextChange = (event) => {
		setSong({ ...song, [event.target.id]: event.target.value });
	};
	const handleCheckboxChange = () => {
		setSong({ ...song, is_favorite: !song.is_favorite });
	};

	useEffect(() => {
		axios.get(`${API}/songs/${id}`).then(
			(response) => setSong(response.data),
			(error) => navigate(`/not-found`)
		);
	}, [id, navigate]);

	const handleSubmit = (event) => {
		event.preventDefault();
		updateSong(song, id);
	};

	return (
		<div className="newForm">
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input
					id="name"
					value={song.name}
					type="text"
					onChange={handleTextChange}
					placeholder="Name"
					required
				/>
				<br />

				<label htmlFor="artist">Artist:</label>
				<input
					id="artist"
					type="text"
					value={song.artist}
					placeholder="Artist "
					onChange={handleTextChange}
				/>
				<br />

				<label htmlFor="album">Album:</label>
				<input
					id="album"
					type="text"
					name="album"
					value={song.album}
					placeholder="Album Name "
					onChange={handleTextChange}
				/>
				<br />

				<label htmlFor="time">Time:</label>
				<input
					id="time"
					type="text"
					name="time"
					value={song.time}
					placeholder="The time "
					onChange={handleTextChange}
				/>
				<br />

				<label htmlFor="is_favorite">Favorite:</label>
				<input
					id="is_favorite"
					type="checkbox"
					onChange={handleCheckboxChange}
					checked={song.is_favorite}
				/>

				<br />
				<input type="submit" />
			</form>
		</div>
	);
}

export default SongEditForm;
