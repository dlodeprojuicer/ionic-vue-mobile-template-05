import firebase from "../../firebase";

const state = {
  venues: [
    {
      "area": "Cape Town",
      "phone": "021 412 9999",
      "venueName": "The Wistin",
      "width": 80.6,
      "length": 50.2,
      "height": 5.63,
      "equipment": [
        "Overhead Projector",
        "PA System"
      ],
      "aircon": true,
      "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
      "email": "gallagher@gallagher.co.za",
      "squareMeter": 27000,
      "wheelchairFriendly": true,
      "website": "https://gallagher.co.za/hall2",
      "capacityMax": 2500,
      "capacityMin": 20,
      "wifi": true,
      "verified": true
    },
    {
      "area": "Midrand, Johannesburg",
      "phone": "011 266 3000",
      "venueName": "Hall 2 - Gallagher Converntion Center",
      "width": 107.9,
      "length": 61.5,
      "height": 9.83,
      "equipment": [
        "Overhead Projector",
        "PA System"
      ],
      "aircon": true,
      "createdBy": "JE3Bh37hpOch095fAEAcNbwrQWI3",
      "email": "gallagher@gallagher.co.za",
      "squareMeter": 27000,
      "wheelchairFriendly": true,
      "website": "https://gallagher.co.za/hall2",
      "capacityMax": 7000,
      "capacityMin": 20,
      "wifi": true,
      "verified": true
    }
  ],
  filteredVenues: [],
  updateVenueSearchObject: {}
}

const getters = {
  venues({ venues = [] }) {
    return venues || JSON.parse(localStorage.getItem("tcdbVenues"));
  },
  filteredVenues({ venues = [], updateVenueSearchObject }) {
    if (!updateVenueSearchObject.field || updateVenueSearchObject.field === "") {
      return venues;
    } else {
      return venues.filter(venue => venue[updateVenueSearchObject.field].toLowerCase().includes(updateVenueSearchObject.value.toLowerCase()));
    }
  },
}

const mutations = {
  venues(state, data) {
    state.venues = data;
    localStorage.setItem("tcdbVenues", JSON.stringify(data));
  },
  updateSearch(state, data) {
    state[data.stateObject] = data;
  }
}

const actions = {
  createVenue(context, request) {
    request.createdBy = context.getters.loginToken;
    return new Promise((resolve, reject) => {
      const createVenueFn = r => {
        firebase.firestore().collection("venues")
          .add(r)
          .then(() => {
            context.dispatch("getVenues").then(venues => {
              context.commit("venues", venues);
              resolve(venues)
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
        });
    });
  },
  getVenues(context) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection("venues")
        .orderBy("venueName")
        .where("verified", "==", true)
        .get()
        .then(({ docs }) => {
          context.commit("venues", docs.map(a => a.data()));
          resolve(docs.map(a => a.data()));
        }).catch( error => {
          reject(error)
        });
    })
  },
}

export default { state, getters, mutations, actions }
