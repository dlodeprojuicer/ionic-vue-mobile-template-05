import firebase from "../../firebase";

const state = {
  speakers: [
    {
      name: "Makazole",
      lastname: "Mapimpi",
      position: "S.A rugby wing",
      contact: "makazoli@fakeemail.com",
      image: "https://ionic-vue-mobile-template-01.netlify.app/assets/img/makazoli.png",
      social: [
        {
          link: "https://www.linkedin.com/in/simomafuxwana",
          label: "LinkedIn"
        },
        {
          link: "https://simomafuxwana.netlify.com",
          label: "Website"
        },
        {
          link: "https://twitter.com/dlodeprojuicer",
          label: "Twitter"
        }
      ],
      highlights: [
        {
          name: "Microsoft Ignite",
          year: "2020"
        }, 
        {
          name: "Microsoft Insiders Dev",
          year: "2019"
        }, 
        {
          name: "Global DevOps Bootcamp",
          year: "2019"
        }, 
      ],
    },
    {
      name: "Max",
      lastname: "Verstapan",
      position: "RedBull F1 Driver",
      contact: "supermax@fakeemail.com",
      image: "https://ionic-vue-mobile-template-01.netlify.app/assets/img/max.png",
      social: [
        {
          link: "https://www.linkedin.com/in/simomafuxwana",
          label: "LinkedIn"
        }
      ],
      highlights: [
        {
          name: "Microsoft Ignite",
          year: "2020"
        }, 
        {
          name: "Microsoft Insiders Dev",
          year: "2019"
        }, 
        {
          name: "Global DevOps Bootcamp",
          year: "2019"
        }, 
      ],
    }
  ],
}

const getters = {
  speakers({ speakers = [] }) {
    return speakers || JSON.parse(localStorage.getItem("tcdbSpeakers"));
  },
}

const mutations = {
  speakers(state, data) {
    state.speakers = data;
    localStorage.setItem("tcdbSpeakers", JSON.stringify(data));
  },
}

const actions = {
  createSpeaker(context, request) {
    request.createdBy = context.getters.loginToken;
    return new Promise((resolve, reject) => {
      const createVenueFn = r => {
        firebase.firestore().collection("speakers")
          .add(r)
          .then(() => {
            context.dispatch("getSpeakers").then(speakers => {
              context.commit("speakers", speakers);
              resolve(speakers)
            })
            .catch(error => {
              reject(error);
            });
        });
      }

      firebase.firestore().collection("users")
        .doc(context.getters.loginToken)
        .get()
        .then(user => {
          if (user.data().verified) {
            request.verified = true;
            createVenueFn(request);
          } else {
            createVenueFn(request)
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  getSpeakers(context) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection("speakers")
        .orderBy("name")
        .where("verified", "==", true)
        .get()
        .then(({ docs }) => {
          context.commit("speakers", docs.map(a => a.data()));
          resolve(docs.map(a => a.data()));
        }).catch( error => {
          reject(error)
        });
    })
  },
}

export default { state, getters, mutations, actions }
