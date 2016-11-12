angular.module('starter.services', ['firebase'])

  .factory('Data', function ($localStorage, $rootScope, $q, $firebaseArray, $firebaseObject) {

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

        if ($localStorage.account == null) {
          $localStorage.account = {};
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

      getMemberOfGroup: function (groupId) {
        var ref = firebase.database().ref('GroupMember').child(groupId).child('Members');

        $firebaseArray(ref).$loaded().then(function (data) {
          if (data.length <= 0) {
            return;
          }

          $q.when($localStorage.members).then(function () {
            var members = [];
            for (var i = 0; i < data.length; i++) {
              for (var index = 0; index < $localStorage.members.length; index++) {
                if (data[i].$id == $localStorage.members[index].$id) {
                  members[i] = $localStorage.members[index];
                  break;
                }
              }
            }
            $localStorage.memberOfGroup = members;
            console.log($localStorage.memberOfGroup);
          });


        })
      },

      getInformation: function (uId) {
        $localStorage.account = $firebaseObject(firebase.database().ref('Users').child(uId));
        console.log('getInformation');
        console.log($localStorage.account);
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


  .factory('ChatsGroups', function ($ionicScrollDelegate, $firebaseArray, $q, $localStorage, Data) {
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
