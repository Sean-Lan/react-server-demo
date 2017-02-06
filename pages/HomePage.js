import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {RootElement, RootContainer, TheFold, logging, ReactServerAgent as agent} from 'react-server';
import thunk from 'redux-thunk';
import Head, * as head from '../components/Head';
import Body, * as body from '../components/Body';
import Footer, * as footer from '../components/Footer';

const logger = logging.getLogger(__LOGGER__);

export default class HomePage {
  handleRoute(next) {
    logger.debug('OnboardingPage handleRoute');
    const rootReducer = combineReducers({
      head: head.reducer,
      body: body.reducer,
      footer: footer.reducer
    });

    // add reduxe dev tool support
    const composeEnhancers =
      typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const enhancer = composeEnhancers(
      applyMiddleware(thunk)
    );
    const store = this.store = createStore(
      rootReducer,
      enhancer
    );

    // in server side, ReactServerAgent need to use absolute path
    if (typeof window === 'undefined') {
      const host = this.getRequest()._wrappedRequest.headers.host;

      agent.plugRequest((req) => {
        req.urlPrefix(host);
      });
    }

    this.headData = agent.get('/api/color?part=head').then((data) => {
      store.dispatch(head.actions.receiveColor(data.body.color));
    });

    this.bodyData = agent.get('/api/color?part=body').then((data) => {
      store.dispatch(body.actions.receiveColor(data.body.color));
    });

    this.footerData = agent.get('/api/color?part=footer').then((data) => {
      store.dispatch(footer.actions.receiveColor(data.body.color));
    });

    return next();
  }

  getElements() {
    const {store, headData, bodyData, footerData} = this;
    return (
      <RootContainer>
        <RootElement when={headData}>
          <Provider store={store}>
            <Head />
          </Provider>
        </RootElement>
        <TheFold />
        <RootElement when={bodyData}>
          <Provider store={store}>
            <Body />
          </Provider>
        </RootElement>
        <RootElement when={footerData}>
          <Provider store={store}>
            <Footer />
          </Provider>
        </RootElement>
      </RootContainer>
    );
  }

}
