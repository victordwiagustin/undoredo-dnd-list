import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TodosAction from '../store/actions/todosAction';

// fake data generator
// const getItems = (count) =>
//     Array.from({ length: count }, (v, k) => k).map((k) => ({
//         id: `item-${k}`,
//         content: `item ${k}`,
//     }));

// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// };

const grid = 6;

const colors = ['#ACDDDE', '#CAF1DE', '#E1F8DC', '#FEF8DD', '#FFE7C7', '#F7D8BA']

const getItemStyle = (isDragging, draggableStyle, originIdx) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#fff" : colors[originIdx] ? colors[originIdx] : 'lightgray',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    margin: '0 auto',
    background: isDraggingOver ? "lightcyan" : "lightblue",
    padding: grid,
    width: 250,
});

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        
        const { todosAction } = this.props; 
        
        todosAction.reorder(
            result.source.index,
            result.destination.index
        );
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.todos.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style,
                                                item.origin
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos.present
});

const mapDispatchToProps = dispatch => ({
    todosAction: bindActionCreators(TodosAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);