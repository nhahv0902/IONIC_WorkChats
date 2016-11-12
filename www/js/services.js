angular.module('starter.services', ['firebase'])
  .factory('Data', function ($localStorage, $rootScope, $q, $firebaseArray) {

    $rootScope.data = $localStorage;

    return {
      init: function () {
        if ($localStorage.members == null) {
          $localStorage.members = [];
        }

        if ($localStorage.topics == null) {
          $localStorage.topics = [];
        }

        if ($localStorage.groups == null) {
          $localStorage.groups = [];
        }
        if ($localStorage.message == null) {
          $localStorage.message = [];
        }
        if ($localStorage.memberRecent == null) {
          $localStorage.memberRecent = [];
        }
        if ($localStorage.memberOfTopic == null) {
          $localStorage.memberOfTopic = [];
        }

        if ($localStorage.memberOfGroup == null) {
          $localStorage.memberOfGroup = [];
        }
        if ($localStorage.messageTopic == null) {
          $localStorage.messageTopic = [];
        }
      },

      getMembers: function () {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        var ref = firebase.database().ref().child("Users");
        $localStorage.members = $firebaseArray(ref);
      },

      getTopics: function () {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        $localStorage.topics
          = $firebaseArray
        (firebase.database().ref().child("Topics"));
      },

      getGroups: function () {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        var ref = firebase.database().ref().child("GroupMember");
        $localStorage.groups = $firebaseArray(ref);
      },

      getMessages: function (uId) {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        var ref = firebase.database().ref().child("Messages").child(uId);
        $localStorage.message = $firebaseArray(ref);
      },

      getMemberRecent: function (uId) {
        console.log("getMemberRecent");

        console.log(uId);
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        var ref = firebase.database().ref().child("Messages").child(uId);
        $firebaseArray(ref).$loaded().then(function (snapshot) {
          $localStorage.memberRecent = snapshot;
          $q.when($localStorage.members).then(function (dataMembers) {
            for (var i = 0; i < $localStorage.memberRecent.length; i++) {
              for (var index = 0; index < dataMembers.length; index++) {
                if ($localStorage.memberRecent[i].$id === dataMembers[index].$id) {
                  $localStorage.memberRecent[i].information = dataMembers[index];
                  console.log($localStorage.memberRecent);
                  break
                }
              }
            }
          });
        });
      },

      getMemberOfGroup: function () {
      }
    }
  })


  .factory('Chats', function () {
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
  })

  .factory('Topics', function () {
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
  })

  .factory('ChatsSingle', function ($ionicScrollDelegate, $firebaseArray) {
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
        chats.$loaded().then(function (data) {
          console.log("chat");
          chats = data;
          $ionicScrollDelegate.scrollBottom(true);
        });

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
      }
    }
  })


  .factory('ChatsGroups', function ($ionicScrollDelegate, $firebaseArray,
                                    $q, $localStorage, Data, $firebaseObject) {
      Data.init();
      Data.getMembers();
      var topics = [];

      var membersTopic = [];
      var membersGroup = [];
      var chats = [];


      return {
        chats: function () {
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
        getMemberOfGroups: function (groupId) {

          // get topics of grops
          var ref = firebase.database().ref("GroupMember").child(groupId).child('Members');
          $firebaseArray(ref).$loaded().then(function (data) {

              $q.when($localStorage.members).then(function (dataMembers) {

                for (var i = 0; i < data.length; i++) {
                  for (var index = 0; index < $localStorage.members.length; index++) {
                    if (data[i].$id === dataMembers[index].$id) {
                      membersGroup[i] = dataMembers[index];
                      // console.log(dataMembers[index]);
                      break
                    }
                  }
                }
              });
            }
          );

        },

        getTopicsOfGroup: function (groupId) {
          var ref = firebase.database().ref("GroupMember").child(groupId).child('Topics');
          $firebaseArray(ref).$loaded().then(function (data) {

              $q.when($localStorage.topics).then(function (dataMembers) {

                for (var i = 0; i < data.length; i++) {
                  for (var index = 0; index < dataMembers.length; index++) {
                    if (data[i].$id === dataMembers[index].$id) {
                      topics[i] = dataMembers[index];
                      console.log(dataMembers[index]);
                      break
                    }
                  }
                }
              });
            }
          );
        },

        getMemberOfTopic: function () {

          var refTopic = firebase.database().ref('Topics');
          $firebaseArray(refTopic).$loaded().then(function (data) {
            console.log("getMemberOfTopic");
            console.log(data);

            for (var i = 0; i < data.length; i++) {
              if (data[i].member != null) {
                var members = data[i].member;

                $q.when($localStorage.members).then(function (dataMembers) {
                  for (var i = 0; i < members.length; i++) {
                    for (var index = 0; index < dataMembers.length; index++) {
                      if (members[i] === dataMembers[index].$id) {
                        members[i] = dataMembers[index];
                        break
                      }
                    }
                  }
                  $localStorage.memberOfTopic = data;
                });
              }
            }
          });

        },

        getMessageTopic: function (idTopic) {
          //noinspection JSUnresolvedFunction,JSUnresolvedVariable

          chats = $firebaseArray(firebase.database().ref('MessageTopic').child(idTopic));
          console.log('getMessageTopic');
          console.log(chats);

        },

        send: function (objectMessage, idTopic) {

          chats.$add(objectMessage).then(function (data) {
            console.log("message added");
            console.log(data);
            $ionicScrollDelegate.scrollBottom(true);
          });
        }
      }
    }
  )
;
