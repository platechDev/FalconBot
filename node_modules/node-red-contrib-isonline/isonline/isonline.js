/**
 * Created by Bladerunner on 11/03/16.
 */
var net = require('net');
var Promise = require('bluebird');

module.exports = function(RED) {
    function NodeIsOnline(config) {
        RED.nodes.createNode(this,config);
        this.action = config.action;

        var node = this;

        this.on('input', function(msg) {
            msg.timestamp = +new Date();

            var url = msg.url || config.url || 'google.com';
            // if (!msg.url) msg.url = url; // can't redefine msg.url
            var pos = url.indexOf(":");
            var port = "80";
            if (pos > 0) {
                port = url.substring(pos+1);
                url = url.substring(0, pos);
            }


            checkConnection(url, port, msg.timeout).then(function() {
                SendMessage(node, msg, true);
            }, function(err) {
                msg.online_error = err.toString();
                SendMessage(node, msg, false);
            });

        });
    }

    RED.nodes.registerType("is online",NodeIsOnline);
};

function SendMessage(node, msg, online) {

    msg.online = online;
    switch (parseInt(node.action)) {
        case 0:
            msg.payload = online;
            break;
        case 1:
            if (!online) msg = null;
            break;
        case 2:
            if (online) msg = null;
            break;
        case 3:
            break;
    }

    node.send(msg);
}

function checkConnection(host, port, timeout) {
    return new Promise(function(resolve, reject) {
        timeout = timeout || 1000;     // default of 1 second
        var timer = setTimeout(function() {
            reject("timeout");
            socket.end();
        }, timeout);
        var socket = net.createConnection(port, host, function() {
            clearTimeout(timer);
            resolve();
            socket.end();
        });
        socket.on('error', function(err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}


