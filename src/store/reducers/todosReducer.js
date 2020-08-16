import undoable from "./undoableReducer";

// fake data generator
const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k+1}`,
        content: `todo ${k+1}`,
        origin: k
    }));

// initial State 
const intialState = getItems(6)

const todo = (state = intialState, action) => {
    switch (action.type) {
        case 'REORDER_TODOS': {
            const result = Array.from(state);
            const [removed] = result.splice(action.startIndex, 1);
            result.splice(action.endIndex, 0, removed);

            return Object.assign([], result);
        }
        default: {
            return state;
        } 
    }
}

const undoableTodos = undoable(todo)

export default undoableTodos;