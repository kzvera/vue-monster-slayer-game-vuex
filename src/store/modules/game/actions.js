export default {
    async getRandomValue(context, payload) {
        context.commit('getRandomValue', payload);
    },
    async addLogMessage(context, payload) {
        context.commit('addLogMessage', payload);
    },
    async attackMonster(context) {
        context.commit('attackMonster');
    },
    async attackPlayer(context) {
        context.commit('attackPlayer');
    },
    async attackMonsterSpecial(context) {
        context.commit('attackMonsterSpecial');
    },
    async healPlayerHealth(context) {
        context.commit('healPlayerHealth');
    },
    async attack(context, payload) {
        await context.dispatch('getRandomValue', payload.setMinMax);
        await context.dispatch('attackMonster');
        await context.dispatch('addLogMessage', {
            actionBy: 'player',
            actionType: 'attack',
            actionValue: context.rootState.game.randomValue
        });
        await context.dispatch('getRandomValue', { min: 8, max: 12 });
        await context.commit('attackPlayer');
        await context.dispatch('addLogMessage', {
            actionBy: 'monster',
            actionType: 'attack',
            actionValue: context.rootState.game.randomValue
        });

        if (context.rootState.game.winner != null) {
            await context.dispatch('setWinner');
            await context.dispatch('setGameHistory');
        }
    },
    async specialAttackMonster(context, payload) {
        await context.dispatch('getRandomValue', payload.setMinMax);
        await context.dispatch('attackMonsterSpecial');
        await context.dispatch('addLogMessage', {
            actionBy: 'player',
            actionType: 'attack',
            actionValue: context.rootState.game.randomValue
        });
        await context.dispatch('getRandomValue', { min: 8, max: 12 });
        await context.dispatch('attackPlayer');
        await context.dispatch('addLogMessage', {
            actionBy: 'monster',
            actionType: 'attack',
            actionValue: context.rootState.game.randomValue
        });

        if (context.rootState.game.winner != null) {
            await context.dispatch('setWinner');
            await context.dispatch('setGameHistory');
        }
    },
    async healPlayer(context, payload) {
        await context.dispatch('getRandomValue', payload.setMinMax);
        await context.dispatch('healPlayerHealth');
        await context.dispatch('addLogMessage', {
            actionBy: 'player',
            actionType: 'heal',
            actionValue: context.rootState.game.randomValue
        });
        await context.dispatch('getRandomValue', { min: 8, max: 12 });
        await context.dispatch('attackPlayer');
        await context.dispatch('addLogMessage', {
            actionBy: 'monster',
            actionType: 'attack',
            actionValue: context.rootState.game.randomValue
        });
    },
    async surrender(context) {
        await context.commit('surrender');
        await context.dispatch('setWinner');
        await context.dispatch('setGameHistory');
        
    },
    startNewGame(context) {
        context.commit('startNewGame');
    },
    async loadGameHistory(context) {
        const userId = context.rootState.auth.userId;

        const response = await fetch(`https://monster-slayer-game-default-rtdb.firebaseio.com/users/${userId}/game-history.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch game history');
            throw error;
        }

        context.commit('loadGameHistory', responseData);
    },
    async setGameHistory(context) {
        const userId = context.rootState.auth.userId;

        const response = await fetch(`https://monster-slayer-game-default-rtdb.firebaseio.com/users/${userId}/game-history.json`, {
            method: 'PUT',
            body: JSON.stringify({
                winner: context.rootState.game.gameHistory
            })
        })

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to register game history');
            throw error;
        }
    },
    async setWinner(context) {
        let date = new Date(Date.now()).toLocaleString().split(', ');
        date = {
            date: date[0],
            time: date[1]
        }
        context.commit('setWinner', date);
    }
}