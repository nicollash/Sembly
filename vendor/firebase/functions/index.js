const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.newPost = functions.https.onRequest((request, response) => {
    response.send(`Hello from Firebase my ${request.query.a}`);
    console.log(util.inspect(request.body, {showHidden: false, depth: null}))
    admin.firestore().collection('Posts').add(request.body)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        return true;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        return false;
    });
});
