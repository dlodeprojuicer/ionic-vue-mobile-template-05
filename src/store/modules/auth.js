// import mailchimp from "@mailchimp/mailchimp_marketing";
import firebase from "./../../firebase";

// mailchimp.setConfig({
//   apiKey: "bfe135ec5d510567a5e6e2be6557849c-us2",
//   server: "us2",
// });

const addToSpeakers = (speaker) => {
  let speakerObj = {
    name: speaker.name,
    lastname: speaker.lastname,
    position: speaker.role,
    contact: speaker.contactInfoConsent ? speaker.contact : "",
    image: "",
    social: [
      {
        link: speaker.twitter,
        label: "Twitter"
      },
      {
        link: speaker.linkedin,
        label: "LinkedIn"
      },
      {
        link: speaker.website,
        label: "Website"
      }
    ],
    highlights: [
      {
        name: speaker.highlight1name,
        year: speaker.highlight1year
      }, 
      {
        name: speaker.highlight2name,
        year: speaker.highlight2year
      }, 
      {
        name: speaker.highlight3name,
        year: speaker.highlight3year
      }, 
    ],
  };
  return speakerObj;
};

const state = {
  loginToken: false,
}

const getters = {
  loginToken({ loginToken }) {
    return loginToken || localStorage.getItem("tcdbLoginToken");
  },
  authError(state) {
    return state.authError;
  },
}

const mutations = {
  loginToken(state, token) {
    if(token) {
      state.loginToken = token;
      localStorage.setItem("tcdbLoginToken", token);
    } else {
      state.loginToken = null;
      localStorage.clear();
    }
  },
  authError(state, data) {
    state.authError = data;
  }
}

const actions = {
  login(context, request) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(request.email, request.password)
        .then(({ user }) => {
          context.dispatch("getUserProfile", user.uid).then(() => {
            context.commit("loginToken", user.uid);
            resolve(user.uid);
          });
        }).catch(function(error) {
        reject(error)
      });
    })
  },
  signUp(context, request) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(request.email, request.password)
        .then(({ user }) => {
          context.commit("loginToken", user.uid);
          request.uid = user.uid;
          request.verified = true;
          delete request.password;
          context.dispatch("createUser", request).then(() => {
            if (request.isSpeaker) {
              let obj = {
                ...request.speaker,
                name: request.name,
                lastname: request.lastname,
                contact: request.email
              }
              context.dispatch("createSpeaker", addToSpeakers(obj)).then(() => {
                resolve(user.uid);
              }).catch(e => {
                reject(e);
              });
            } else {
              resolve(user.uid);
            }
          }).catch(err => {
            reject(err);
          });
        }).catch(error => {
          reject(error)
        });
    })
  },
  logout(context) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          context.commit("loginToken", false);
          resolve();
        }).catch(error => {
        reject(error)
      });
    })
  },
  loginStatus(context) {
    return new Promise(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          context.commit("loginToken", user.uid);
        } else {
          context.commit("loginToken", false);
        }
      });
    });
  }
  // subscribe(context, request) {
  //   return new Promise((resolve, reject) => {
  //     mailchimp.post(`lists/c72f027b89/members`, {
  //       ...request,
  //       status: "subscribed"
  //     })
  //     .then(() => resolve())
  //     .catch(err => reject(err))
  //   })
  // },
  // async mailchimpTest() {
  //   const response = await mailchimp.ping.get();
  //   console.log(response);
  // }
}

export default { state, getters, mutations, actions }
