const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const util = require('util');
var path = require('path');

const { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } = require('geofirestore');

admin.initializeApp();

const geofirestore = new GeoFirestore(admin.firestore());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.newPost = functions.https.onRequest(async (request, response) => {
    // response.send(`Hello from Firebase my ${request.query.a}`);
    //console.log(util.inspect(request.body, {showHidden: false, depth: null}))

    // Setup image bucket
    let picture = '';
    if (request.body.pictureURI) {
        const filename = path.parse(request.body.pictureURI).base;
        
        const imagesBucket = admin.storage().bucket('sembly-staging.appspot.com');
        const imageFile = await imagesBucket.file(`images/posts/${filename}`)
        await imageFile.save(Buffer.from(request.body.pictureData, 'base64'));
        
        // Get the file URL
        const metaData = await imageFile.getMetadata();
        picture = metaData[0].mediaLink;
    }
    
    const { text, location, category } = request.body;

    geofirestore.collection('Posts').add({
        text,
        coordinates: new admin.firestore.GeoPoint(location.lat, location.lon),
        category,
        picture,
        user: {
            id: 0,
            name: "Placeholder user",
            avatar: "https://api.adorable.io/avatars/285/abott@adorable.png",
        },
        comments: [],
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return response.status(200).send('Your post has been submitted');
    })
    .catch((error) => {
        console.log("Error adding document: ", error);
        return response.status(400).send('');
    });
});

exports.getFeed = functions.https.onRequest(async(request, response) => {
    console.log(util.inspect(request.query, {showHidden: false, depth: null}))

    const { lat, lon } = { lat: parseFloat(request.query.lat), lon: parseFloat(request.query.lon) };
    const categories = await admin.firestore().collection('Categories').get();

    const posts = await geofirestore.collection('Posts').limit(20)
    .near({
        center: new firebase.firestore.GeoPoint(lat, lon),
        radius: 100,
    }).get();

    const events = await geofirestore.collection('Events').limit(5)
    .near({
        center: new firebase.firestore.GeoPoint(lat, lon),
        radius: 100,
    }).get();
    
    const businesses = await geofirestore.collection('Businesses').limit(20)
    .near({
        center: new firebase.firestore.GeoPoint(lat, lon),
        radius: 100,
    }).get();

    console.log(util.inspect(request.query, {showHidden: false, depth: null}))
    let feed = {
        city: 'Seattle',
        categories: categories.docs.map(doc => { return { id: doc.id, ...doc.data() } }),
        posts: posts.docs.map(doc => { return { id: doc.id, ...doc.data() } }),
        events: events.docs.map(doc => { return { id: doc.id, ...doc.data() } }),
        businesses: businesses.docs.map(doc => { return { id: doc.id, ...doc.data() } }),
    };
    return response.status(200).send(feed);
});