import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Daemon from '../platform/decorators/Daemon';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

class InfoDialog extends React.Component {
    state = {
        platform: 'Pending...',
        release: 'Pending...',
        arch: 'Pending...',
        hostname: 'Pending...',
        totalmem: 'Pending...',
        node: 'Pending...',
        v8: 'Pending...',
    }

    constructor(props) {
        super(props);
        this.getOsDetails().then((osDetails) => {
            this.setState({
                platform: osDetails.platform,
                release: osDetails.release,
                arch: osDetails.arch,
                hostname: osDetails.hostname,
                totalmem: osDetails.totalmem,
            });
        }).catch((err) => {
            console.log(err);
        });

        this.getVersions().then((versions) => {
            this.setState({
                node: versions.node,
                v8: versions.v8,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    @Daemon()
    getOsDetails() { }

    @Daemon()
    getVersions() { }

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="app-info"
                open={this.props.open}
            >
                <DialogTitle onClose={this.handleClose}>
                    App info
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        App name : Todo app
                     </Typography>
                    <Typography gutterBottom>
                        App version : 0.1-alpha
                    </Typography>
                    <Typography gutterBottom>
                        Platform (operating system) : {this.state.platform}
                    </Typography>
                    <Typography gutterBottom>
                        Operating system release : {this.state.release}
                    </Typography>
                    <Typography gutterBottom>
                        CPU architecture : {this.state.arch}
                    </Typography>
                    <Typography gutterBottom>
                        Hostname : {this.state.hostname}
                    </Typography>
                    <Typography gutterBottom>
                        System memory (bytes) : {this.state.totalmem}
                    </Typography>
                    <Typography gutterBottom>
                        Node.js version : {this.state.node}
                    </Typography>
                    <Typography gutterBottom>
                        V8 version : {this.state.v8}
                    </Typography>
                </DialogContent>
            </Dialog>
        );
    }
}

export default InfoDialog;
