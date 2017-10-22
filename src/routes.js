const express = require('express');
const router = express.Router();
const fs = require('fs');

const admin = require('./firebase-admin');
const firebaseMiddleware = require('express-firebase-middleware');

const db = admin.database();
const ref = db.ref('/pupils/');
router.use((req, res, next) => {
    next();
});
router.use('/public', express.static('public'));

// router.use('/api', firebaseMiddleware.auth);
router.get('/', (req, res) => {
    fs.createReadStream(__dirname + '/public/views/index.html').pipe(res);
});

router.get('/pupilData', (req, res) => {
ref.once('value', function(snapshot) {
    res.json(snapshot.val());
})
});

module.exports = router;
