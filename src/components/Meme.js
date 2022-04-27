import React from 'react';
// import mockData from '../mockData.js';

export default function Meme() {
	const [ meme, setMeme ] = React.useState({
		topText: '',
		bottomText: '',
		randomImage: 'http://i.imgflip.com/1bij.jpg'
	});
	const [ allMemes, setAllMemes ] = React.useState([]);

	function getMemeImage() {
		const randomNumber = Math.floor(Math.random() * allMemes.length);
		const url = allMemes[randomNumber].url;
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url
		}));
	}

	React.useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((response) => response.json())
			.then((data) => setAllMemes(data.data.memes));
	}, []);

	function handleChange(event) {
		const { name, value } = event.target;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value
		}));
	}

	return (
		<main>
			<div className="form">
				<input
					type="text"
					placeholder="Top text"
					className="form--input"
					onChange={handleChange}
					name="topText"
					value={meme.topText}
				/>
				<input
					type="text"
					placeholder="Bottom text"
					className="form--input"
					onChange={handleChange}
					name="bottomText"
					value={meme.bottomText}
				/>
				<button className="form--button" onClick={getMemeImage}>
					Get a new meme image 🖼
				</button>
			</div>
			<div className="meme">
				<img src={meme.randomImage} className="meme--image" alt="meme" />
				<h2 className="meme--text top">{meme.topText}</h2>
				<h2 className="meme--text bottom">{meme.bottomText}</h2>
			</div>
		</main>
	);
}
