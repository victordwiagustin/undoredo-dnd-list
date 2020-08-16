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

export const reset = () => dispatch => {
    dispatch({
        type: 'RESET',
    });
}