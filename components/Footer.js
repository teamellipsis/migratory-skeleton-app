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
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        let filter = this.getFilter(value);
        this.props.dispatch(setVisibilityFilter(filter));
    };

    getFilter = (value) => {
        switch (value) {
            case 0:
                return VisibilityFilters.SHOW_ALL;
            case 1:
                return VisibilityFilters.SHOW_ACTIVE;
            case 2:
                return VisibilityFilters.SHOW_COMPLETED;
            default:
                throw new Error('Unknown filter');
        }
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction label="All" icon={<IndeterminateCheckBox />} />
                    <BottomNavigationAction label="Active" icon={<CheckBoxOutlineBlank />} />
                    <BottomNavigationAction label="Completed" icon={<CheckBox />} />
                </BottomNavigation>
            </AppBar>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Footer));
