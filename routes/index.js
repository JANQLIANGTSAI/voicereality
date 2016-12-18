/**
 * -----------------------------------------------
 * Voice Reality
 * https://github.com/JANQLIANGTSAI/voicereality
 *
 * Copyright 2016-present, Max J. Tsai
 * All rights reserved.
 * -----------------------------------------------
 *
 * A Voice-Actionable (speech recognition) Multi-players Gamingfied 
 * Virtual Reality Learning Environment for Special Education
 *
 * -----------------------------------------------
 * Server: 
 *   https://github.com/JANQLIANGTSAI/expresssocketiopugbootstrap
 * WebVR:
 *   AFRAME.io (https://aframe.io/)
 * Voice Recognization
 *   AWS - Alexa
 * -----------------------------------------------
 *
 * This source code is licensed under the BSD-style license.
 *
 */

var express = require('express');
var router = express.Router();

router.get('/indexRoute.html', function(req, res, next) {
  res.send('This is Index.html!');
});

router.get('/aloha', function(req, res, next) {
  res.send('This is aloha.html!');
});


router.get('/pug', function(req, res, next) {
  res.render('default', { title: 'PUG-Bootstrap' });
});


router.get('/voicevr/:yaxis', function(req, res) {
    // res.send('voicevr ' + req.params.yaxis + '!');
    // req.io.route('')
    // req.io.broadcast(req.params.yaxis);
    req.io.sockets.emit('message', req.params.yaxis);
    res.send('VoiceReality: ' + req.params.yaxis + '!');
});

module.exports = router;
