import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    auth: AuthReducer,
	form: reduxFormReducer,
});

//const store = createStore(rootReducers);

export const store = createStore(reducers,  composeEnhancers(middleware));
