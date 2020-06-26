import React, { Component } from 'react';
import Like from './common/like';
import auth from '../services/authService';
import TableHeader from './common/tableHeader';
import { Link } from 'react-router-dom';
import TableBody from './common/tableBody';
import Table from './common/table';

class MoviesTable extends Component {

    columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like', content: movie => (<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />) },

    ]

    deleteColumn =
        {
            key: 'delete', content: movie => (<button onClick={() =>
                this.props.onDelete(movie)} className="btn btn-danger btn-md">Delete</button>)
        }


    constructor() {
        super()
        const user = auth.getCurrentUser()
        if (user && user.isAdmin)
            this.columns.push(this.deleteColumn)
    };

    render() {
        const { movies, onSort, sortColumn } = this.props;
        return (
            <Table data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
                // moveis={movies}
                columns={this.columns} />
        );
    }
}

export default MoviesTable;
