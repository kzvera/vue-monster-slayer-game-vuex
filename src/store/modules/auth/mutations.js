export default {
    setUser(state, payload) {
        state.isAuthenticated = payload.isAuthenticated;
        state.token = payload.token;
        state.userId = payload.userId;
        state.userName = payload.name;
        state.tokenExpiration = payload.tokenExpiration;
        state.didAutoLogout = false;

    },
    registerUser(state, payload) {
        state.isAuthenticated = true;
        state.token = payload.token;
        state.userId = payload.userId;
        state.userName = payload.name;
        state.tokenExpiration = payload.tokenExpiration;
    },
    loadUser(state, payload) {
        state.userName = payload.name;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
}