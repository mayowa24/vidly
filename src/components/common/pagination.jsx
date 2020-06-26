import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// class Pagination extends Component {
//     state = {}
//     render() {
//         return (
//             <nav aria-label="Page navigation example">
//                 <ul className="pagination">
//                     <li className="page-item"><a className="page-link" href="#">Previous</a></li>
//                     <li className="page-item"><a className="page-link" href="#">1</a></li>
//                     <li className="page-item"><a className="page-link" href="#">2</a></li>
//                     <li className="page-item"><a className="page-link" href="#">3</a></li>
//                     <li className="page-item"><a className="page-link" href="#">Next</a></li>
//                 </ul>
//             </nav>
//         );
//     }
// }

// export default Pagination;
const Pagination = props => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page =>
                    <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <a className="page-link"
                            // currentPage={() => currentPage} 
                            onClick={() => onPageChange(page)}>{page}</a></li>
                )}

            </ul>
        </nav>
    );
}
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
export default Pagination;