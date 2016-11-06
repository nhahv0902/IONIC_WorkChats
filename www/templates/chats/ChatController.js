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
    $scope.idSend = "123456789";
    var idReceiver = $stateParams.chatId;
    if (idReceiver === "123456789") {
      $scope.idSend = "987654321";
    }
    var keyMessage = "Messages";

    var date = new Date();

    $ionicScrollDelegate.scrollBottom(true);
    ChatsSingle.get($scope.idSend, idReceiver);
    $scope.chatList = ChatsSingle.all();
    ChatsSingle.getIndex(1);

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
    };
  });
