import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import InfoDialog from './InfoDialog';

import { connect } from 'react-redux';
import { openInfoDialog, closeInfoDialog } from '../actions';

const styles = theme => ({
    root: {
        textAlign: 'center',
    },
    icon: {
        margin: theme.spacing.unit,
        height: '40vmin',
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.fabs = [
            {
                icon: <UpIcon />,
                onClick: this.onClickUp,
                open: false,
            },
            {
                icon: <DownIcon />,
                onClick: this.onClickDown,
                open: true,
            },
        ];
    }

    onClickUp = () => {
        this.props.openInfoDialog();
    };

    onClickDown = () => {
        this.props.closeInfoDialog();
    };

    render() {
        const { classes, theme, infoDialogOpen } = this.props;
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
        };

        return (
            <div className={classes.root}>
                <img src="/static/icon.png" className={classes.icon} alt="icon" />
                <Typography variant="h6">
                    {"Edit `components/App.js` or `pages/index.js` and save to reload."}
                </Typography>
                {this.fabs.map((fab) => (
                    <Zoom
                        key={fab.color}
                        in={infoDialogOpen === fab.open}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: `${infoDialogOpen === fab.open ? transitionDuration.exit : 0}ms`,
                        }}
                        unmountOnExit
                    >
                        <Fab className={classes.fab} color={'primary'} onClick={fab.onClick}>
                            {fab.icon}
                        </Fab>
                    </Zoom>
                ))}
                <InfoDialog open={infoDialogOpen} onClose={this.onClickDown} />
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    openInfoDialog: PropTypes.func.isRequired,
    closeInfoDialog: PropTypes.func.isRequired,
    infoDialogOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    infoDialogOpen: state.info_dialog,
});

const mapDispatchToProps = dispatch => ({
    openInfoDialog: () => dispatch(openInfoDialog()),
    closeInfoDialog: () => dispatch(closeInfoDialog())
});

const styledApp = withStyles(styles, { withTheme: true })(App);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styledApp);
