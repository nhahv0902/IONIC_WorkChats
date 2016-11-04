var appControllers = angular.module('starter.controllers', []); // Use for all controller of application.


appControllers.controller('MembersCtrl', function ($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
});

appControllers.controller('ChatDetailCtrl', function ($rootScope, $localStorage, $scope, $stateParams, ChatsSingle, Chats, $ionicScrollDelegate) {

  $scope.historyBack = function () {
    window.history.back();
  };

  $scope.chat = {};
  $scope.chat.name = "hoang Van Nha";
  $scope.idSend = "123456789";
  var idReceiver = $stateParams.chatId;
  if (idReceiver === "123456789") {
    $scope.idSend = "987654321";
  }


  $scope.chatList = [];
  var keyMessage = "Messages";

  var date = new Date();

  var url = keyMessage + '/' + $scope.idSend + '/' + idReceiver;
  var urlReceiver = keyMessage + '/' + idReceiver + '/' + $scope.idSend;

  $ionicScrollDelegate.scrollBottom(true);


  ChatsSingle.get($scope.idSend, idReceiver);
  $scope.chatList = ChatsSingle.all();

  console.log($scope.chatList);
  $scope.sendChat = function (chatText) {

    var time = date.getTime();
    var objectMessage = {

      time: time,
      idSend: $scope.idSend,
      idReceiver: idReceiver,
      text: chatText
    };

    ChatsSingle.send(objectMessage);
    /*
     var key = firebase.database()
     .ref()
     .child(url)
     .push()
     .key;

     firebase.database()
     .ref()
     .child(url + '/' + key)
     .set(objectMesaage, function (error) {
     if(error) {
     console.log("write date error");
     } else {

     firebase.database()
     .ref()
     .child(urlReceiver + '/' + key)
     .set(objectMesaage, function (error) {
     if(error) {
     console.log("write date error");
     } else {
     console.log("write date success");
     }
     });

     }
     });

     */
  };
});

appControllers.controller('AccountCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


appControllers.controller('GroupsCtrl', function ($scope, Groups) {
  console.log("Groups");
  $scope.groups = Groups.all();

  for (item of $scope.groups) {
    console.log(item.id);
  }
});
