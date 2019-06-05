import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';

import ControlPanel from '../platform/components/ControlPanel';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';

class CustomApp extends App {
    constructor(props) {
        super(props);
        this.store = createStore(rootReducer, props.preloadedState);
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        let preloadedState = ctx.req._appState;

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, preloadedState };
    }

    render() {
        const { Component, pageProps } = this.props;
        let store = this.store;
        return (
            <Container>
                <Provider store={store}>
                    <ControlPanel store={store} />
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

CustomApp.propTypes = {
    preloadedState: PropTypes.object.isRequired,
};

export default CustomApp;
