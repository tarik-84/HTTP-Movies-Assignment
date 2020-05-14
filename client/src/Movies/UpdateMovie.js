import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
        console.log('qq', res.data);
        // props.setMovieList([res.data]);
        props.history.push(`/`);
        window.location.reload();
      })
      .catch(err => console.log("error!!", err));   
  };

  return (
    <div className="update-movie">
      <h2>Update The Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={item.title}
        />
        <div className="split" />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={handleChange}
          value={item.director}
        />
        <div className="split" />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore Rating"
          onChange={handleChange}
          value={item.metascore}
        />
        <div className="split" />
        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={handleChange}
          value={item.stars}
        />
        <div className="split" />

        <button>Update The Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
