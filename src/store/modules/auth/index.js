import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    state() {
        return {
            token: null,
            userId: null,
            userName: null,
            tokenExpiration: null,
            isAuthenticated: false,
            didAutoLogout: false
        }
    },
    mutations,
    actions,
    getters
}