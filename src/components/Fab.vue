<template>
  <ion-fab vertical="bottom" horizontal="start">
    <ion-fab-button color="dark" @click="loginModal">
      <ion-icon :icon="add" v-if="loginToken"></ion-icon>
      <ion-icon :icon="logInOutline" v-if="!loginToken"></ion-icon>
    </ion-fab-button>
    <!-- <ion-fab-list side="top" v-if="!loginToken">
      <ion-fab-button data-desc="Please login or sign-up to add an event">
        <ion-icon :icon="informationCircleOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button data-desc="Sign-up" @click="signUpModal">
        <ion-icon :icon="lockOpenOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button data-desc="Login" @click="loginModal">
        <ion-icon :icon="logInOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab-list> -->
  </ion-fab>
</template>

<script>
import { modalController, IonIcon, IonFabButton, IonFab } from "@ionic/vue";
import {
  add,
  logInOutline,
  lockOpenOutline,
  informationCircleOutline,
} from "ionicons/icons";
import UserSignUpModal from "./UserSignUpModal";
import NewEventModal from "./NewEventModal";
// import LoginModal from "./LoginModal";

import { mapGetters } from "vuex";

export default {
  name: "fab",
  components: { IonIcon, IonFabButton, IonFab },
  setup() {
    return {
      add,
      logInOutline,
      lockOpenOutline,
      informationCircleOutline,
    };
  },
  computed: {
    ...mapGetters(["loginToken"]),
  },
  data() {
    return {
      urlCheck: window.location.host.includes("-dev") || window.location.host.includes("localhost") ? true : false
    }
  },
  mounted() {
    // this.addEventModal();
  },
  methods: {
    async signUpModal() {
      const modal = await modalController.create({
        component: UserSignUpModal,
        cssClass: "my-custom-class",
        componentProps: {
          data: {
            content: "Content from parent",
            store: this.$store,
          },
          propsData: {
            title: "Title from parent",
          },
        },
      });
      return modal.present();
    },
    loginModal() {
      if (this.loginToken) {
        this.$router.push("/create-event")
        // if (window.location.pathname === "/venues") {
        //   this.$router.push("/create-venue")
        // } else {
        //   this.$router.push("/create-event")
        // }
      } else {
        this.$router.push("/login");
      }

      // const modal = await modalController.create({
      //   component: LoginModal,
      //   cssClass: "my-custom-class",
      //   componentProps: {
      //     data: {
      //       content: "Content from parent",
      //       store: this.$store,
      //     },
      //     propsData: {
      //       title: "Title from parent",
      //     },
      //   },
      // });
      // return modal.present();
    },
    async addEventModal() {
      if (this.loginToken) {
        const modal = await modalController.create({
          component: NewEventModal,
          cssClass: "my-custom-class",
          componentProps: {
            data: {
              content: "Content from parent",
              store: this.$store,
            },
            propsData: {
              title: "Title from parent",
            },
          },
        });
        return modal.present();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ion-fab-button[data-desc]::after {
  position: fixed;
  content: attr(data-desc);
  z-index: 1;
  bottom: 8px;
  left: 52px;
  background-color: #fff;
  color: #000;
  padding: 6px 10px;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
}

ion-icon {
  font-size: 25px;
}
</style>