const express = require("express")
const fetch = require("node-fetch")

const router = express.Router();

router.post("/", (req, res) => {
    var notification = {
        'title' :  "title of notification",
        'text': "subtitle"
    };
    var fcm_tokens = [];

    var notification_body = {
        'notification': notification,
        'registration': fcm_tokens
    }

    fetch('http://fcm.googleapis.com/fcm/send', {
        'method':"POST",
        'headers':{
            'Authorization' :'key'+'AAAAqlb650Y:APA91bHJFVcl0lRfHTiu0Vh_1-LsHsKVpaGC2CjkzlADaMzZvhgefBbb8PrlyW2oeOYktbFZ8YmvRgQw9SlUvfHPj2glPz5_z4_DE4CP-NJ0EOovMSIcwndyL1PxFTkqt5F_Q7LD2GGG',
            'Content-Type':'application/json'
        },
        'body': JSON.stringify(notification_body)
    }).then(() => {
        res.status(200).send("Notification send success")
    }).catch((err) =>{
        res.status(400).send("Notification send failed")
        console.log(err)
    })

})


module.exports = router