<template>
  <ion-header>
    <ion-toolbar class="modal-header">
      <ion-title>
        <ion-icon class="left-icons" :icon="micOutline"></ion-icon> 
        Add Conference
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
    <!-- <ion-item>
      <ion-label>Price</ion-label>
      <ion-input v-model="form.price"></ion-input>
    </ion-item> -->

    <!-- <h5>Address</h5> -->
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
      <select v-model="form.address.province" placeholder="Select One">
        <option :value="item" v-for="(item, index) in provinces" :key="index">
          {{ item }}
        </option>
      </select>
    </ion-item>
    <ion-item>
      <ion-label>Start</ion-label>
      <ion-datetime 
        display-format="DD-MMM-YYYY" 
        picker-format="DD-MMM-YYYY" 
        :value="form.start" 
        @ionChange="startChange($event)"
        min="2015-01-01"
        max="2022-01-02"
      ></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>End</ion-label>
      <ion-datetime 
        display-format="DD-MMM-YYYY" 
        picker-format="DD-MMM-YYYY" 
        :value="form.end" 
        @ionChange="endChange($event)"
        min="2015-01-01"
        max="2022-01-02"
      ></ion-datetime>
    </ion-item>
    <div class="form-buttons">
      <ion-button size="small" color="danger" @click="closeModal">Cancel</ion-button>
      <ion-button size="small" color="success" @click="submit">Submit</ion-button>
    </div>
  </ion-content>
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
  IonDatetime,
	modalController
} from "@ionic/vue";
import { defineComponent } from "vue";
import { micOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "NewEvent",
  components: {
		IonHeader,
		IonContent,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonButton,
  },
  data() {
    return {
      loading: false,
      form: {
        eventName: "",
        contactPerson: "",
        venue: "",
        address: {
					street: "",
					area: "",
					town: "",
					province: ""
				},
        price: "",
        website: "",
        // start: "2015-01-01",
        // end: "2015-01-02",
        dates: [
          {
            startDate: "06/10/2020",
            startTime: "09:00",
            endDate: "06/10/2020",
            endTime: "16:00",
          }
        ]
      },
      provinces: [
        "Western Cape",
        "Eastern Cape",
        "Northern Cape",
        "Free State",
        "Mpumalanga",
        "Limpopo",
        "North West",
        "KwaZulu-Natal",
        "Gauteng",
      ]
    };
	},
  setup() {
    return {
      micOutline
    }
  },
  methods: {
    startChange({ detail }) {
      this.form.start = detail.value;
    },
    endChange({ detail }) {
      this.form.end = detail.value;
    },
    autoIdFn(){
      // Alphanumeric characters
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let autoId = '';
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return autoId;
    },
    closeModal() {
			modalController.dismiss();
    },
    submit() {
      this.loading = true;
      authStore.dispatch("createEvent",this.form)
        .then(() => {
          this.loading = false;
          modalController.dismiss();
        })
        .catch(error => {
        // eslint-disable-next-line
          console.log(error);
          this.loading = false;
        });
    }
  }
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