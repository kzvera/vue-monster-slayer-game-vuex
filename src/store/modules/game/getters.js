export default {
    players(state) {
        return state.players;
    },
    playerHealth(state) {
        state.playerHealth = Math.min(state.playerHealth, 100);
        return state.playerHealth;
    },
    monsterHealth(state) {
        return state.monsterHealth;
    },
    logMessages(state) {
        return state.logMessages;
    },
    mayUseSpecialAttack(state) {
        return state.currentRound % 3 != 0;
    },
    winner(state) {
        if (state.playerHealth <= 0 && state.monsterHealth <= 0) {
            // A draw
            state.winner = 'draw';
        } else if (state.playerHealth <= 0) {
            // Player lost
            state.winner = 'monster';
        } else if (state.monsterHealth <= 0) {
            // Monster lost
            state.winner = 'player';
        }

        return state.winner;
    },
    gameHistory(state) {
        return state.gameHistory;
    }
}