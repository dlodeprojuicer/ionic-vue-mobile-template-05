<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="lg-content-center">
        <div class="person">
          <ion-icon class="left-icons" :icon="personCircleOutline"></ion-icon> 
          <br />
          {{ profile.name }} {{ profile.lastname }}
        </div>
        <br /><br /><br />
        <h4>My Events</h4>
        <SkeletonText v-if="loading" />
        <ConfList :data="eventList" v-if="eventList.length > 0 " />
        <NoEvents v-if="!loading && eventList.length < 1" />
      </div>
    </ion-content>
    <Fab />
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonIcon,
  IonContent
} from "@ionic/vue";
import { personCircleOutline } from "ionicons/icons";
import { defineComponent } from 'vue';

import ConfList from "../components/ConfList";
import SkeletonText from "../components/SkeletonText";
import Fab from "../components/Fab";
import NoEvents from "../components/NoEvents";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    IonIcon,
    SkeletonText,
    NoEvents,
    ConfList,
    Fab
  },
  setup() {
    return {
      personCircleOutline
    };
  },
  computed: {
    ...mapGetters(['loginToken']),
  },
  data() {
    return {
      loading: true,
      profile: {},
      eventList: []
    }
  },
  methods: {
    ionViewDidEnter() {
      this.fetchEvents();
      this.fetchProfile();
    },
    fetchEvents() {
      this.$store.dispatch("getUserEvents").then(data => {
        this.eventList = data;
        this.loading = false;
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error);
        this.loading = false;
      });
    },
    fetchProfile() {
      this.$store.dispatch("getUserProfile", this.loginToken).then(data => {
        this.profile = data;
      }).catch(error => {
        // eslint-disable-next-line
        console.log(error);
      });
    }
  },
});
</script>

<style lang="scss" scoped>
.person {
  width: 50%;
  margin: auto 25%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
ion-icon {
  font-size: 60px;
}

</style>