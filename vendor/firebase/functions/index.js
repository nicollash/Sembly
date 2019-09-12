const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.newPost = functions.https.onRequest((request, response) => {
    // response.send(`Hello from Firebase my ${request.query.a}`);
    console.log(util.inspect(request.body, {showHidden: false, depth: null}))
    admin.firestore().collection('Posts').add(request.body)
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
    const posts = await admin.firestore().collection('Posts').get();
    const events = await admin.firestore().collection('Events').get();
    const categories = await admin.firestore().collection('Categories').get();
    const businesses = await admin.firestore().collection('Businesses').get();

    let feed = {
        city: 'Seattle',
        categories: categories.docs.map(doc => doc.data()),
        posts: posts.docs.map(doc => doc.data()),
        events: events.docs.map(doc => doc.data()),
        businesses: businesses.docs.map(doc => doc.data()),
    };
    return response.status(200).send(feed);
});