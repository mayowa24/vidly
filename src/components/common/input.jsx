import React from 'react';
// import Form from './common/form';
const Input = ({ name, label, error, ...rest }) => {
    return (<div>
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                // autoFocus
                // ref={this.username} 
                {...rest}
                name={name}
                id={name} className="form-control"

            />{error && <div className="alert alert-danger">{error}</div>}
        </div>
    </div>
    );
}

export default Input;