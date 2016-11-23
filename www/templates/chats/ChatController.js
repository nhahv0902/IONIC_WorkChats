/**
 * Created by Nhahv on 11/6/2016.
 */
appControllers.controller('ChatDetailCtrl',
  function ($rootScope, $localStorage, $scope, $stateParams, ChatsSingle, $ionicScrollDelegate) {

    $scope.historyBack = function () {
      window.history.back();
    };

    $scope.chat = {};
    $scope.chat.name = "hoang Van Nha";
    $scope.idSend = $localStorage.user.uid;
    var idReceiver = $stateParams.chatId;

    console.log($scope.idSend);
    console.log(idReceiver);
    // if (idReceiver === "123456789") {
    //   idReceiver = "qFivPT4dnhcdJfGZwpsgIYVlIE73";
    // } else {
    //   idReceiver = "nFtxMfo3pXbsF73SsnVqedkNlso2";
    //   $scope.idSend = "qFivPT4dnhcdJfGZwpsgIYVlIE73";
    // }

    var information = $localStorage.account;


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
        text: chatText,
        avatar: information.avatar
      };

      ChatsSingle.send(objectMessage);
    };
  });
