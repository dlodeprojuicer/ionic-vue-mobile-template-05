<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1 class="heading-h2">
        Speakers you can reach out to if you are planning a conference
      </h1>
      <br />
      <div class="lg-content-center">
        <SkeletonText v-if="loading" />
        <SpeakerList :data="speakers" />
      </div>
    </ion-content>
    <Fab />
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent
} from "@ionic/vue";

import { defineComponent } from 'vue';

import SpeakerList from "../components/SpeakerList";
import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    SpeakerList,
    SkeletonText,
    Fab,
  },
  computed: {
    ...mapGetters(['speakers']),
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ionViewDidEnter() {
      this.fetchSpeakers();
    },
    fetchSpeakers() {
      this.$store.dispatch("getSpeakers").then(() => {
        this.loading = false;
      }).catch(error => {
          this.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
    }
  },
});
</script>

<style lang="scss" scoped>
// ion-content {
//   z-index: -99999;
// }
  .activeTip {
    color: green;
  }

.heading-h2 {
  font-size: 20px;
  text-align: center;
  color: #000;
}

.content-wrapper {
  margin-top: -35px;
  ion-chip {
    color: #d6d6d6;
    border: 1px #413f3f solid;
    padding: 20px;
  }

  h2 {
    color: #d4d3d3;
    font-weight: bold;
    margin: 22px 0 -12px 0;
  }

  p {
    color: #bdbcbc;
  }
} 

.quantity-counter {
  float: right;
  background: #272731;
  border-radius: 10px;
  padding: 10px 10px 10px 20px;
  margin: -60px 35px 0 315px;
  width: 65px;
  z-index: 9999999999;

  ion-icon {
    font-size: 18px;
    background: #1d1d23;
    padding: 5px;
    color: #ffffff;
    border-radius: 50px;
    font-weight: 600;

    &.back {
      border-radius: 10px;
    }
  }

  ion-chip {
    color: #ffffff;
    background: #49455e;
    margin: 5px 0px 10px -9px;
    padding: 20px 18px;
    font-weight: bold;
  }
}

.row-col-one,
.row-col-two {
  margin: 10px 0;
  color: #9a9a9a;
  background: #0b0c13;
  padding: 12px;
  border-radius: 30px;
  border: 1px #0e0e0e solid;
  text-align: center;
}
</style>