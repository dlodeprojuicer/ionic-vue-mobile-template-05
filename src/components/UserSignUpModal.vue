<template>
  <ion-header>
    <ion-toolbar class="modal-header">
      <ion-title>
        <ion-icon class="left-icons" :icon="personOutline"></ion-icon>
        Register
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item v-for="(f, i) in formFields" :key="i">
      <ion-label>{{ f.label }}</ion-label>
      <ion-input
        v-model="form[f.key]"
        :type="f.type"
        :required="f.required"
        @keyup="validate(f.key, i)"
      ></ion-input>
      <p v-if="i.error">{{ f.errMsg }}</p>
    </ion-item>
    <ion-item>
      <ion-label>Province</ion-label>
      <select v-model="form.address.province" placeholder="Select One">
        <option :value="item" v-for="(item, index) in provinces" :key="index">
          {{ item }}
        </option>
      </select>
    </ion-item>

    <p class="error-message">
      {{ endpointError.message }}
    </p>

    <div class="form-buttons">
      <ion-button size="small" color="danger" @click="closeModal">Cancel</ion-button>
      <ion-button size="small" color="success" @click="submit"
        >Signup</ion-button
      >
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
  IonIcon,
  IonButton,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personOutline } from "ionicons/icons";

import authStore from "../store";

export default defineComponent({
  name: "Modal",
  props: ["store", "content", "title"],
  components: {
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      endpointError: "",
      form: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        organisation: "",
        address: {
          province: "Select One",
        },
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
      ],
    };
  },
  setup() {
    const formFields = [
      {
        key: "name",
        label: "Name",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "lastname",
        label: "Lastname",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "password",
        label: "Password",
        type: "password",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "organisation",
        label: "Organisation",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
    ];
    return {
      personOutline,
      formFields,
    };
  },
  methods: {
    validate(key, index) {
      if(this.formFields[index].required && !this.form[key]) {
        this.formFields[index].error = true;
        console.log("err", this.formFields[index].error);
      }
    },
    selectProvice(q) {
      console.log(q);
    },
    closeModal() {
      modalController.dismiss();
    },
    submit() {
      // for(let x = 0; this.formFields.length > x; x++) {
      //   if(this.formFields[x].required) {
      //     this.formFields[x].error = true;
      //     console.log(this.formFields);
      //   }
      // }
      authStore.dispatch("signUp", this.form)
        .then(data => {
          // eslint-disable-next-line
          console.log(data);
          modalController.dismiss();
        })
        .catch(error => {
        // eslint-disable-next-line
        console.log("dsfsd", error);
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

.error-message {
  color: #ff0000;
  text-align: center;
}

.form-buttons {
  margin-top: 25px;
  float: right;
  overflow-y: scroll;
}
</style>