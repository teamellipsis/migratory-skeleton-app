import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import FloatingDock from './FloatingDock';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import platformReducer from '../reducers';

const styles = {
    fullList: {
        width: 'auto',
    },
};

class ControlPanel extends React.Component {
    state = {
        bottom: false,
    };
    options = [
        { key: 'saveAppState', title: 'Save app state' },
        { key: 'closeApp', title: 'Close app' },
    ];

    constructor(props) {
        super(props);
        this.platformStore = createStore(platformReducer, props.platformState);
    }

    toggleDrawer = (open) => () => {
        this.setState({
            bottom: open,
        });
    };

    handleOpen = () => {
        this.toggleDrawer(true)();
    };

    handleClose = () => {
        this.toggleDrawer(false)();
    };

    handleClickDrawerItem = key => () => {
        this[key]();
    };

    saveAppState = () => {
        const state = {
            _appState: this.props.appStore.getState(),
            _platformState: this.platformStore.getState(),
        }

        fetch('/__save', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(state),
        }).then((res) => {
            this.handleClose();
        });
    }

    closeApp = () => {
        fetch('/__close', {
            method: 'post',
        }).then((res) => {
            fetch('/__ping', {
                method: 'get',
            });
            this.handleClose();
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Provider store={this.platformStore}>
                <FloatingDock open={this.handleOpen} />
                <Drawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer(false)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                    >
                        <div className={classes.fullList}>
                            <List>
                                {this.options.map(({ key, title }) => (
                                    <ListItem button key={key} onClick={this.handleClickDrawerItem(key)}>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </div>
                </Drawer>
            </Provider>
        );
    }
}

ControlPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    appStore: PropTypes.object.isRequired,
    platformState: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlPanel);
