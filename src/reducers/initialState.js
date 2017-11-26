export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  chat: {
    message: '',
    postingMessage: false,
    messages: [],
    rooms: [],
    users: [],
    successNotification: null,
  },
  ajaxCallsInProgress: 0
};
