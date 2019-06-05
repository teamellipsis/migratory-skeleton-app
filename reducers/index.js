import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

import floatingDock from '../platform/reducers/floatingDock';

export default combineReducers({
    todos,
    visibilityFilter,
    floatingDock,
});
