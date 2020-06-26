import React, { Component } from 'react';
// import { getMovies } from '../services/fakeMovieService';
import { getMovies, deleteMovie } from '../services/movieService';
// import Like from './common/like';
import { toast } from 'react-toastify';
// import { getGenres } from '../services/fakeGenreService'
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import { Paginate } from '../utils/paginate';
import { Link } from 'react-router-dom'
import ListGroup from './listGroup';
// import moviesTable from './moviesTable';
import MoviesTable from './moviesTable';
import _ from "lodash";
import SearchBox from './common/searchBox';
// import {getMovies(id)} from '../services/fakeMoviesService';

class Movies extends Component {
    state = {
        num: 0,
        movies: [],
        genres: [],
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    }

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: '', name: 'All Genres' }, ...data]
        const { data: movies } = await getMovies()
        this.setState({ movies, genres })
    }

    handleDelete = async movie => {
        // console.log("1 movie deleted", movie)

        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id)


        this.setState({ movies })

        try {
            await deleteMovie(movie._id)
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("this movie has already been deleted")
            this.setState({ movies: originalMovies });
        }
    }
    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    }

    handleLike = movie => {
        // console.log("liked cliked", movie)
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }
    handlePageChange = page => {
        this.setState({ currentPage: page })
    }
    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    }
    handleSort = sortColumn => {

        this.setState({ sortColumn })
    }
    getPageData = () => {
        const { pageSize, currentPage, selectedGenre, sortColumn, searchQuery, movies: allMovies } = this.state
        let filtered = allMovies
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = Paginate(sorted, currentPage, pageSize)

        return { totalcount: filtered.length, data: movies };
    }

    render() {
        const { length: count } = this.state.movies
        const { pageSize, currentPage, searchQuery, sortColumn } = this.state
        const { user } = this.props;

        if (count === 0) return <h2>There is no movies in the database</h2>

        const { totalcount, data: movies } = this.getPageData();
        return (
            <div className="row">
                <div className="col-md-3">
                    <ListGroup

                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col-md-9">
                    {user && <Link to="/moviesForm" style={{ marginBottom: 20 }} className="btn btn-primary btn-lg">New Movies</Link>}
                    <h2>there are {totalcount} movies in the database</h2>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable movies={movies}
                        onLike={this.handleLike}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort} />
                    <Pagination
                        pageSize={pageSize}
                        currentPage={currentPage}
                        itemsCount={totalcount}
                        onPageChange={this.handlePageChange} />
                </div>
            </div>
        );
    }
}

export default Movies;