export default {
    isAuthenticated(state) {
        return !!state.token;
    },
    token(state) {
        return state.token;
    },
    userName(state) {
        return state.userName;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
}