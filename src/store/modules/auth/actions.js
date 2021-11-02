let timer;

export default {
    async signup(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAA4txoWpLhMwpVWnGfHxbK0OqwDGx9rQA',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate');
            throw error;
        }

        // Set Expiration Date
        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        // Set in Local Storage
        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);
        
        await context.dispatch('setUser', {
            name: payload.name,
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
            email: responseData.email,
            isAuthenticated: true
        });

        await context.dispatch('registerUser', {
            name: payload.name,
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
            email: responseData.email
        });

    },
    setUser(context, payload) {
        context.commit('setUser', payload);
    },
    async registerUser(_, payload) {
        const response = await fetch(`https://monster-slayer-game-default-rtdb.firebaseio.com/users/${payload.userId}.json?auth=` + payload.token, {
            method: 'PUT',
            body: JSON.stringify({
                name: payload.name,
                token: payload.token,
                userId: payload.userId,
                email: payload.email,
                tokenExpiration: payload.tokenExpiration
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to register user');
            throw error;
        }  
    },
    async login(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAA4txoWpLhMwpVWnGfHxbK0OqwDGx9rQA',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to authenticate');
            throw error;
        }

        // Set Expiration Date
        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        // Set in Local Storage
        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.dispatch('setUser', {
            name: payload.name,
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
            isAuthenticated: true
        });

        context.dispatch('loadUser');
        context.dispatch('game/loadGameHistory');
    },
    async loadUser(context) {
        const userId = context.rootState.auth.userId;

        const response = await fetch(`https://monster-slayer-game-default-rtdb.firebaseio.com/users/${userId}.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch user');
            throw error;
        }

        context.commit('loadUser', responseData);
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function() {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            });

            context.dispatch('loadUser');
            context.dispatch('game/loadGameHistory');
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.dispatch('setUser', {
            token: null,
            userId: null,
            isAuthenticated: false,
            gameHistory: []
        });

                
        context.dispatch('game/startNewGame');
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
}