// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage', 'ngCordova', 'ngMaterial', 'ionicMultipleViews', 'firebase']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgoXpAj3fUnKZsD3vlg-iIpGpDdt2MOno",
    authDomain: "work-chats.firebaseapp.com",
    databaseURL: "https://work-chats.firebaseio.com",
    storageBucket: "work-chats.appspot.com",
    messagingSenderId: "160034864745"
  };
  firebase.initializeApp(config);
});

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider


    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      // onEnter: function ($state, Auth) {
      // 	if(!Auth.isLoggedIn) {
      // 		$state.go('login');
      // 	}
      // }
    })


    .state('tab.members', {
      url: '/members',
      views: {
        'tab-members': {
          templateUrl: 'templates/tab-member.html',
          controller: 'MembersCtrl'
        }
      }
    })
    //

    .state('tab.groups', {
      url: '/groups',
      views: {
        'tab-groups': {
          templateUrl: 'templates/tab-groups.html',
          controller: 'GroupsCtrl'
        }
      }
    })


    .state('tab.groups-detail', {
      url: '/groups/:groupId',
      views: {
        'tab-groups': {
          templateUrl: 'templates/detail-groups/detail-groups.html',
          controller: 'DetailGroupsCtrl'
        }
      }
    })

    .state('tab.chat-user', {
      url: '/chats/:chatId',
      views: {
        'tab-recent': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }

    })
    .state('tab.chat-member', {
      url: '/chatMember/:chatId',
      views: {
        'tab-members': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }

    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('change', {
      url: '/account',
      templateUrl: 'templates/popup/change.html',
      controller: 'AccountCtrl'
    })
    .state('singIn', {
      url: '/signIn',
      templateUrl: 'templates/sign-in/sign-in.html',
      controller: 'SignInCtrl'
    })

    .state('singUp', {
      url: '/signUp',
      templateUrl: 'templates/sign-up/sign-up.html',
      controller: 'SignUpCtrl'
    })


    .state('forgotPassword', {
      url: '/forgotPassword',
      templateUrl: 'templates/forgot-password/forgot-password.html',
      controller: 'ForgotPasswordCtrl'
    })


    // message

    // Each tab has its own nav history stack:


    .state('tab.recent', {
      url: '/recent',
      views: {
        'tab-recent': {
          templateUrl: 'templates/tab-recent/tab-recent.html',
          controller: 'RecentCtrl',
        }
      }
    })

    .state('messages', {
      url: '/messages',
      templateUrl: 'templates/multiple-view/messages.html',
      controller: 'MessageListCtrl'
    })

    .state('viewMessage', {
      url: '/messages/:messageId',
      templateUrl: 'templates/multiple-view/view-message.html',
      controller: 'ViewMessageCtrl'
    })

    .state('masterDetail', {
      url: '/masterDetail',
      templateUrl: 'templates/multiple-view/master-detail-layout.html',
      abstract: true
    })

    .state('masterDetail.messages', {
      url: '/messages/:groupId',
      views: {
        'message-list': {
          templateUrl: 'templates/multiple-view/messages.html',
          controller: 'MessageListCtrl'
        },

        'view-message': {
          templateUrl: 'templates/multiple-view/view-message.html',
          controller: 'ViewMessageCtrl'
        }
      }
    })

  ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signIn');
  // $urlRouterProvider.otherwise('/masterDetail/messages');
});
