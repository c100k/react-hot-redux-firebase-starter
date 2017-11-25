import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {insertItem} from './immutabilityUtils';

export default function chatReducer(state = initialState.chat, action) {
  switch (action.type) {
    case types.CHAT_MESSAGE_LISTENING_STARTED:
      return Object.assign({}, state, {messages: []});
    case types.CHAT_MESSAGE_RECEIVED_SUCCESS:
      return Object.assign({}, state, {messages: insertItem(state.messages, action.message)});
    default:
      return state;
  }
}
