var appControllers = angular.module('starter.controllers', []); // Use for all controller of application.


appControllers.controller('MembersCtrl', function ($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
});

appControllers.controller('ChatDetailCtrl', function ($rootScope, $localStorage, $scope, $stateParams,
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


  $scope.chatList = [];
  var keyMessage = "Messages";

  var date = new Date();

  var url = keyMessage + '/' + $scope.idSend + '/' + idReceiver;
  var urlReceiver = keyMessage + '/' + idReceiver + '/' + $scope.idSend;

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

appControllers.controller('AccountCtrl', function ($scope, $ionicModal) {
  $scope.change = {};
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $scope.change.useremail = user.email;
      $scope.change.userId = user.uid;
      var userId = user.uid;
      return firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
        $scope.change.userphone = snapshot.val().phone;
        $scope.change.usersex = snapshot.val().sex;
        $scope.change.useraddress = snapshot.val().address;
        $scope.change.username = snapshot.val().name;
      });
    } else {
      console.log('not log in');
    }
  });

  $scope.saveChange = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      //alert($scope.change.useremail);
      user.updateEmail($scope.change.useremail).then(function () {
        // Update successful.
      }, function (error) {
        // An error happened.
      });
    });
    firebase.database().ref('Users/' + $scope.change.userId).set({
      name: $scope.change.username,
      sex: $scope.change.usersex,
      phone: $scope.change.userphone,
      address: $scope.change.useraddress
    });
    $scope.closeModal();
  };

  $ionicModal.fromTemplateUrl('templates/popup/change.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });
});

appControllers.controller('GroupsCtrl', function ($scope, Groups) {
  $scope.groups = [];

  var ref = firebase.database().ref("GroupMember");
  ref.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      console.log(childKey);
      console.log(childData.infomation);

      $scope.groups.push(childData.infomation);
      // ...
    });
  });
});
