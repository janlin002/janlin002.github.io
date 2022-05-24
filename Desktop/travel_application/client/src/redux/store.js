import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers/index';
import createSagaMiddleware from 'redux-saga';

import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(thunk, sagaMiddleware, logger));
export default store

// sagaMiddleware.run(mySaga);