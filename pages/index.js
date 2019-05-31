import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import App from '../components/App';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Index extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <App />
                </div>
            </MuiThemeProvider>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
