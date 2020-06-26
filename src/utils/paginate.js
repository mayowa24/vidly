import _ from 'lodash';
export function Paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // _.slice(items, startIndex)
    return _(items).slice(startIndex).take(pageSize).value();
}