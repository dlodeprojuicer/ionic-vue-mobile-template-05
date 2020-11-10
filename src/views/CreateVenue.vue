<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
      <div class="lg-content-center">
        <ion-title class="form-title">
          <ion-icon class="left-icons" :icon="micOutline"></ion-icon> 
          Add Venue
        </ion-title>
        <ion-item>
    <!-- <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    /> -->
        </ion-item>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input v-model="form.venueName"></ion-input>
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
          <ion-label>Room m²</ion-label>
          <ion-input v-model="form.squareMeter"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Room Length</ion-label>
          <ion-input v-model="form.length"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Room Width</ion-label>
          <ion-input v-model="form.width"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Room Height</ion-label>
          <ion-input v-model="form.height"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Equipment</ion-label>
          <ion-input v-model="form.equipment"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Disability Friendly</ion-label>
          <ion-toggle
            @ionChange="toggleChange($event, 'disabilityFriendly')"
            v-model="form.disabilityFriendly"
            :checked="form.disabilityFriendly">
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>WiFi</ion-label>
          <ion-toggle
            @ionChange="toggleChange($event, 'wifi')"
            v-model="form.wifi"
            :checked="form.wifi">
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Air-Conditioning</ion-label>
          <ion-toggle
            @ionChange="toggleChange($event, 'aircon')"
            v-model="form.aircon"
            :checked="form.aircon">
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Area</ion-label>
          <ion-input v-model="form.area"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Phone</ion-label>
          <ion-input v-model="form.phone"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input v-model="form.email"></ion-input>
        </ion-item>
        <div class="form-buttons">
          <ion-button size="small" color="danger" @click="goHome">Cancel</ion-button>
          <ion-button size="small" color="success" @click="submit">Submit</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
// import VueTagsInput from '@johmun/vue-tags-input';

import {
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonButton,
  IonToggle,
  IonProgressBar,
  IonPage
} from "@ionic/vue";
import { defineComponent } from "vue";
import { micOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "NewEvent",
  components: {
    IonContent,
    IonPage,
    IonTitle,
    IonToggle,
    IonIcon,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    // VueTagsInputs
  },
  data() {
    return {
      loading: false,
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'Spain',
      }, {
        text: 'France',
      }, {
        text: 'USA',
      }, {
        text: 'Germany',
      }, {
        text: 'China',
      }],
      form: {
        venueName: "Test",
        website: "www.example.com",
        squareMeter: "393",
        length: "28.7",
        width: "13.6",
        height: "4.65",
        equipment: "",
        disabilityFriendly: true,
        wifi: false,
        aircon: false,
        area: "Newlands, Cape Town",
        phone: "021 799 8748",
        email: "kirstenboschinfo@sanbi.org.za"
      },
    };
	},
  setup() {
    return {
      micOutline
    }
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
  methods: {
    toggleChange(el, key) {
      this.form[key] = el.detail.checked;
      console.log(this.form[key]);
    },
    endChange({ detail }) {
      this.form.end = detail.value;
    },
    goHome() {
      this.$router.push("/");
    },
    submit() {
      this.loading = true;
      authStore.dispatch("createVenue",this.form)
        .then(() => {
          this.loading = false;
          this.$router.push("/");
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

.form-title {
  margin-top: 60px;
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