var appControllers = angular.module('starter.controllers', ['firebase']); // Use for all controller of application.

appControllers.controller('MainCtrl', function ($scope, $localStorage, Data, ChatsGroups) {
  Data.init();
  Data.getMembers();
  Data.getTopics();
  Data.getGroups();

  if ($localStorage.user != null && $localStorage.user.uid != null) {
    Data.getMemberRecent($localStorage.user.uid);
  }

  Data.getMemberOfGroup();
  ChatsGroups.getMemberOfTopic();
});
appControllers.controller('MembersCtrl', function ($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
});


appControllers.controller('AccountCtrl', function ($scope, $ionicModal) {
  $scope.change = {};
  //noinspection JSUnresolvedVariable,JSUnresolvedFunction
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $scope.change.useremail = user.email;
      $scope.change.userId = user.uid;
      var userId = user.uid;
      //noinspection JSUnresolvedVariable,JSUnresolvedFunction
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
  $scope.resetpass = function () {
    $scope.change.userpassword = '';
  };
  $scope.saveChange = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      //chage email
      user.updateEmail($scope.change.useremail).then(function () {
        // Update successful.
      }, function (error) {
        // An error happened.
      });
      //change password
      if ($scope.change.userpassword) {
        user.updatePassword($scope.change.userpassword).then(function () {
          // Update successful.
        }, function (error) {
          // An error happened.
        })
      }

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

