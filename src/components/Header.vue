<template>
  <ion-header>
    <ion-toolbar class="desktop-nav">
      <ion-buttons slot="secondary">
        <!-- <ion-button v-if="userProfile.admin" @click="gotoDashboard">Dashboard</ion-button> -->
        <ion-button @click="gotoHome">Conferences</ion-button>
        <ion-button @click="gotoVenues">Venues</ion-button>
        <ion-button @click="gotoSpeakers">Speakers</ion-button>
        <ion-button @click="gotoProfile" v-if="loginToken">Profile</ion-button>
        <ion-button @click="subscribe">Subscribe</ion-button>
        <ion-button @click="logout" v-if="loginToken">Logout</ion-button> 
      </ion-buttons>
      <ion-buttons>
      </ion-buttons>
      <ion-title class="logo" @click="gotoHome">{{ name }} </ion-title>
      <ion-title class="logo2" @click="gotoHome">{{ name2 }} </ion-title>
    </ion-toolbar>
    <ion-toolbar class="mobile-nav">
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false" @click="openMenu"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="primary">
        <ion-button>
          <ion-icon slot="icon-only" ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>{{ name }}</ion-title>
    </ion-toolbar>
  </ion-header>
	<ion-menu side="start" content-id="menuContent">
		<ion-content>
			<ion-list>
				<ion-item class="logo-item">
					<ion-label>{{ name }}</ion-label>
				</ion-item>
				<ion-item @click="gotoHome">
					<ion-label>Conferences</ion-label>
				</ion-item>
				<ion-item @click="gotoVenues">
					<ion-label>Venues</ion-label>
				</ion-item>
				<ion-item @click="gotoSpeakers">
					<ion-label>Speakers</ion-label>
				</ion-item>
				<ion-item @click="subscribe">
					<ion-label>Subscribe</ion-label>
				</ion-item>
				<ion-item @click="gotoProfile" v-if="loginToken">
					<ion-label>Profile</ion-label>
				</ion-item>
				<ion-item @click="logout" v-if="loginToken">
					<ion-label>Logout</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>

<script>
import { IonToolbar, IonMenuButton, IonLabel, IonItem, IonList, IonContent, IonMenu, IonHeader, IonTitle, IonIcon, IonButtons, IonButton, menuController, modalController } from "@ionic/vue";
import { ellipsisVertical, menuOutline } from "ionicons/icons";
import { mapGetters } from 'vuex';
import Subscription from "./Subscription";

export default {
  name: "recent-list",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: { IonIcon, IonMenuButton, IonList, IonLabel, IonItem, IonContent, IonMenu, IonToolbar, IonHeader, IonTitle, IonButtons, IonButton },
  computed: {
    ...mapGetters(['loginToken', 'userProfile']),
  },
  setup() {
    return {
      ellipsisVertical,
      menuOutline,
      name: "<TechConf-db />",
      name2: "TC-db",
    };
  },
  data() {
    return {
      searchString: ""
    }
  },
  methods: {
    async openMenu() {
      await menuController.open("start");
    },
    async gotoHome() {
      this.$router.push("/");
      await menuController.close("start");
    },
    async gotoDashboard() {
      this.$router.push("/dashboard");
      await menuController.close("start");
    },
    async gotoSpeakers() {
      this.$router.push("/speakers");
      await menuController.close("start");
    },
    async gotoVenues() {
      this.$router.push("/venues");
      await menuController.close("start");
    },
    async gotoProfile() {
      this.$router.push("/profile");
      await menuController.close("start");
    },
    async subscribe() {
      const modal = await modalController.create({
        component: Subscription,
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
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
ion-toolbar, ion-menu-button, ion-button {
  --background: #144d75;
  --color: #ffffff;
  font-weight: 700;
}

ion-button.sign-out {
  font-size: 17px;
  font-weight: 500;
  margin-left: 5px;
  float: left;
  --color: #ffffff;
}

.ellipsis {
  color: #ffffff;
}

ion-title.logo {
  font-weight: 900;
  font-size: 25px;
  // text-align: center;
}

ion-list {
  padding-top: 0;
}

ion-item.logo-item {
  --background: #144d75;
  color: #fff;
  font-weight: bold;
  line-height: 30px;
}

</style>
