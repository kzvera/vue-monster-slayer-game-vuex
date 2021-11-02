<template>
  <section :id="playerType" class="container healthbarContainer">
    <h2>{{healthbarTitle}}</h2>
    <div class="healthbar">
      <div class="healthbar__value" :style="healthbarStyles"></div>
    </div>
  </section>
</template>

<script>
export default {
    props: {
      playerType: {
        type: String,
        required: true
      }
    },
    computed: {
      playerHealth() {
        return this.$store.getters['game/playerHealth'];
      },
      monsterHealth() {
        return this.$store.getters['game/monsterHealth'];
      },
      healthbarTitle() {
        return this.playerType == 'monster' ? 'Monster Health' : 'Your Health';
      },
      healthbarStyles() {
        return this.getHealthbarStyles(this.playerType);
      }
    },
    methods: {
      getHealthbarStyles(playerType) {
        const playerHealthStyles = playerType == 'player' ? this.playerHealth : this.monsterHealth;

        switch (true) {
          case (playerHealthStyles < 0):
            return {width: '0%'};
          case (playerHealthStyles <= 30 && playerHealthStyles > 15):
            return {'background-color': 'orange', width: playerHealthStyles + '%'};
          case (playerHealthStyles <= 15):
            return {'background-color': 'red', width: playerHealthStyles + '%'};
          default:
            return {width: playerHealthStyles + '%'};
        }
      }
    }
}
</script>

<style scoped>
.healthbarContainer h2 {
  margin: 0.25rem;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}
</style>