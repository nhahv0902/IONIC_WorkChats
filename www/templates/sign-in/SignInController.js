/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('SignInCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $localStorage, $firebaseAuth, Data) {

  $scope.signIn = {};

  $scope.btnSignIn = function () {
    console.log("singIn");

    var email = $scope.signIn.email;
    var password = $scope.signIn.password;

    if (!email || !password) {
      var alertPopup = $ionicPopup.alert({
        template: 'Email or password do not match',
        okText: 'OK'
      });
      return;
    }

    $ionicLoading.show({
      template: 'Signing In...'
    });

    //noinspection JSUnresolvedFunction
    $firebaseAuth().$signInWithEmailAndPassword(email, password)
      .then(function (user) {

        $localStorage.user = user;
        Data.getMessages(user.uid);
        Data.getMemberRecent(user.uid);
        console.log($localStorage.user.uid);
        $ionicLoading.hide();
        $state.go('tab.recent');


      })
      .catch(function () {
        var myPopup = $ionicPopup.show({
          title: 'Sign in  fault',
          subTitle: 'Email  or password do not match',
          buttons: [{
            text: '<b>Ok</b>',
            type: 'button-positive',
            onTap: function (e) {
              myPopup.close();
            }
          }]
        });
        $ionicLoading.hide();
      });
  };
});
