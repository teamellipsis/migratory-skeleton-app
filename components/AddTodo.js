import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { connect } from 'react-redux';
import { addTodo } from '../actions';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
});

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    handleOnClick = () => {
        let todoText = this.textRef.current.value;
        this.props.dispatch(addTodo(todoText));
        this.textRef.current.value = "";
    };

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Todo
                </Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <InputBase
                            inputRef={this.textRef}
                            placeholder="Type todo here"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <IconButton onClick={this.handleOnClick} color="inherit" aria-label="Open drawer">
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

AddTodo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(AddTodo));
