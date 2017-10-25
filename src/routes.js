const express = require('express');
const router = express.Router();
const fs = require('fs');

const admin = require('./firebase-admin');

const db = admin.database();
const ref = db.ref('/pupils/');

ref.on('child_changed', function(snapshot) {
  const changedPupil = snapshot.val();
  console.log('The updated person is ', snapshot.key);
});

router.use((req, res, next) => {
    next();
});
router.use('/public', express.static('public'));

router.get('/', (req, res) => {
    fs.createReadStream(__dirname + '/public/index.html').pipe(res);
});
router.get('/app.js', (req, res) => {
    fs.createReadStream(__dirname + '/public/app.js').pipe(res);
});

router.get('/activePupils', (req, res) => {
    ref.orderByChild('status').equalTo('Active')
        .once('value', function(snapshot) {
            res.json(snapshot.val());
        });
});

router.get('/allPupils', (req, res) => {
    ref.once('value')
    .then((dataSnapshot) => {
        res.json(dataSnapshot.val());
    });
});

module.exports = router;
