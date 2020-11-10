<template>
  <ion-page>
    <div id="mc_embed_signup">
      <form
        :action="mailchipPostUrl"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        novalidate
      >
        <div id="mc_embed_signup_scroll">
          <h2>Subscribe</h2>
          <div class="indicates-required">
            <span class="asterisk">*</span> indicates required
          </div>
          <div class="mc-field-group">
            <label for="mce-FNAME"
              >First Name <span class="asterisk">*</span>
            </label>
            <input
              type="text"
              v-model="form.name"
              name="FNAME"
              @keyup="validForm"
              class="required"
              id="mce-FNAME"
            />
          </div>
          <div class="mc-field-group">
            <label for="mce-LNAME"
              >Last Name <span class="asterisk">*</span>
            </label>
            <input
              type="text"
              v-model="form.lastname"
              name="LNAME"
              @keyup="validForm"
              class="required"
              id="mce-LNAME"
            />
          </div>
          <div class="mc-field-group">
            <label for="mce-EMAIL"
              >Email Address <span class="asterisk">*</span>
            </label>
            <input
              type="email"
              v-model="form.email"
              name="EMAIL"
              @keyup="validForm"
              class="required email"
              id="mce-EMAIL"
            />
          </div>
          <div id="mce-responses" class="clear">
            <div
              class="response"
              id="mce-error-response"
              style="display: none"
            ></div>
            <div
              class="response"
              id="mce-success-response"
              style="display: none"
            ></div>
          </div>
          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px" aria-hidden="true">
            <input
              type="text"
              name="b_3926ccdb6e7af06a6e9a9a5e2_c72f027b89"
              tabindex="-1"
              value=""
            />
          </div>
          <div class="clear">
            <input
              type="button"
              value="Cancel"
              name="subscribe"
              class="button"
              @click="cancel"
            />
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              class="button"
              v-if="isValidForm"
              :style="`background-color: ${isValidForm ? '#144d75' : ''}`"
              @click="submit"
            />
          </div>
        </div>
      </form>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, modalController } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: ["store", "content", "title"],
  components: {
    IonPage,
  },
  data() {
    return {
      isValidForm: false,
      loading: false,
      endpointError: "",
      form: {
        name: "",
        lastname: "",
        email: "",
      },
      mailchipPostUrl:
        "https://gmail.us2.list-manage.com/subscribe/post?u=3926ccdb6e7af06a6e9a9a5e2&amp;id=c72f027b89",
      // mailchipPostUrl: ""
    };
  },
  methods: {
    validForm() {
      const { name, lastname, email } = this.form;
      if (
        name &&
        name !== "" &&
        lastname &&
        lastname !== "" &&
        email &&
        email !== ""
      ) {
        this.isValidForm = true;
      } else {
        this.isValidForm = false;
      }
    },
    cancel() {
      modalController.dismiss();
    },
    submit() {
      modalController.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
ion-content {
  height: 100vh;
}

.mc-field-group > input {
  background: #fff;
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