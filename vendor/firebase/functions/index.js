const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util');
var path = require('path');

admin.initializeApp();
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

    admin.firestore().collection('Posts').add({
        text,
        location,
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
    const posts = await admin.firestore().collection('Posts').get();
    const events = await admin.firestore().collection('Events').get();
    const categories = await admin.firestore().collection('Categories').get();
    const businesses = await admin.firestore().collection('Businesses').get();
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