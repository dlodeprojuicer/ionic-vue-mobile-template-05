<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1 class="heading-h2">
        A  concise list of tech conference venues in ZA
      </h1>
      <div class="lg-content-center">
        <SearchFilters />
        <SkeletonText v-if="loading" />
        <VenueList :data="filteredVenues" v-if="filteredVenues.length > 0" />
        <h1 v-if="filteredVenues.length < 1">No search results</h1>
        <br /><br />
        If you wish to add a venue please email simodms@gmail.com
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

import VenueList from "../components/VenueList";
import Fab from "../components/Fab";
import SkeletonText from "../components/SkeletonText";
import SearchFilters from "../components/SearchFilters";

import { mapGetters } from 'vuex';

export default defineComponent({
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonContent,
    IonPage,
    VenueList,
    SkeletonText,
    SearchFilters,
    Fab,
  },
  computed: {
    ...mapGetters(['venues', 'filteredVenues', 'searchString']),
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    ionViewDidEnter() {
      this.fetchVenues();
    },
    fetchVenues() {
      this.$store.dispatch("getVenues").then(() => {
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


<style lang="scss">
.heading-h2 {
  font-size: 20px;
  text-align: center;
  color: #000;
}
</style>