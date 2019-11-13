/* eslint-disable no-await-in-loop */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
const util = require("util");
const path = require("path");
const moment = require("moment");
const XLSX = require("xlsx");
const Busboy = require("busboy");

// Fetch
const httpRequest = require('request');

// UUIDv4
const uuid = require('uuidv4').default;

// Underscore
const _ = require('underscore');

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
  console.log(util.inspect(request.body, {showHidden: false, depth: null}))
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

  const { text, location, category, business } = request.body;
  console.log('line 72', JSON.stringify(request.body));
  geocode = await googleMaps
    .reverseGeocode({
      latlng: [parseFloat(location.lat), parseFloat(location.lon)]
      // || [parseFloat(business.location.lat), parseFloat(business.location.lon)]
    })
    .asPromise();

  // Geocode location, if needs be
  locationName =
    location.name === ""
      ? geocode.json.results[0].address_components[1].long_name
      : location.name;

  const collection = geofirestore.collection("Posts");
  
  collection
    .add({
      text,
      coordinates: new admin.firestore.GeoPoint(location.lat, location.lon),
      showOnMap: location.name !== "",
      createdAt: moment().format(),
      locationName,
      locationID: business ? business.id : 'none',
      locationType: business ? 'business' : 'none',
      businessName: business ? business.name : 'noname',
      category,
      picture,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar:
          user.photoURL ||
          "https://api.adorable.io/avatars/285/abott@adorable.png"
      },
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      return docRef.get();
    }).then(doc => {
      console.log({...doc.data() });
      return response.status(200).send({...doc.data() });
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
      name: user.displayName,
      avatar:
        user.photoURL ||
        "https://api.adorable.io/avatars/285/abott@adorable.png"
    },
  }

  const docPath = `Posts/${postID}/comments`;
  console.log('add comment path: ', docPath);
  console.log(docPath);
  admin.firestore().collection(docPath).add(comment).then(() => {
    console.log("added document");
    return response.status(200).send("Your comment has been submitted");
  }
  ).catch(() => {
    console.log("error");
    return response.status(400).send("");
  });
});

exports.toggleLike = functions.https.onRequest(async (request, response) => {
  console.log(util.inspect(request.body, {showHidden: false, depth: null}))
  
  const user = await getUser(request);

  const postID = request.body.postID;
  const locationID = request.body.locationID;

  const colPath = 'Posts';
  
  const liked = await admin.firestore().collection(colPath).where(admin.firestore.FieldPath.documentId(), `==`, postID).where(`d.likes`, "array-contains", user.uid).get()
  
  if (liked.docs.length) {
    admin.firestore().collection(colPath).doc(`${postID}`).update({ "d.likes": admin.firestore.FieldValue.arrayRemove(user.uid) }).then(() => {
      return response.status(200).send("");
    }).catch(err => console.log(err));
  }else{
    admin.firestore().collection(colPath).doc(`${postID}`).update({ "d.likes": admin.firestore.FieldValue.arrayUnion(user.uid) }).then(() => {
      return response.status(200).send("");
    }).catch(err => console.log(err));
  }
});

exports.getUserPosts = functions.https.onRequest(async (request, response) => {
  const postQuery = await geofirestore.collection(`Posts`).where('user.id', `==`, request.query.userID).get();
  
  const posts = await Promise.all(postQuery.docs.map(async doc => {
    const comments = await geofirestore.collection("Posts").doc(doc.id).collection('comments').get();
    return { 
      id: doc.id, ...doc.data(),
      likesCount: (doc.data().likes || []).length,
      liked: (doc.data().likes || []).includes(request.query.userID),
      comments: comments.docs.map(comment => comment.data()),
    };
  }));

  return response.status(200).send(posts);
});

exports.getBusinessPosts = functions.https.onRequest(async (request, response) => {
  const user = await getUser(request);

  const postQuery = await geofirestore.collection('Posts').where('locationID', '==', request.query.locationID).get();
  const posts = await Promise.all(postQuery.docs.map(async doc => {
    const comments = await geofirestore.collection(`Posts/${doc.id}/comments`).get() || [];
    return { 
      id: doc.id, ...doc.data(),
      likesCount: (doc.data().likes || []).length,
      liked: (doc.data().likes || []).includes(user.uid),
      comments: comments.docs.map(comment => comment.data()),
      locationID: request.query.locationID,
    };
  }));

  return response.status(200).send(posts);
});

exports.getFeed = functions.https.onRequest(async (request, response) => {
  console.log(util.inspect(request.query, { showHidden: false, depth: null }));

  const { lat, lon, type, category } = {
    lat: parseFloat(request.query.lat),
    lon: parseFloat(request.query.lon),
    type: request.query.type,
    category: request.query.category,
  };

  const user = await getUser(request);

  // const businessPostsQuery = await geofirestore.collection('Businesses').get();
  // console.log('businessPostsQuery: ', businessPostsQuery);
  // await Promise.all(businessPostsQuery.docs.map(async doc => {
  //   const posts = await geofirestore.collection(`Businesses/${doc.id}/posts`).get();
  //   const businessName = await geofirestore.collection('Businesses').doc(doc.id).get().then(docQuery => {
  //     if (docQuery.data()) {
  //       return docQuery.data().name;
  //     }
  //     return null;
  //   });

  //   posts.forEach(post => {
  //     geofirestore.collection('Posts').add({
  //       ...post.data(),
  //       locationID: doc.id,
  //       locationType: 'business',
  //       businessName: businessName,
  //     });
  //   });
  // }));

  geocode = await googleMaps
    .reverseGeocode({
      latlng: [lat, lon]
    })
    .asPromise();

  locationName = geocode.json.results[0].address_components[3].short_name;

  // Make database requests
  const categories = await admin
    .firestore()
    .collection("Categories")
    .get();

  let posts = await geofirestore
    .collection("Posts")
    .limit(20)
    .near({
      center: new firebase.firestore.GeoPoint(lat, lon),
      radius: 100
    });
  
  // posts = posts.where('locationType', "==", 'none');
  // Filter by type unless type is all
  if (category.toLowerCase() !== 'all') posts = posts.where('category', "==", category);


  posts = await posts.get();

  const events = await geofirestore
    .collection("Events")
    .limit(20)
    .near({
      center: new firebase.firestore.GeoPoint(lat, lon),
      radius: 100
    })
    .get();

  const businesses = await geofirestore
    .collection("Businesses")
    .limit(30)
    .near({
      center: new firebase.firestore.GeoPoint(lat, lon),
      radius: 100
    })
    .get();

  const parsedPosts = await Promise.all(posts.docs.map(async doc => {
    const comments = await admin.firestore().collection("Posts").doc(doc.id).collection('comments').get();
    return { 
        id: doc.id, ...doc.data(),
        likesCount: (doc.data().likes || []).length,
        liked: (doc.data().likes || []).includes(user.uid),
        comments: comments.docs.map(comment => comment.data()),
    }
  }
  ));

  const parsedBusinesses = await Promise.all(businesses.docs.map(async doc => {
    const posts = await admin.firestore().collection('Posts').doc(doc.id).get();
    return { 
      id: doc.id, ...doc.data(),
      recentPosts: (posts.docs || []).length,
    }
  }
  ));

  let feed = {
    city: locationName,
    categories: categories.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }),
    posts: _.sortBy(parsedPosts, (post) => {
      switch(type) {
        case 'Hot':
          return (-post.comments.length);
        case 'Best':
          return (-post.likesCount);
        case 'New':
          return -moment(post.createdAt).unix();
      }
    }),
    events: events.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    }),
    businesses: parsedBusinesses,
  };
  //console.log(util.inspect(feed, { showHidden: false, depth: null }));
  return response.status(200).send(feed);
});

exports.searchBusinesses = functions.https.onRequest(async (request, response) => {
  const { lat, lon, query } = {
    lat: parseFloat(request.query.lat),
    lon: parseFloat(request.query.lon),
    query: request.query.q,
  };

  geofirestore
  .collection("Businesses")
  .where('name', '>=', query).where('name', '<=', query+ '\uf8ff')
  .limit(10)
  .near({
    center: new firebase.firestore.GeoPoint(lat, lon),
  })
  .get().then(snapshot => {
    return response.status(200).send(snapshot.docs.map((b) => {
      console.log(b.data().id);
      return {
        id: b.data().id,
        name: b.data().name,
      };
    }));
  }).catch(err => console.log(err));
});

/*
    Data sources
*/
exports.uploadEvents = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    const form = `
    <body>
      <form id="fileForm" method="post" enctype="multipart/form-data"> 
        <label for="file">Choose file to upload</label>
        <input type="file" id="file" name="file">
        <input type="submit" value="Submit" /> 
      </form>
    </body>
    `;

    return response.status(200).send(form);
  } else {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldname, file, filename) => {
      file.on('data', async (data) => {
          let batch = geofirestore.batch();

          var workbook = XLSX.read(data);
          var sheet = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[sheet];

          var range = XLSX.utils.decode_range(worksheet['!ref']);
          let events = [];
          for(var R = range.s.r; R <= range.e.r; ++R) {
            if (R === 0) continue;

            if (worksheet[XLSX.utils.encode_cell({ c:0, r:R })] === undefined) break;
            
            console.log(`Importing ${worksheet[XLSX.utils.encode_cell({ c:4, r:R })].w}`);

            const geocode = await googleMaps.geocode({ 'address': worksheet[XLSX.utils.encode_cell({ c:6, r:R })].w}).asPromise().catch(err => console.log(err));
            
            const event = {
              id: `xls-${worksheet[XLSX.utils.encode_cell({ c:0, r:R })].w}`,
              title: worksheet[XLSX.utils.encode_cell({ c:4, r:R })].w,
              text: worksheet[XLSX.utils.encode_cell({ c:7, r:R })].w,
              picture: worksheet[XLSX.utils.encode_cell({ c:3, r:R })].w,
              coordinates: new admin.firestore.GeoPoint(
                parseFloat(geocode.json.results[0].geometry.location.lat),
                parseFloat(geocode.json.results[0].geometry.location.lng)
              ),
              happeningOn: moment(`${worksheet[XLSX.utils.encode_cell({ c:2, r:R })].w} ${worksheet[XLSX.utils.encode_cell({ c:1, r:R })].w}`,
              "M/DD/YY HH:mmA").format(),
            };

            const doc = geofirestore.collection("Events").doc(`${event.id}`);
            batch.set(doc, event);
        }
        batch.commit().then(events => {
          return response.status(200).send("Done");
        })
        .catch(err => console.log(err));
      });
    });

    busboy.on('finish', () => {
      //return response.status(200).send("done");
    });

    busboy.end(request.rawBody);
  }
});

exports.uploadBusinesses = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    const form = `
    <body>
      <form id="fileForm" method="post" enctype="multipart/form-data"> 
        <label for="file">Choose file to upload</label>
        <input type="file" id="file" name="file">
        <input type="submit" value="Submit" /> 
      </form>
    </body>
    `;

    return response.status(200).send(form);
  } else {
    const busboy = new Busboy({ headers: request.headers });

    busboy.on('file', (fieldname, file, filename) => {
      file.on('data', async (data) => {
          let batch = geofirestore.batch();

          var workbook = XLSX.read(data);
          console.log(workbook.SheetNames);
          for (var index in workbook.SheetNames) {
            
            var worksheet = workbook.Sheets[workbook.SheetNames[index]];

            var range = XLSX.utils.decode_range(worksheet['!ref']);

            for(var R = range.s.r; R <= range.e.r; ++R) {
              if (R === 0) continue;

              if (worksheet[XLSX.utils.encode_cell({ c:0, r:R })] === undefined) break;
              
              try {
                console.log(`Importing ${worksheet[XLSX.utils.encode_cell({ c:2, r:R })].w}`);
                const geocode = await googleMaps.geocode({ 'address': worksheet[XLSX.utils.encode_cell({ c:3, r:R })].w}).asPromise().catch(err => console.log(err));
                //`xls-${worksheet[XLSX.utils.encode_cell({ c:0, r:R })].w}`,
                const business = {
                  id: `xls-${worksheet[XLSX.utils.encode_cell({ c:0, r:R })].w}`,
                  name: worksheet[XLSX.utils.encode_cell({ c:2, r:R })].w,
                  about: worksheet[XLSX.utils.encode_cell({ c:6, r:R })].w,
                  description: '',
                  picture: worksheet[XLSX.utils.encode_cell({ c:1, r:R })].w,
                  coordinates: new admin.firestore.GeoPoint(
                    parseFloat(geocode.json.results[0].geometry.location.lat),
                    parseFloat(geocode.json.results[0].geometry.location.lng)
                  ),
                  phone: worksheet[XLSX.utils.encode_cell({ c:5, r:R })].w,
                  website: worksheet[XLSX.utils.encode_cell({ c:4, r:R })].w,
                  type: worksheet[XLSX.utils.encode_cell({ c:7, r:R })].w
                };

                const doc = geofirestore.collection("Businesses").doc(`${business.id}`);
                batch.set(doc, business);
              }catch(err){
                console.log(`Failed to import row ${R}`)
              }
            }
          }
        batch.commit().then(events => {
          return response.status(200).send("Done");
        })
        .catch(err => console.log(err));
      });
    });

    busboy.on('finish', () => {
      //return response.status(200).send("done");
    });

    busboy.end(request.rawBody);
  }
});

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
