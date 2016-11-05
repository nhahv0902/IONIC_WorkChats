var appServices = angular.module('starter.services', ['firebase']); // Use for all service of application.

appServices.factory('Chats', function () {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var chats = [{
    id: "123456789",
    friendType: "Messenger",
    name: "felix",
    face: 'img/user01.jpg',
    email: 'hi@weburner.com',
    activeTime: "Active today"
  }, {
    id: "987654321",
    friendType: "facebook",
    name: "Eric",
    face: 'img/user02.jpg',
    email: 'hi@weburner.com',
    activeTime: "Active 1h ago"
  }, {
    id: "3",
    name: "Apple",
    friendType: "Messenger",
    face: 'img/user03.jpg',
    email: 'hi@weburner.com',
    activeTime: "Active today"
  }, {
    id: "213",
    name: "Diamond",
    friendType: "Messenger",
    face: 'img/user04.jpg',
    email: 'hi@weburner.com',
    activeTime: "Active 3m ago"
  }, {
    id: "5",
    name: "Mike",
    friendType: "facebook",
    face: 'img/user05.jpg',
    email: 'hi@weburner.com',
    activeTime: "Active today"
  }];

  return {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


appServices.factory('Firebase', function () {

  var message = "Messages";
  var account = "Users";
  var topic = "Topics";

  return {
    keyMessage: function () {
      return message;
    },
    keyAccount: function () {
      return account;
    },
    keyTopic: function () {
      return topic;
    },
    saveUser: function (user, uid) {

      firebase.database()
        .ref()
        .child(account + "/" + uid)
        .set({
          address: user.address,
          name: user.name,
          phone: user.phone,
          sex: user.sex
        });

    }
  }
});

appServices.factory('Groups', function ($firebaseArray) {
  var groups = [];

  return {
    all: function () {
      return groups;
    },
    get: function () {
      var ref = firebase.database().ref("GroupMember");
      ref.on('value', function (snapshot) {
        console.log(snapshot);
        for (var i = 0; i < snapshot.length; i++) {
          console.log(snapshot[i].key);

        }
      });
    }
  }
});

appServices.factory('Topics', function () {
  var rooms = [{
    id: "topic_1",
    roomType: "group",
    thumbnail: "img/thumbnail01.jpg",
    name: "I Love Coffee",
    members: "Felix, Eric, Diamond",
    activeTime: "Active today",
    userList: ["213", "1", "2"]
  }, {
    id: "topic_2",
    roomType: "group",
    thumbnail: "img/thumbnail02.jpg",
    name: "Go shopping",
    members: "Eric, Apple, Diamond",
    activeTime: "Active today",
    userList: ["2", "3", "213"]
  }, {
    id: "topic_3",
    roomType: "ms_friend",
    thumbnail: "img/user01.jpg",
    name: "felix",
    members: "Felix, Diamond",
    activeTime: "Active 1h ago",
    userList: ["213", "1"]
  }, {
    id: "topic_4",
    roomType: "fb_friend",
    thumbnail: "img/user02.jpg",
    name: "Eric",
    members: "Eric, Diamond",
    activeTime: "Active 1h ago",
    userList: ["213", "2"]
  }, {
    id: "topic_5",
    roomType: "group",
    thumbnail: "img/thumbnail03.jpg",
    title: "Ionic",
    members: "Eric, Apple, Mike, Diamond",
    activeTime: "11:00 am",
    userList: ["2", "3", "5", "213"]
  }, {
    id: "topic_6",
    roomType: "group",
    thumbnail: "img/thumbnail04.jpg",
    title: "Rockers",
    members: "felix, Eric, Diamond, Mike",
    activeTime: "12:15 am",
    userList: ["1", "2", "213", "5"]
  }];
  return {
    all: function () {
      return rooms;
    }
  }
});

appServices.factory('MessageService', function () {

  var messages = [{
    id: 0,
    senderName: 'Joe',
    subject: 'Hi there!',
    content: 'Let\'s meet for dinner today! Please?',
    avatar: 'http://ionicframework.com/img/docs/venkman.jpg'
  }, {
    id: 1,
    senderName: 'Twitch.tv',
    subject: 'Live stream today',
    content: 'We\'re gonna go full stream at 20:00. Make sure to be there!',
    avatar: 'http://ionicframework.com/img/docs/stantz.jpg'
  }, {
    id: 2,
    senderName: 'eBay',
    subject: 'Free shipping on branded cameras',
    content: 'Good news! Starting December 20th, we will start shipping branded cameras!',
    avatar: 'http://ionicframework.com/img/docs/spengler.jpg'
  }, {
    id: 3,
    senderName: 'PayPal',
    subject: 'Payment received from joe@gmail.com',
    content: 'To see all transaction details, please log into your account.',
    avatar: 'http://ionicframework.com/img/docs/winston.jpg'
  }, {
    id: 4,
    senderName: 'Tully',
    subject: 'Dogs!',
    content: 'Who brought the dog?!',
    avatar: 'http://ionicframework.com/img/docs/tully.jpg'
  }, {
    id: 5,
    senderName: 'Dana',
    subject: 'I am The Gatekeeper!',
    content: 'yes, yes I am!',
    avatar: 'http://ionicframework.com/img/docs/barrett.jpg'
  }, {
    id: 6,
    senderName: 'Slimer',
    subject: 'Need help!',
    content: 'Can you please help me with this thing?',
    avatar: 'http://ionicframework.com/img/docs/slimer.jpg'
  }, {
    id: 7,
    senderName: 'Jordan',
    subject: 'What\'s up?',
    content: 'We haven\'t met for years!',
    avatar: 'http://ionicframework.com/img/docs/venkman.jpg'
  }, {
    id: 8,
    senderName: 'Joe',
    subject: 'I like trains',
    content: 'Trains are awesome. I like trains.',
    avatar: 'http://ionicframework.com/img/docs/spengler.jpg'
  }, {
    id: 9,
    senderName: 'PayPal',
    subject: 'Payment received from joe@gmail.com',
    content: 'To see all transaction details, please log into your account.',
    avatar: 'http://ionicframework.com/img/docs/winston.jpg'
  }, {
    id: 10,
    senderName: 'eBay',
    subject: 'Free shipping on branded cameras',
    content: 'Good news! Starting December 20th, we will start shipping branded cameras!',
    avatar: 'http://ionicframework.com/img/docs/spengler.jpg'
  },];

  return {
    all: function () {
      return messages;
    },
    get: function (messageId) {
      // Simple index lookup
      return messages[messageId];
    }
  }
});


appServices.factory('ChatsSingle', function ($ionicScrollDelegate, $firebaseArray) {

  var chats = [];
  var chats2 = [];

  return {
    all: function () {
      return chats;
    },
    get: function (idSend, idReceiver) {

      var ref = firebase.database()
        .ref("Messages/" + idSend + "/" + idReceiver);

      chats = $firebaseArray(ref);

      $ionicScrollDelegate.scrollBottom(true);

      var ref2 = firebase.database()
        .ref()
        .child("Messages")
        .child(idReceiver)
        .child(idSend);
      chats2 = $firebaseArray(ref2);
    },
    send: function (objectMessage) {
      chats.$add(objectMessage).then(function (data) {
        if (data) {
          chats2.$add(objectMessage);
          console.log("message added");
          $ionicScrollDelegate.scrollBottom(true);
        }
      })
    },
    getIndex: function (position) {

      var ref = firebase.database()
        .ref();

      var list = [];
      list = $firebaseArray(ref);
      console.log(list);
    }
  }
});


appServices.factory('ChatsGroups', function ($ionicScrollDelegate, $firebaseArray) {


  var topics = [];
  var membersTopic = [];
  var membersGroup = [];
  var chats = [];

  return {
    allChats: function () {
      return chats;
    },
    allMemberTopic: function () {
      return membersTopic;
    },
    allMemberGroup: function () {
      return membersGroup;
    },
    getAllTopics: function () {
      return topics;
    },
    get: function (groupId, topicId) {

      // get topics of grops
      var ref = firebase.database().ref("GroupMember").child(groupId);

      ref.child("Topics").on('value', function (snapshot) {
        for (var i = 0; i < data.length; i++) {
          console.log(snapshot[i].val());
          firebase.database().ref("Topics").child(snapshot[i].val()).on('value', function (data) {
            topics[i] = data.val();
            console.log(topics[i]);
          });
        }
      });


      ref.child("Members").on('value', function (snapshot) {
        for (var i = 0; i < data.length; i++) {
          console.log(snapshot[i].val());
          firebase.database().ref("Users").child(snapshot[i].val()).on('value', function (data) {
            membersGroup[i] = data[i].val();
            console.log(membersGroup[i]);
          });
        }
      });
    },


    send: function (objectMessage) {
      chats.$add(objectMessage).then(function (data) {
        if (data) {
          chats2.$add(objectMessage);
          $ionicScrollDelegate.scrollBottom(true);
        }
      })
    }
  }
});
