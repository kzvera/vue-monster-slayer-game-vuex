<template>
    <section class="container">
        <h2>Game Over!</h2>
        <h3 v-if="winner == 'player'">You won!</h3>
        <h3 v-else-if="winner == 'monster'">You lost!</h3>
        <h3 v-else>It's a draw!</h3>
        <button @click="startNewGame">Start New Game!</button>
        <router-link to="/login" v-if="!isAuthenticated">Save Game</router-link>
    </section>
</template>

<script>
export default {
    props: ['playerType'],
    watch: {
        winner() {
            if (this.winner != null) {
                this.$store.dispatch('game/setGameHistory');
            }
        }
    },
    computed: {
        winner() {
            return this.$store.getters['game/winner'];
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        startNewGame() {
            this.$store.dispatch('game/startNewGame');
        }
    }
}
</script>