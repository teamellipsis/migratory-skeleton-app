const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            let lastTodo = state[state.length - 1];
            let lastId = 0;
            if (lastTodo !== undefined) {
                lastId = lastTodo['id'];
            }
            return [
                ...state,
                {
                    id: lastId + 1,
                    text: action.text,
                    completed: false
                }
            ]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        default:
            return state
    }
}

export default todos;
