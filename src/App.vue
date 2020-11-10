<template>
  <ion-app>
    <Header />
    <ion-router-outlet id="menuContent" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import Header from "./components/Header";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Header
  }
});
</script>

<style>
ion-router-outlet {
  margin-top: 25px;
}
</style>