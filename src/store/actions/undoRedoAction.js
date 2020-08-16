export const undo = () => dispatch => {
    dispatch({
        type: 'UNDO',
    });
}

export const redo = () => dispatch => {
    dispatch({
        type: 'REDO',
    });
}