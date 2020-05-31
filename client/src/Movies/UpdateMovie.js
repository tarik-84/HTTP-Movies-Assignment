import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {TextField, Button} from '@material-ui/core';



const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};
const UpdateMovie = props => {
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();
  console.log('tar', item)
  
  useEffect(() => {
    const movieToUpdate = props.movieList.find(items => `${items.id}` === id);
    console.log('rr', movieToUpdate);
    if (movieToUpdate) {
      setItem(movieToUpdate);
    }
  }, [props.movieList, id]);

  const handleChange = event => {
    let value = event.target.value;
    if (event.target.name === "metascore") {
      value = parseInt(value, 10);
    } 
    
    setItem({
      ...item,
      [event.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        console.log('qq', res);
        props.setEdit(true);
        props.history.push('/');
      })
      .catch(err => console.log("error!!", err));   
  };

  return (
    <div className="update-movie">
      <h2>Update The Movie</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={item.title}
        />
        <div className="split" />
        <TextField
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChange}
          value={item.director}
        />
        <div className="split" />
        <TextField
          type="number"
          name="metascore"
          placeholder="Metascore Rating"
          onChange={handleChange}
          value={item.metascore}
        />
        <div className="split" />
        <TextField
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={handleChange}
          value={item.stars}
        />
        <div className="split" />
        <Button variant="contained" color="primary" type="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdateMovie;
