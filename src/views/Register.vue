<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="lg-content-center">
        <ion-progress-bar type="indeterminate" color="dark" v-if="loading"></ion-progress-bar>
        <ion-title class="form-title">
          <ion-icon class="left-icons" :icon="personOutline"></ion-icon> 
          Register
        </ion-title>
        <ion-item v-for="(f, i) in formFields" :key="i">
          <ion-label position="stacked">{{ f.label }}</ion-label>
          <ion-input
            v-model="form[f.key]"
            :type="f.type"
            :required="f.required"
            @keyup="validate(f.key, i)"
          ></ion-input>
          <p v-if="i.error">{{ f.errMsg }}</p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Province</ion-label>
          <select v-model="form.province" placeholder="Select One">
            <option :value="item" v-for="(item, index) in provinces" :key="index">
              {{ item }}
            </option>
          </select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Would you like to be added to the list of Speakers?</ion-label>
          <ion-toggle
            @ionChange="isSpeaker()"
            v-model="form.isSpeaker"
            :checked="form.isSpeaker">
          </ion-toggle>
        </ion-item>

        <div v-if="form.isSpeaker">
          <ion-item v-for="(f, i) in speakerFormFields" :key="i">
            <ion-label position="stacked">{{ f.label }}</ion-label>
            <ion-input
              v-model="form.speaker[f.key]"
              :type="f.type"
              :required="f.required"
              :placeholder="f.placeholder"
              @keyup="validateSpeaker(f.key, i)"
            ></ion-input>
            <p v-if="i.error">{{ f.errMsg }}</p>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Is it okay if we display your contact details (email/number) on Speaker list?</ion-label>
            <ion-toggle
              @ionChange="contactInfoConsent()"
              v-model="form.contactInfoConsent"
              :checked="form.contactInfoConsent">
            </ion-toggle>
          </ion-item>
        </div>

        <p class="error-message">
          {{ endpointError.message }}
        </p>

        <div class="form-buttons">
          <p @click="gotoLoginPage">Have an account? <u>Login</u></p>
          <br /><br />
          <ion-button size="small" color="danger" @click="goHome">Cancel</ion-button>
          <ion-button size="small" color="success" @click="submit"
            >Signup</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonTitle,
  IonItem,
  IonProgressBar,
  IonLabel,
  IonInput,
  IonIcon,
  IonToggle,
  IonButton
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personOutline } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: ["store", "content", "title"],
  components: {
    IonPage,
    IonContent,
    IonTitle,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonIcon,
    IonButton
  },
  data() {
    return {
      loading: false,
      endpointError: "",
      form: {
        isSpeaker: false,
        name: "",
        lastname: "",
        email: "",
        password: "",
        organisation: "",
        province: "Select One",
        speaker: {
          role: "",
          highlight1name: "",
          highlight1year: "",
          highlight2name: "",
          highlight2year: "",
          highlight3name: "",
          highlight3year: "",
          website: "",
          twitter: "",
          linkedin: "",
        },
      // form: {
      //   isSpeaker: false,
      //   name: "Simo",
      //   lastname: "Mafuxwana",
      //   email: "speaker@gmail.com",
      //   password: "1234567890",
      //   organisation: "Own Appeal",
      //   province: "Select One",
      //   speaker: {
      //     role: "Developer",
      //     highlight1name: "DevConf",
      //     highlight1year: "2020",
      //     highlight2name: "ScaleConf",
      //     highlight2year: "2017",
      //     highlight3name: "AI Confenrence",
      //     highlight3year: "2019",
      //     website: "http://test.com",
      //     twitter: "http://twtitter.com",
      //     linkedin: "http://linkedin.com",
      //   },
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

    const speakerFormFields = [
      {
        key: "role",
        label: "What is your current role?",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "highlight1name",
        label: "Highlight 1: Conf. Name",
        placeholder: "Conference Name",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "highlight1year",
        label: "Highlight 1: Year",
        placeholder: "2020",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "highlight2name",
        label: "Highlight 2: Conf. Name",
        placeholder: "Conference Name",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "highlight2year",
        label: "Highlight 2: Year",
        placeholder: "2020",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "highlight3name",
        label: "Highlight 3: Conf. Name",
        placeholder: "Conference Name",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "highlight3year",
        label: "Highlight 3: Year",
        placeholder: "2018",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "website",
        label: "Website or Blog",
        placeholder: "http://example.com",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "twitter",
        label: "Twitter",
        placeholder: "http://twitter.com/username",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        placeholder: "http://linkedin.com/username",
        type: "text",
        required: true,
        error: false,
        errMsg: "Field required",
      },
    ];
    return {
      personOutline,
      formFields,
      speakerFormFields
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    gotoLoginPage() {
      this.$router.push("/login");
    },
    validate(key, index) {
      if(this.formFields[index].required && !this.form[key]) {
        this.formFields[index].error = true;
      }
    },
    validateSpeaker(key, index) {
      if(this.speakerFormFields[index].required && !this.form[key]) {
        this.speakerFormFields[index].error = true;
      }
    },
    isSpeaker() {
      this.form.isSpeaker = !this.form.isSpeaker;
    },
    contactInfoConsent() {
      this.form.speaker.contactInfoConsent = !this.form.speaker.contactInfoConsent;
    },
    submit() {
      // for(let x = 0; this.formFields.length > x; x++) {
      //   if(this.formFields[x].required) {
      //     this.formFields[x].error = true;
      //     console.log(this.formFields);
      //   }
      // }
      this.loading = true;
      // console.log(this.form);
      if (!this.form.isSpeaker) {
        delete this.form.speaker;
      }

      this.$store.dispatch("signUp", this.form)
        .then(() => {
          // eslint-disable-next-line
          this.$router.push("/");
          this.loading = false;
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
  },
});
</script>

<style lang="scss" scoped>
ion-content {
  height: 100vh;
}

ion-item > ion-label {
  font-weight: bold;
  font-size: 20px;
}

.form-title {
  margin-top: 60px;
}

.error-message {
  color: #ff0000;
  text-align: center;
}

</style>