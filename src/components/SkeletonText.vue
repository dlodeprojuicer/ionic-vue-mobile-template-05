<template>
  <ion-skeleton-text animated class="event-list-skeleton"></ion-skeleton-text>
  <ion-skeleton-text animated class="event-list-skeleton"></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 50%; line-height: 70px"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 90%"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 90%"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 50%"
  ></ion-skeleton-text>
  <ion-skeleton-text animated class="event-list-skeleton"></ion-skeleton-text>
  <ion-skeleton-text animated class="event-list-skeleton"></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 50%; line-height: 70px"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 90%"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 90%"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 50%"
  ></ion-skeleton-text>
  <ion-skeleton-text animated class="event-list-skeleton"></ion-skeleton-text>
  <ion-skeleton-text animated class="event-list-skeleton"></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 50%; line-height: 70px"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 90%"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 90%"
  ></ion-skeleton-text>
  <ion-skeleton-text
    animated
    class="event-list-skeleton"
    style="width: 50%"
  ></ion-skeleton-text>
</template>

<script>
import {
  IonSkeletonText
} from "@ionic/vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "skeleton-text",
  components: { IonSkeletonText }
});
</script>

<style lang="scss">
  ion-skeleton-text.event-list-skeleton {
    line-height: 20px;
  }
</style>
