import {createStore} from 'redux';
import {reducer} from "./reducer";

export const index=createStore(reducer);