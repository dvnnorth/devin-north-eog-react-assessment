import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import weatherReducer from './reducers/Weather';
import droneReducer from './reducers/Drone';
import navContentReducer from './reducers/NavContent';
import { loadState, saveState } from './localStorage';

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    drone: droneReducer,
    navContent: navContentReducer
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(middlewares)
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  sagas.forEach(sagaMiddleware.run);

  return store;
};
