<template>
  <div>
    <ion-header>
      <ion-toolbar class="modal-header">
        <ion-title>
          <ion-icon class="left-icons" :icon="micOutline"></ion-icon>
          Edit Conference
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input v-model="form.eventName"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Website</ion-label>
        <ion-input v-model="form.website"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Venue</ion-label>
        <ion-input v-model="form.venue"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Street</ion-label>
        <ion-input v-model="form.address.street"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Area / Suburb</ion-label>
        <ion-input v-model="form.address.area"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Town</ion-label>
        <ion-input v-model="form.address.town"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Province</ion-label>
        <ion-input v-model="form.address.province"></ion-input>
      </ion-item>
      <div class="form-buttons">
        <ion-button size="small" color="danger" @click="closeModal"
          >Cancel</ion-button
        >
        <ion-button size="small" color="success" @click="submit"
          >Submit</ion-button
        >
      </div>
    </ion-content>
  </div>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonProgressBar,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { micOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "NewEvent",
  data() {
    return {
      loading: false,
      form: JSON.parse(localStorage.getItem("updateEvent")) || {},
    };
  },
  setup() {
    return {
      micOutline,
    };
  },
  components: {
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonProgressBar,
    IonInput,
    IonButton,
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    submit() {
      this.loading = true;
      authStore
        .dispatch("updateEvent", this.form)
        .then(() => {
          this.loading = false;
          modalController.dismiss();
        })
        .catch((error) => {
          // eslint-disable-next-line
          this.loading = false;
          console.log(error);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
ion-content {
  height: 100vh;
}

ion-item > ion-label {
  font-weight: bold;
}

.form-buttons {
  margin-top: 25px;
  float: right;
  overflow-y: scroll;
}
</style>