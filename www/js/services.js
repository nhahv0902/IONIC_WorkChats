var appServices = angular.module('starter.services', []); // Use for all service of application.

appServices.factory('Chats', function () {
	// Might use a resource here that returns a JSON array
	// Some fake testing data
	var chats = [{
			id: "123456789",
			friendType: "Messenger",
			name: "felix",
			face: 'img/user01.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active today"
            },
		{
			id: "987654321",
			friendType: "facebook",
			name: "Eric",
			face: 'img/user02.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active 1h ago"
            },
		{
			id: "3",
			name: "Apple",
			friendType: "Messenger",
			face: 'img/user03.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active today"
            },
		{
			id: "213",
			name: "Diamond",
			friendType: "Messenger",
			face: 'img/user04.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active 3m ago"
            },
		{
			id: "5",
			name: "Mike",
			friendType: "facebook",
			face: 'img/user05.jpg',
			email: 'hi@weburner.com',
			activeTime: "Active today"
            }];

	return {
		all: function () {
			return chats;
		},
		remove: function (chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function (chatId) {
			for(var i = 0; i < chats.length; i++) {
				if(chats[i].id === parseInt(chatId)) {
					return chats[i];
				}
			}
			return null;
		}
	};
});


appServices.factory('Firebase', function () {

	var message = "Messages";
	var account = "Accounts";
	var topic = "Topics";

	return {
		keyMessage: function () {
			return message;
		},
		keyAccount: function () {
			return account;
		},
		keyTopic: function () {
			return topic;
		}
	}
});

appServices.factory('Groups', function () {
	var rooms = [
		{
			id: "room_a",
			roomType: "group",
			thumbnail: "img/thumbnail01.jpg",
			title: "I Love Coffee",
			members: "Felix, Eric, Diamond",
			activeTime: "Active today",
			userList: ["213", "1", "2"]
            },
		{
			id: "room_b",
			roomType: "group",
			thumbnail: "img/thumbnail02.jpg",
			title: "Go shopping",
			members: "Eric, Apple, Diamond",
			activeTime: "Active today",
			userList: ["2", "3", "213"]
            },
		{
			id: "room_c",
			roomType: "ms_friend",
			thumbnail: "img/user01.jpg",
			title: "felix",
			members: "Felix, Diamond",
			activeTime: "Active 1h ago",
			userList: ["213", "1"]
            },
		{
			id: "room_d",
			roomType: "fb_friend",
			thumbnail: "img/user02.jpg",
			title: "Eric",
			members: "Eric, Diamond",
			activeTime: "Active 1h ago",
			userList: ["213", "2"]
            },
		{
			id: "room_e",
			roomType: "group",
			thumbnail: "img/thumbnail03.jpg",
			title: "Ionic",
			members: "Eric, Apple, Mike, Diamond",
			activeTime: "11:00 am",
			userList: ["2", "3", "5", "213"]
            },
		{
			id: "room_f",
			roomType: "group",
			thumbnail: "img/thumbnail04.jpg",
			title: "Rockers",
			members: "felix, Eric, Diamond, Mike",
			activeTime: "12:15 am",
			userList: ["1", "2", "213", "5"]
            }
        ];
	return {
		all: function () {
			return rooms;
		}
	}
});
