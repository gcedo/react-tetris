import zip from 'lodash/array/zip';

export default function rotate (matrix) {
    return zip.apply(null, matrix).map(row => row.reverse());
};
