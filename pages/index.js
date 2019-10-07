import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import App from '../components/App';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

class Index extends React.Component {
    render() {
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

export default Index;
