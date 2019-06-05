const defaultState = { position: { x: 0, y: 0 } };

const floatingDock = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_FLOATING_DOCK_POSITION':
            state.position = action.position;
            return state;
        default:
            return state;
    }
};

export default floatingDock;
