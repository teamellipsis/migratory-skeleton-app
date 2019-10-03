import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const styles = {
    topPadding: {
        paddingTop: 56 * 2,
        "@media (min-width:0px) and (orientation: landscape)": {
            paddingTop: 48 * 2,
        },
        "@media (min-width:600px)": {
            paddingTop: 64 * 2,
        },
    },
    bottomPadding: {
        paddingBottom: 56,
        "@media (min-width:0px) and (orientation: landscape)": {
            paddingBottom: 48,
        },
        "@media (min-width:600px)": {
            paddingBottom: 64,
        },
    },
};

class App extends React.Component {
    render() {
        const { classes } = this.props;
        const todoListClass = classes.topPadding + ' ' + classes.bottomPadding;
        return (
            <React.Fragment>
                <AddTodo />
                <div className={todoListClass}>
                    <TodoList />
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
