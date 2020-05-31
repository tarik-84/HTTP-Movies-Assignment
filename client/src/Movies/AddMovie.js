import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {TextField, Button} from '@material-ui/core';

const initMovie = {
	director: "",
	id: "",
	metascore: "",
	stars: [],
	title: "",
};

const AddMovie = (props) => {
	console.log("update1", props);
	const [add, setAdd] = useState(initMovie);
	const history = useHistory();

	

	const changeHandler = (e) => {
		if (e.target.name === "stars") {
			setAdd({
				...add,
				[e.target.name]: e.target.value.split(","),
			});
		} else {
			setAdd({
				...add,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post(`http://localhost:5000/api/movies`, add)
            .then((res) => {
            console.log(res) 
            history.push(`/`)
        })
			// .finally(() => window.location.reload());
	};

	return (
		<div className='add-movie'>
			<h2>Add Movie</h2>
			<form onSubmit={handleSubmit}>
				<TextField className='field'
                    id="outlined-basic"
                    type="text"
					name="title"
					onChange={changeHandler}
					placeholder="title"
					value={add.title}
				/>
				<div className="baseline" />
				<TextField
                    id="outlined-basic"
                    type="text"
					name="director"
					onChange={changeHandler}
					placeholder="director"
					value={add.director}
				/>
				<div className="baseline" />
				<TextField
                    id="outlined-basic"
                    type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={add.metascore}
				/>
				<div className="baseline" />
				<TextField
                    id="outlined-basic"
                    type="text"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={add.stars}
				/>
        <div className="baseline" />
        <Button className='field' variant="contained" color="primary" type="submit">Add</Button>
			</form>
		</div>
	);
};

export default AddMovie;


{/* <TextField className='text'
        id="outlined-basic"
        onChange={changeHandler}
        value={add.title}
        type="text"
        name="title"
        label="Title"
        /> */}