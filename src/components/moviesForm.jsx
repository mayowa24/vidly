import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from './common/form';
// import { getMovie, saveMovie } from "../services/fakeMovieService";
import http from '../services/httpServices';
import { apiUrl } from "../config.json";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
class MoviesForm extends Form {
    state = {
        data: {
            title: '', genreId: '', numberInStock: '', dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    }

    async componentDidMount() {
        const { data: genres } = await getGenres();
        this.setState({ genres })

        const movieId = this.props.match.params.id
        if (movieId === "new") return;

        const { data: movie } = await getMovie(movieId);
        if (!movie) return this.props.history.replace("/moviesForm");

        this.setState({ data: this.mapToViewModel(movie) });
    }
    mapToViewModel(movie) {
        return {
            _id: movie.id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    };


    doSubmit = () => {

        http.post(apiUrl + "/movies")
        saveMovie(this.state.data)

        this.props.history.push("/movies")
        // console.log("saved")
    }

    render() {
        return (<div>
            {/* <h1>movies: {this.props.movies.id}</h1> */}
            <h1>New Movie</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("title", "Titile", "text", "Enter the title")}
                {this.renderSelect("genreId", "Genre", this.state.genres)}
                {/* <div className="form Group">
                    <label htmlFor="genre">Genre</label>
                    <select className="custom-select" name="genre">
                        <option value="1">Action</option>
                        <option value="2">Commedy</option>
                        <option value="3">Thriller</option>
                    </select>
                </div> */}
                {this.renderInput("numberInStock", "Number in Stock", "text", "Enter the Stock Number")}
                {this.renderInput("dailyRentalRate", "Rate", "text", "Enter the Rate")}
                {this.renderButton('Save')}
            </form>
        </div>
        );
    }
}

export default MoviesForm;