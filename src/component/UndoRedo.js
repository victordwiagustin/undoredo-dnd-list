import React from "react";
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

const UndoRedo = (props) => {
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
        </div>
    );
};

const mapStateToProps = (state) => ({
    canUndo: state.todos.past.length > 0,
    canRedo: state.todos.future.length > 0,
});

const mapDispatchToProps = {
    onUndo: UndoRedoAction.undo,
    onRedo: UndoRedoAction.redo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
