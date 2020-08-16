import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as UndoRedoAction from "../store/actions/undoRedoAction";

const containerStyle = {
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    padding: 3,
};

const buttonStyle = {
    margin: 5,
};

// fake data generator
const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k+1}`,
        content: `todo ${k+1}`,
        origin: k
    }));

const UndoRedo = (props) => {
    useEffect(() => {
        console.log(props.todos.present, getItems(6))
        if (JSON.stringify(props.todos.present) === JSON.stringify(getItems(6))) {
            props.onReset()
        }
    }, [props.todos]);
    return (
        <div style={containerStyle}>
            <button
                onClick={props.onUndo} 
                style={buttonStyle}
                disabled={!props.canUndo}
            >
                Undo
            </button>
            <button 
                onClick={props.onRedo}
                style={buttonStyle}
                disabled={!props.canRedo}
            >
                Redo
            </button>
            <button 
                onClick={props.onReset}
                style={buttonStyle}
                disabled={!props.canUndo}
            >
                Reset
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    canUndo: state.todos.past.length > 0,
    canRedo: state.todos.future.length > 0,
    todos: state.todos
});

const mapDispatchToProps = {
    onUndo: UndoRedoAction.undo,
    onRedo: UndoRedoAction.redo,
    onReset: UndoRedoAction.reset
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
