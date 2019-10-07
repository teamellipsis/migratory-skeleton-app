import Action from '../actions/actions';

const infoDialog = (state = false, action) => {
    switch (action.type) {
        case Action.INFO_DIALOG_OPEN:
            return true;
        case Action.INFO_DIALOG_CLOSE:
            return false;
        default:
            return state
    }
};

export default infoDialog;
