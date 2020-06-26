// const ListGroup = () => {
//     return (<div>
//         <ul className="list-group">
//             <li className="list-group-item active">All Genres</li>
//             <li className="list-group-item">Action</li>
//             <li className="list-group-item">Comedy</li>
//             <li className="list-group-item">Thriller</li>

//         </ul>
//     </div>);
// }

// export default ListGroup;

import React, { Component } from 'react';
class ListGroup extends Component {
    state = {}
    render() {
        const { items, valueProperty, textProperty, selectedItem, onItemSelect } = this.props;
        return (<ul className="list-group">
            {items.map(item =>
                <li onClick={() => onItemSelect(item)} key={item[valueProperty]} className={item === selectedItem ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li>
            )}



        </ul>);
    }
}
ListGroup.defaultProps = {
    valueProperty: "_id",
    textProperty: "name"
};
export default ListGroup;