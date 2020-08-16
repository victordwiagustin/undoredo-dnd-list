
export const reorder = (startIndex, endIndex) => dispatch => {
    dispatch({
        type: 'REORDER_TODOS',
        startIndex, endIndex
    });
}
