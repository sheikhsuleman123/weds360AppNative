/**


const fcmToken = await firebase.messaging().getToken();
 
const enabled = await firebase.messaging().hasPermission();
if (enabled) {
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
       
      const localNotification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle(notification._title)
      .setBody(notification._body)
      .setSound('default')
      .android.setChannelId('channelId');
      firebase.notifications().displayNotification(localNotification)
  });
} else {
}
*/

import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

const Notifications = {
    // Setup FCM Token
    async initialLoad() {
        firebase.messaging().requestPermission();
        this.setFCMToken();
    },

    // Add the FCMToken to the user in the server
    async setFCMToken() {
      const fcmToken = await firebase.messaging().getToken();
       
    },


    // onNotification event listener
    onNotification(notification) {
      // Process your notification as required
      const localNotification = new firebase.notifications.Notification()
      .setNotificationId('notificationId')
      .setTitle(notification._title)
      .setBody(notification._body)
      .setSound('default')
      .android.setChannelId('channelId');
      firebase.notifications().displayNotification(localNotification);
    },

    // Set the Listeners
    async setListeners() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.notificationListener = firebase.notifications()
        .onNotification(notification => this.onNotification(notification));
      }
    }
};

module.exports = Notifications;
