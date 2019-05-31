import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Todo from './Todo';

import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import { VisibilityFilters } from '../constants/filters';

class TodoList extends React.Component {
    render() {
        const { todos, toggleTodo } = this.props;
        return (
            <List>
                {todos.map(todo =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={() => toggleTodo(todo.id)}
                    />
                )}
            </List>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toggleTodo: PropTypes.func.isRequired
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
