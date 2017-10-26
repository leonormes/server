
const admin = require('./firebase-admin');
const db = admin.database();
const ref = db.ref('/pupils/');
module.exports = ref;
