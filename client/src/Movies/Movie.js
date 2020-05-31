import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie (props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log('mm', res);
        props.setReset(true)
        history.push('/');
      })
      .catch(err => console.log(err))
      
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="save-button" onClick={saveMovie}>
        Save
      </button>
      <button className="edit-button" onClick={() => history.push(`/update-movie/${params.id}`)} >
        Edit
      </button>
      <button className="delete-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
