/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('SignUpCtrl', function ($scope, $ionicPopup, $timeout, $mdDialog, $state, $ionicLoading, $ionicPopup) {

    console.log($mdDialog);
    $scope.signUp = {};

    $scope.btnSignUp = function () {

        console.log("sign Up");
        var email = $scope.signUp.email;
        var password = $scope.signUp.password;
        var confirmPassword = $scope.signUp.confirmPassword;

        if (!email || !password || !confirmPassword) {
            var alertPopup = $ionicPopup.alert({
                template: 'Email do not',
                okText: 'OK'
            });
            return;
        }

        if (password !== confirmPassword) {
            var alertPopup = $ionicPopup.alert({
                template: 'password do not match',
                okText: 'OK'
            });
            return;
        }

        $ionicLoading.show();
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                if (user) {
                    console.log(user);
                    $state.go('singIn');
                    $ionicLoading.hide()
                }
            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                console.log(error);
                $ionicLoading.hide()
                var myPopup = $ionicPopup.show({
                    title: 'Sign up account fault',
                    subTitle: 'Email had exists',
                    buttons: [{
                        text: '<b>Ok</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                        }
                    }]
                });
            });
    }
});
