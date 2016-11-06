/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('DetailGroupsCtrl', function ($scope, Groups, Topics, $ionicModal, ChatsGroups, $stateParams) {

  $scope.backToGroups = function () {
    window.history.back();
  };

  // list topics

  var groupId = $stateParams.groupId;
  console.log(groupId);

  // list memebers



  $scope.newTopic = function () {


  };

  ChatsGroups.get('1234567', '123');
  // var listGroup = ChatsGroups.
  $scope.groups = {};
  $scope.groups.name = "I love coffe";

  $scope.topics = Topics.all();

  console.log("Groups detail");
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
