import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';

class FloatingDock extends React.Component {
    state = {
        onDrag: false,
    };

    handleOnClick = () => {
        if (!this.state.onDrag) this.props.open();
    };

    handleOnDrag = () => {
        this.setState({
            onDrag: true,
        })
    };

    handleOnStart = () => {
        this.setState({
            onDrag: false,
        })
    };

    handleOnContextMenu = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <Draggable
                allowAnyClick
                onDrag={this.handleOnDrag}
                onStart={this.handleOnStart}
            >
                <Fab
                    style={{ zIndex: 2147483647, backgroundColor: '#00b8ff80' }}
                    aria-label="Add"
                    onClick={this.handleOnClick}
                    onContextMenu={this.handleOnContextMenu}
                >
                    <SettingsIcon />
                </Fab>
            </Draggable>
        );
    }
}

FloatingDock.propTypes = {
    open: PropTypes.func.isRequired,
};

export default FloatingDock;
