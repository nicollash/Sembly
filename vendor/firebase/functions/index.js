const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
const util = require("util");
var path = require("path");
var moment = require("moment");

// Fetch
const httpRequest = require('request');

// UUIDv4
const uuid = require('uuidv4').default;

// GeoStore initialization
const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");

// Google Maps initialization
const googleMaps = require("@google/maps").createClient({
  key: "AIzaSyAJIDeViLfur4T_6BjordyY4EI03PDBv5A",
  Promise: Promise
});

// 3rd party
const eventbrite = require("eventbrite").default;

admin.initializeApp();

const geofirestore = new GeoFirestore(admin.firestore());

const getUser = async req => {
  const idToken = req.get("Authorization").split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);

  return await admin.auth().getUser(decodedToken.uid);
};
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.newPost = functions.https.onRequest(async (request, response) => {
  // response.send(`Hello from Firebase my ${request.query.a}`);
  //console.log(util.inspect(request.body, {showHidden: false, depth: null}))
  const user = await getUser(request);

  // Setup image bucket
  let picture = "";
  if (request.body.pictureURI) {
    const filename = path.parse(request.body.pictureURI).base;
    
    const imagesBucket = admin.storage().bucket("sembly-staging.appspot.com");
    const imageFile = await imagesBucket.file(`images/posts/${uuid()}${filename}`);
    await imageFile.save(Buffer.from(request.body.pictureData, "base64"), {
      metadata: { contentType: 'image/jpeg' },
    });

    // Get the file URL
    picture = (await imageFile.getSignedUrl({ action: 'read', expires: '03-17-2025' }))[0];

  }

  const { text, location, category } = request.body;
  geocode = await googleMaps
    .reverseGeocode({
      latlng: [parseFloat(location.lat), parseFloat(location.lon)]
    })
    .asPromise();

  locationName =
    location.name === ""
      ? geocode.json.results[0].address_components[1].long_name
      : location.name;

  geofirestore
    .collection("Posts")
    .add({
      text,
      coordinates: new admin.firestore.GeoPoint(location.lat, location.lon),
      createdAt: moment().format(),
      locationName,
      category,
      picture,
      user: {
        id: user.uid,
        name: user.email.substring(0, user.email.indexOf("@")),
        avatar:
          user.photoURL ||
          "https://api.adorable.io/avatars/285/abott@adorable.png"
      },
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      return response.status(200).send("Your post has been submitted");
    })
    .catch(error => {
      console.log("Error adding document: ", error);
      return response.status(400).send("");
    });
});

exports.addComment = functions.https.onRequest(async (request, response) => {
  console.log(util.inspect(request.body, {showHidden: false, depth: null}))
  
  const user = await getUser(request);

  const postID = request.body.postID;
  const text = request.body.text;
  const comment = {
    text,
    createdAt: moment().format(),
    author: {
      id: user.uid,
      name: user.email.substring(0, user.email.indexOf("@")),
      avatar:
        user.photoURL ||
        "https://api.adorable.io/avatars/285/abott@adorable.png"
    },
  }

  console.log(util.inspect(comment, {showHidden: false, depth: null}))

  admin.firestore().collection("Posts").doc(`${postID}`).collection('comments').add(comment).then(() => {
    console.log("added document");
    return response.status(200).send("Your post has been submitted");
  }
  ).catch(() => {
    console.log("error");
    return response.status(400).send("");
  });


});

exports.getFeed = functions.https.onRequest(async (request, response) => {
  //console.log(util.inspect(request.query, { showHidden: false, depth: null }));

  const { lat, lon } = {
    lat: parseFloat(request.query.lat),
    lon: parseFloat(request.query.lon)
  };

  httpRequest(`https://us-central1-sembly-staging.cloudfunctions.net/getEvents?lat=${lat}&lon=${lon}`);
  httpRequest(`https://us-central1-sembly-staging.cloudfunctions.net/getBusinesses?lat=${lat}&lon=${lon}`);

  geocode = await googleMaps
    .reverseGeocode({
      latlng: [lat, lon]
    })
    .asPromise();

  locationName = geocode.json.results[0].address_components[2].long_name;

  // Make database requests
  const categories = await admin
    .firestore()
    .collection("Categories")
    .get();

  const posts = await geofirestore
    .collection("Posts")
    .limit(20)
    .near({
      center: new firebase.firestore.GeoPoint(lat, lon),
      radius: 100
    })
    .get();

  const events = await geofirestore
    .collection("Events")
    .limit(5)
    .near({
      center: new firebase.firestore.GeoPoint(lat, lon),
      radius: 100
    })
    .get();

  const businesses = await geofirestore
    .collection("Businesses")
    .limit(20)
    .near({
      center: new firebase.firestore.GeoPoint(lat, lon),
      radius: 100
    })
    .get();


  let feed = {
    city: locationName,
    categories: categories.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }),
    posts: await Promise.all(posts.docs.map(async doc => {
      const comments = await admin.firestore().collection("Posts").doc(doc.id).collection('comments').get()
      return { 
        id: doc.id, ...doc.data(),
        comments: comments.docs.map(comment => comment.data()),
      };
    })),
    events: events.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }),
    businesses: businesses.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    })
  };
  console.log(util.inspect(feed, { showHidden: false, depth: null }));
  return response.status(200).send(feed);
});

/*
    CRONS
*/

exports.getEvents = functions.https.onRequest(async (request, response) => {
  const sdk = eventbrite({ token: "CJ5OZRLECWAMECBF6KXS" });

  // Get passed positions
  const { lat, lon, radius } = {
    lat: parseFloat(request.query.lat),
    lon: parseFloat(request.query.lon),
    radius: parseInt(request.query.radius) || 50
  };

  sdk
    .request(
      `/events/search?location.latitude=${lat}&location.longitude=${lon}&expand=venue`
    )
    .then(res => {
      console.log(util.inspect(res, {showHidden: false, depth: null}))
      // venue.address.latitude
      // venue.address.longitude
      let batch = geofirestore.batch();
      let events = [];
      res.events.forEach(ev => {
        const event = {
          id: `eb-${ev.id}`,
          title: ev.name.text,
          text: ev.description.text,
          picture: ev.logo ? ev.logo.url : "",
          coordinates: new admin.firestore.GeoPoint(
            parseFloat(ev.venue.address.latitude),
            parseFloat(ev.venue.address.longitude)
          ),
          happeningOn: ev.start.utc,

        };
        const doc = geofirestore.collection("Events").doc(`${event.id}`);
        batch.set(doc, event);
      });

      return batch.commit();
    })
    .then(events => {
      return response.status(200).send("Done");
    })
    .catch(err => console.log(err));
});

// http://localhost:5000/sembly-staging/us-central1/getBusinesses?lat=37.3229878&lon=-122.0321823
exports.getBusinesses = functions.https.onRequest(async (req, res) => {
    // Get passed positions
    const { lat, lon, radius } = {
      lat: parseFloat(req.query.lat),
      lon: parseFloat(req.query.lon),
      radius: parseInt(req.query.radius) || 100
    };

    const fields = 'id,about,cover,description,location,name,phone';
  
    httpRequest(
        `https://graph.facebook.com/v3.2/search?type=place&center=${lat},${lon}&distance=${radius}&fields=${fields}&access_token=497315547108819|5cb82680267695d6f98d437ea493be68`,
        (error, response, body) => {
        //console.log(util.inspect(body, {showHidden: false, depth: null}))
        // venue.address.latitude
        // venue.address.longitude
        let batch = geofirestore.batch();
        JSON.parse(body)['data'].forEach(b => {
            console.log(b);
          const business = {
            id: `fb-${b.id}`,
            name: b.name,
            about: b.about ? b.about : '',
            description: b.description ? b.description : '',
            picture: b.cover ? b.cover.source : '',
            coordinates: new admin.firestore.GeoPoint(
              parseFloat(b.location.latitude),
              parseFloat(b.location.longitude)
            ),
            phone: b.phone ? b.phone : '',
  
          };
          
          const doc = geofirestore.collection("Businesses").doc(`${business.id}`);
          batch.set(doc, business);
        });
        
        batch.commit().then(() => {
          return res.status(200).send("Done") 
        }).catch(e => console.log);
      });
  });