var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCmdqoLmtmsBb4YxcETl4Be0jnJvdt-Ck49dNtEGTfjeejeilC78sYdMJeXe24zMvm3559tIg9QcfIF8nPi60hw",
    "privateKey": "4JiuxHUsPoWzYUTCJg3OEuCJyODHbxyXuIniYE-iJ7E"
};


webPush.setVapidDetails(
    'mailto:wretasafitri33@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dS-nonZju6c:APA91bEkPzDCjFdqZurEGxmG0QsUBmq-P3FNYNrdKuYLYc6sX6Zi-xmGLthPeybQmezsfFt1-JsweL84UDznltYySYfooflywtIsAx-ucm9DuSY2e6CgZmQ93REuoMIFv6wEWdZJQlKe",
    "keys": {
        "p256dh": "BOvzzoWqhgLjFP+z1K2m0AT4tf5G0St7plqfmgRJif2TptkU0sTSeX6auKGLZ/oYXXZ8mYLf6r/253wXvcmilGk=",
        "auth": "6jXono4O+VUzgV5NKK4O2Q=="
    }
};
var payload = 'Congrats! Aplication already get notifications from payload';

var options = {
    gcmAPIKey: '955235379087',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);