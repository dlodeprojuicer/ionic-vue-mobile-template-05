<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="lg-content-center">
        <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
        <ion-title class="form-title">
          <ion-icon class="left-icons" :icon="personOutline"></ion-icon> 
          Login
        </ion-title>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input v-model="form.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input v-model="form.password" type="password"></ion-input>
        </ion-item>

        <p class="error-message">
          {{ endpointError.message }}
        </p>

        <div class="form-buttons">
          <p @click="register">Don't have an account? <u>Register</u></p>
          <ion-button size="small" color="danger" @click="goHome">Cancel</ion-button>
          <ion-button size="small" color="success" @click="submit">Login</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonPage,
  IonInput,
  IonButton,
  IonIcon,
  IonProgressBar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "Modal",
  props: ["store","content", "title"],
  components: {
		IonContent,
    IonTitle,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonPage,
    IonIcon,
    IonInput,
    IonButton,
  },
  data() {
    return {
      loading: false,
      endpointError: "",
      form: {
        email: "",
        password: "",
      },
    };
	},
  setup() {
    return {
      personOutline
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },    
    goHome() {
      this.$router.push("/");
    },
    submit() {
      this.loading = true;
      authStore.dispatch("login", this.form)
        .then(() => {
          this.loading = false;
          this.fetchEvents();
        })
        .catch(error => {
          this.loading = false;
          this.endpointError = error;
          switch(error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
              error.message = "Invalid email or password.";
            break;
            case "auth/user-not-found":
              error.message = "No user with corresponding login credentials";
            break;
          }
        });
    },
    fetchEvents() {
      this.$store.dispatch("getEvents").then(() => {
        // this.filteredEvents = data;
        this.loading = false;
        this.$router.push("/");
      }).catch(error => {
          this.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
    },
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

.error-message {
  color: #ff0000;
  text-align: center;
}
</style>