import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InfoDialog from './InfoDialog';

import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import { VisibilityFilters } from '../constants/filters';

const styles = {
    root: {
        width: 500,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    bottomNav: {
        backgroundColor: 'inherit',
        flexGrow: 1,
    },
};

class Footer extends React.Component {
    state = {
        infoDialogOpen: false,
    }

    handleChange = (event, filter) => {
        this.props.dispatch(setVisibilityFilter(filter));
    };

    handleInfoOnClick = () => {
        this.setState({
            infoDialogOpen: true,
        });
    }

    handleInfoDialogClose = () => {
        this.setState({
            infoDialogOpen: false,
        });
    }

    render() {
        const { classes, filter } = this.props;
        return (
            <React.Fragment>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <BottomNavigation
                            value={filter}
                            onChange={this.handleChange}
                            showLabels
                            className={classes.bottomNav}
                        >
                            <BottomNavigationAction
                                value={VisibilityFilters.SHOW_ALL}
                                label="All"
                                icon={<IndeterminateCheckBox />}
                            />
                            <BottomNavigationAction
                                value={VisibilityFilters.SHOW_ACTIVE}
                                label="Active"
                                icon={<CheckBoxOutlineBlank />}
                            />
                            <BottomNavigationAction
                                value={VisibilityFilters.SHOW_COMPLETED}
                                label="Completed"
                                icon={<CheckBox />}
                            />

                        </BottomNavigation>
                        <IconButton onClick={this.handleInfoOnClick} color="inherit" aria-label="i">
                            <InfoIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <InfoDialog open={this.state.infoDialogOpen} onClose={this.handleInfoDialogClose} />
            </React.Fragment>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    filter: state.visibilityFilter
});

export default connect(mapStateToProps)(withStyles(styles)(Footer));
