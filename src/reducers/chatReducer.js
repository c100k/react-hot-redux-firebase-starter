import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {insertItem, removeItem} from './immutabilityUtils';

export default function chatReducer(state = initialState.chat, action) {
  switch (action.type) {
    case types.CHAT_MESSAGE_TYPE:
      return Object.assign({}, state, {
        message: action.message,
        successNotification: null
      });
    case types.CHAT_MESSAGE_POST_STARTED:
      return Object.assign({}, state, {
        postingMessage: true
      });
    case types.CHAT_MESSAGE_POST_SUCCESS:
      return Object.assign({}, state, {
        message: initialState.chat.message,
        postingMessage: initialState.chat.postingMessage,
        successNotification: 'Message posted successfully'
      });
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
