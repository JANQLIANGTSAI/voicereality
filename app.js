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

/** Express **/
var express = require('express');

/** Core **/
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

/** optionals **/
var favicon = require('serve-favicon');

/** -------------- INIT ------------------ **/

// var app = express();

var app = require('express')(); 

/** -------------------------------------- **/

/** settings **/
// port
app.set('port', 8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/** favicon **/
app.use(favicon(__dirname + '/public/favicon.ico'));

/** ++ Socket.io ++ **/
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/node_modules/socket.io-client')));

/** ++ aframe.io ++ **/
app.use('/aframe', express.static(path.join(__dirname, 'node_modules/aframe/dist')));

/** Static Pages  **/
app.use(express.static(path.join(__dirname, 'public')));

/** view engine **/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// mapping pug-bootstrap css folders
app.use('/css/pug-bootstrap', express.static(path.join(__dirname, 'node_modules/pug-bootstrap/css')));

// mapping bootstrap folder(s)
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

/** cookies **/
app.use(cookieParser());

/** body parsing **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for multipart:  var upload = multer();

/** -------------------------------------- **/

app.get('/hello', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(app.get('port'), function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log(`Express Server listening at http://${host}:${port}`);
})
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
    
});

// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});

/** routing **/
var indexRoute = require('./routes/index');
app.use('/', indexRoute);