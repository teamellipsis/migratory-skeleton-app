import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';

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
};

class Footer extends React.Component {
    handleChange = (event, filter) => {
        this.props.dispatch(setVisibilityFilter(filter));
    };

    render() {
        const { classes, filter } = this.props;
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <BottomNavigation
                    value={filter}
                    onChange={this.handleChange}
                    showLabels
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
            </AppBar>
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
