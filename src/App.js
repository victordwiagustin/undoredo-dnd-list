import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import store from './store/configStore';
import TodoList from './component/TodoList';
import UndoRedo from './component/UndoRedo';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Hello</h1>
                <UndoRedo />
                <TodoList />
                
            </div>
        </Provider>
    );
}

export default App;
