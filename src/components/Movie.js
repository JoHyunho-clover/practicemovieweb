import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Movie.css';

function Movie(props){
    return(
        <Link to={{
            pathname: `/movie/${props.id}`,
            state: {
                year:props.year,
                title:props.title,
                summary:props.summary,
                poster:props.poster,
                genres:props.genres
            }
          }}
          >
        <div className="movie">
            <img src={props.poster} alt={props.title} title={props.title}></img>
            <div className="movie__data">
                <h3 class="movie__title">{props.title}</h3>
                <h3 class="movie__year">{props.year}</h3>
                <ul className="movie__genres">
                    {props.genres.map((genre,index)=>(
                    <li key={index}className="genres__genre">
                        {genre}</li>
                ))}</ul>
                <p className="movie__summary">{props.summary.slice(0,180)}...</p>
            </div>
        </div>
        </Link>
        )
}

Movie.propType={
    id:PropTypes.number.isRequired,
    year:PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    poster:PropTypes.string.isRequired,
    genres:PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;