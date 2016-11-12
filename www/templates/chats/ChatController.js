/**
 * Created by Nhahv on 11/6/2016.
 */
appControllers.controller('ChatDetailCtrl',
  function ($rootScope, $localStorage, $scope, $stateParams,
            ChatsSingle, Chats, $ionicScrollDelegate, $firebaseArray) {

    $scope.historyBack = function () {
      window.history.back();
    };

    $scope.chat = {};
    $scope.chat.name = "hoang Van Nha";
    $scope.idSend = $localStorage.user.uid;
    var idReceiver = $stateParams.chatId;
    if (idReceiver === "123456789") {
      idReceiver = "qFivPT4dnhcdJfGZwpsgIYVlIE73";
    } else {
      idReceiver = "nFtxMfo3pXbsF73SsnVqedkNlso2";
      $scope.idSend = "qFivPT4dnhcdJfGZwpsgIYVlIE73";
    }


    $ionicScrollDelegate.scrollBottom(true);
    ChatsSingle.get($scope.idSend, idReceiver);
    $scope.chatList = ChatsSingle.all();

    console.log($scope.chatList);
    $scope.sendChat = function (chatText) {
      var time = (new Date()).getTime();
      var objectMessage = {

        time: time,
        idSend: $scope.idSend,
        idReceiver: idReceiver,
        text: chatText
      };

      ChatsSingle.send(objectMessage);
    };
  });
