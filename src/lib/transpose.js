import zip from 'lodash/array/zip';

export default function t (matrix) {
    return zip.apply(null, matrix);
};
