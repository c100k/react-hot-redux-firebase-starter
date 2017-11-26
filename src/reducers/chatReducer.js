import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {insertItem, removeItem} from './immutabilityUtils';

export default function chatReducer(state = initialState.chat, action) {
  switch (action.type) {
    case types.CHAT_MESSAGE_LISTENING_STARTED:
      return Object.assign({}, state, {messages: []});
    case types.CHAT_MESSAGE_RECEIVED_SUCCESS:
      return Object.assign({}, state, {messages: insertItem(state.messages, action.message)});
    case types.CHAT_ROOM_LISTENING_STARTED:
      return Object.assign({}, state, {rooms: []});
    case types.CHAT_ROOM_RECEIVED_SUCCESS:
      return Object.assign({}, state, {rooms: insertItem(state.rooms, action.room)});
    case types.CHAT_USER_LISTENING_STARTED:
      return Object.assign({}, state, {users: []});
    case types.CHAT_USER_RECEIVED_SUCCESS: {
      if (action.user.val === true) {
        return Object.assign({}, state, {users: insertItem(state.users, action.user)});
      } else {
        return Object.assign({}, state, {users: removeItem(state.users, i => i.key !== action.user.key)});
      }
    }
    default:
      return state;
  }
}
