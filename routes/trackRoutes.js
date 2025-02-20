const express = require('express');
const { addTrack ,getTrack} = require('../controllers/tracksControllers');

const router = express.Router();

router.post('/addTrack', addTrack).get('/getTrack/:search?',getTrack);

module.exports = router;