/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('DetailGroupsCtrl', function ($scope, Topics, $ionicModal,
                                                        ChatsGroups, $stateParams, Data) {

  $scope.backToGroups = function () {
    window.history.back();
  };

  var groupId = $stateParams.groupId;

  // list memebers

  // var listGroup = ChatsGroups.
  $scope.groups = {};
  $scope.groups.name = "I love coffe";

  ChatsGroups.getTopicsOfGroup(groupId);
  $scope.topics = ChatsGroups.getAllTopics();

  ChatsGroups.getMemberOfGroups(groupId);
  $scope.members = ChatsGroups.allMemberGroup();

  ChatsGroups.getMemberOfTopic();

  Data.getMemberRecent();

  $scope.topic ={};
  $scope.addTopic = function () {
    var newPostKey = firebase.database().ref('Topics').push().key;
    console.log(groupId);
    // firebase.database().ref('Topics/' + newPostKey).set({
     
    // });
  };

  $ionicModal.fromTemplateUrl('templates/popup/addtopic.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.newTopic = function () {
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
