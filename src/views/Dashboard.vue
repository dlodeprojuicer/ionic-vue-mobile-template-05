<template>
  <ion-page>
    <Header />
    <ion-content class="ion-padding">
      <SkeletonText v-if="userList.length < 1 " />
      <ion-list v-if="userList.length > 0 ">
        <ion-item class="list-header">
          <ion-label>Name</ion-label>
          <ion-label>Organisation</ion-label>
          <ion-label>Province</ion-label>
          <ion-label>Verified</ion-label>
        </ion-item>
        <ion-item v-for="(item, index) in userList" :key="index">
          <ion-label>{{ item.name }} {{ item.lastname }}</ion-label>
          <ion-label>{{ item.organisation }}</ion-label>
          <ion-label>{{ item.address.province }}</ion-label>
          <ion-toggle slot="end" :checked="item.verified" @ionChange="verifyUser(item.uid, item.verified)"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import Header from "../components/Header";
import SkeletonText from "../components/SkeletonText";

import {
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonLabel,
  IonToggle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonList,
    IonLabel,
    IonToggle,
    Header,
    SkeletonText
  },
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      this.$store.dispatch("getUsers").then(data => {
        this.userList = data;
      });
    },
    verifyUser(uid, verified) {
      this.$store.dispatch("updateUser", {uid, verified: !verified}).then(() => {
      });
    }
  },
});
</script>

<style lang="scss">
  ion-item.list-header > ion-label {
    font-weight: bold;
  }
</style>
