<template>
    <section class="container">
        <h2>{{userName}}'s Account</h2>

        <ul class="game-history">
            <li v-for="(game, index) in gameHistory" :key="index">
                Winner: <span class="player">{{game.player}}</span>
                <span class="date">{{game.date.date}}<span class="time">{{game.date.time}}</span></span>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    computed: {
        gameHistory() {
            return this.$store.getters['game/gameHistory'];
        },
        userName() {
            return this.$store.getters.userName;
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    text-align: left;
}

li {
    padding: 10px;
    display: flex;
}

li:nth-child(odd) {
    background: #efefef;
}

li .player {
    text-transform: uppercase;
    font-weight: bold;
    margin-left: 5px;
}

li .date {
    margin-left: auto;
}

li .date .time {
    font-size: 75%;
    background: #ddd;
    padding: 5px;
    margin-left: 5px;
}
</style>