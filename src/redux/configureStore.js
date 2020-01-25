import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Partners } from './partners';
import {  InitialFeedback } from './forms';


export const ConfigureStore = () => {
    let middleware = [thunk];
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== "production") {
        middleware.push(logger);
    }
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback,
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
