/**
 * Created by Nhahv on 10/31/2016.
 */
appControllers.controller('SignInCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $localStorage, $firebaseArray, $firebaseObject) {

	var ref = firebase.database()
		.ref()
		.child("Messages")
		.child('123456789')
		.child('987654321');
	$scope.messages = $firebaseArray(ref);

	$scope.data = $firebaseObject(ref);


	console.log($scope.messages);
	console.log($scope.data);

	$scope.signIn = {};

	$scope.btnSignIn = function () {
		console.log("singIn");

		var email = $scope.signIn.email;
		var password = $scope.signIn.password;

		if(!email || !password) {
			var alertPopup = $ionicPopup.alert({
				template: 'Email or password do not match',
				okText: 'OK'
			});
			return;
		}

		$ionicLoading.show();
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then(function (user) {
				console.log(user);

				$localStorage.user = {};

				var name = user.displayName;
				var email = user.email;
				var photoUrl = user.photoURL;
				var uid = user.uid;

				$localStorage.user = user;
				// $localStorage.user.email = email;
				// $localStorage.user.uid = uid;


				console.log($localStorage.user.uid);
				console.log($localStorage.user.email);

				$ionicLoading.hide();
				$state.go('tab.recent');


			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
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
