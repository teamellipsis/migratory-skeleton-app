import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
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
    card: {
        width: '50vw',
    },
    cardRoot: {
        display: 'flex',
        justifyContent: 'center',
    },
    cardActions: {
        justifyContent: 'center',
    },
});

class App extends React.Component {
    state = {
        count: 0,
        error: false,
    };

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

        this.getCount().then((count) => {
            this.setState({
                count,
            });
        }).catch((err) => {
            this.signalError();
            console.log(err);
        });
    }

    onClickUp = () => {
        this.props.openInfoDialog();
    };

    onClickDown = () => {
        this.props.closeInfoDialog();
    };

    handleOnIncrement = () => {
        this.changeCount(1);
    };

    handleOnDecrement = () => {
        this.changeCount(-1);
    };

    changeCount = (num) => {
        this.getCount().then((count) => {
            const newCount = count + num;
            this.setCount(newCount).then(() => {
                this.setState({
                    count: newCount,
                });
            }).catch((err) => {
                this.signalError();
                console.log(err);
            });
        }).catch((err) => {
            this.signalError();
            console.log(err);
        });
    };

    handleOnReset = () => {
        this.setCount(0).then(() => {
            this.setState({
                count: 0,
            });
        }).catch((err) => {
            this.signalError();
            console.log(err);
        });
    };

    signalError = () => {
        this.setState({ error: true });
        setTimeout(() => {
            this.setState({ error: false });
        }, 1000);
    };

    @Daemon()
    getCount() { }

    @Daemon()
    setCount(count) { }

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
                <Button variant="outlined" color="primary" className={classes.button}>
                    {"Learn more..."}
                </Button>

                <div className={classes.cardRoot}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Badge color="secondary" invisible={!this.state.error} variant="dot">
                                <Typography color="textSecondary" gutterBottom>
                                    {"Counter: " + this.state.count}
                                </Typography>
                            </Badge>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Button size="small" onClick={this.handleOnIncrement}>+1</Button>
                            <Button size="small" onClick={this.handleOnDecrement}>-1</Button>
                            <Button size="small" onClick={this.handleOnReset}>Reset</Button>
                        </CardActions>
                    </Card>
                </div>

                {this.fabs.map((fab, index) => (
                    <Zoom
                        key={index}
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
