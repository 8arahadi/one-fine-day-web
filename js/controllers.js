angular.module('starter.controllers', ['ngCordova','ionic'])

.controller('LoginCtrl', function($scope, $window, LoginService, $ionicPopup, $ionicLoading, $state) {
	$scope.data = {};

	$scope.login = function() {
		$ionicLoading.show({
			content: 'Login...',
			animation: 'fade-in',
			showBackdrop: true,
		});
		if($scope.data.username==""){
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please fill your employee ID'
			});
		}
		else if($scope.data.username!=""){
			LoginService.loginUser($scope.data.username).success(function(data) {
				var loginResult = data;
				$ionicLoading.hide();
				localStorage.setItem("idNumber",$scope.data.username);
				localStorage.setItem("bbg_custMobile_loginEmail", $scope.data.username);
				localStorage.setItem("bbg_custMobile_loginToken", "fakyuuuuuuuuuuuuuuuu");
				$state.go('app.timeline');

			}).error(function(data) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Login Failed!',
					template: 'Your employee ID is not in our database'
				});
			});
		}
		else{
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Login Failed!',
				template: 'Please fill your employee ID'
			});
		}
	}
})

.controller('MainCtrl', function($scope, SideMenu, $ionicPopup, $ionicTabsDelegate, $ionicPopover, $state) {
	if(localStorage.getItem("idNumber")==null || localStorage.getItem("idNumber")==""){
		$state.go('login');
	}
	// SideMenu.getProfile(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		$scope.menuprofile = {};
		$scope.menuprofile.name = "Ibam";
		$scope.menuprofile.email_customer = localStorage.getItem("bbg_custMobile_loginEmail");
	// }).error(function(data) {
	// 	console.log('error di menu controller')
	// });
	$scope.back = function(){
		$state.go('app.timeline');
	}
	$scope.logout = function(){
		$scope.popover.hide();
		localStorage.removeItem("idNumber");
		localStorage.removeItem("bbg_custMobile_loginEmail");
		localStorage.removeItem("bbg_custMobile_loginToken");
		localStorage.removeItem("tripState");
		localStorage.removeItem("activeTripId");
		$state.go('login');
	};
	$scope.about = function(){
		$scope.popover.hide();
		$state.go('about');
	}
	$scope.disclaimer = function(){
		$scope.popover.hide();
		$state.go('disclaimer');
	}
	$scope.goForward = function () {
		var selected = $ionicTabsDelegate.selectedIndex();
		if (selected != -1) {
			$ionicTabsDelegate.select(selected + 1);
		}
	}

	$scope.goBack = function () {
		var selected = $ionicTabsDelegate.selectedIndex();
		if (selected != -1 && selected != 0) {
			$ionicTabsDelegate.select(selected - 1);
		}
	}

	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
})

.controller('HomeCtrl', function($scope, $ionicPopup, $ionicLoading) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$ionicLoading.hide();
	$scope.history = {};
	$scope.driver = {};
})
.controller('TimelineCtrl', function($scope, $state, $ionicPopup, $ionicLoading,TimelineService) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$ionicLoading.hide();
	$scope.showTrivia = false;
	$scope.showPoll = false;
	$scope.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
		setTimeout(function (){
			$state.go($state.current, {}, {reload: true});
		}, 500);
	};
	function getCountdown(){
		var oneDay = 24*60*60*1000;
		var firstDate = new Date();
		var secondDate = new Date(2016,02,04);
		$scope.numDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	}
	getCountdown();
	$scope.trivia = {};
	$scope.poll = {};
	TimelineService.getQuestion().success(function(data) {
		$scope.trivia = data[0];
		$scope.poll = data[1];
	}).error(function(data) {
		console.log('Failed get trivia question : ' + data)
	});
	console.log($scope.trivia);
	// function setPoll(question,a,b){
	// 	document.getElementById('poll').innerHTML = "<div class='card'><div class='item'><h2>No Poll Available right now</h2><p>Poll will be available during the event</p></div></div>";
	// }
	
	// function setTrivia(question,a,b,c,d,right_answer){
	// 	document.getElementById('trivia').innerHTML = "<div class='card'><div class='item'><h2>"+question+"</h2><ion-radio ng-model='choice' ng-value='A'>"+a+"</ion-radio><ion-radio ng-model='choice' ng-value='B'>"+b+"</ion-radio><ion-radio ng-model='choice' ng-value='C'>"+c+"</ion-radio><ion-radio ng-model='choice' ng-value='D'>"+d+"</ion-radio></div></div>";
	// }
})
.controller('EventCtrl', function($scope, $ionicPopup, $ionicLoading, $state) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$ionicLoading.hide();
	$scope.openMaps = function(){
		$state.go('maps');
	}
	$scope.openRundown = function(){
		$state.go('rundown');
	}
	$scope.openNeeds = function(){
		$state.go('needs');
	}
	$scope.openGroup = function(){
		$state.go('group');
	}
	$scope.back = function(){
		$state.go('app.event');
	}
})
.controller('FAQCtrl', function($scope, $ionicPopup, $ionicLoading) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$ionicLoading.hide();
	var intro = "Hello, my name is Gunawan Susanto. Your head must be full of question right now so Feel free to ask me a question above and I will answer it for you.";
	var answer1 = "One Fine Day is IBM ID and JTI kickoff event. We will watch overall 2015 company performance, see 2016 directions, and I will announce IBM Innovation Day in order to fill 2016 with creativity and crazy ideas.";
	var answer2 = "Because I guarantee you to have 85% fun with specially arranged games and team building activities to be enjoyed across the evening and free mouth watering dine at Bandar Djakarta";
	var answer3 = "The event will be located at Ancol Ecopark & Bandar Djakarta. You can see further information in the event tab";
	var answer4 = "As long as you are IBM ID & JTI employee or our beloved contractors, I expect you to join this event"
	var answer5 = "There is bus from-and-to Ancol specially prepared for you, just come to Sinarmas Parking Lot (EX Parking Lot) at 13.00 WIB. You can also bring your own transport and meet at Ancol Ecopark"
	$scope.ask = function(id){
		if(id == 1){
			document.getElementById('answer').innerHTML = answer1;
		}
		else if(id == 2){
			document.getElementById('answer').innerHTML = answer2;
		}
		else if(id == 3){
			document.getElementById('answer').innerHTML = answer3;
		}
		else if(id == 4){
			document.getElementById('answer').innerHTML = answer4;
		}
		else if(id == 5){
			document.getElementById('answer').innerHTML = answer5;
		}
		else{
			document.getElementById('answer').innerHTML = intro
		}
	}
})
.controller('PhotoCtrl', function($scope, $state, $ionicPopup, $ionicLoading, PhotoService) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$ionicLoading.hide();
	$scope.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
		setTimeout(function (){
			$state.go($state.current, {}, {reload: true});
		}, 500);
	};
	$scope.photos = {};
	PhotoService.getStream("Watson").success(function(data) {
		$scope.photos = data.result;
		for(var i = 0; i < $scope.photos.length; i++){
			$scope.photos[i].src = $scope.photos[i].imagelink;
			$scope.photos[i].sub = $scope.photos[i].tweet;
			delete $scope.photos[i].imagelink;
			delete $scope.photos[i].tweet;
			delete $scope.photos[i].date;
			delete $scope.photos[i].userid;
			delete $scope.photos[i].username;
		}
	}).error(function(data) {
		console.log('Failed get photo stream : ' + data)
	});
})
.controller('GroupCtrl', function($scope, $ionicPopup, $ionicLoading, $state, $ionicFilterBar) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$ionicLoading.hide();
	$scope.back = function(){
		$state.go('app.event');
	}

	var filterBarInstance;
	$scope.groupData = [ 
	{ groupNumber:'1' , groupMember:[
	{name:'Adi'},
	{name:'Budi'},
	{name:'Cica'}
	]},
	{ groupNumber:'2' , groupMember:[
	{name:'James'},
	{name:'Jason'},
	{name:'Jonathan'}
	]},
	{ groupNumber:'3' , groupMember:[
	{name:'Ibam'},
	{name:'Indra'},
	{name:'Insap'}
	]}
	];
	$scope.showFilterBar = function () {
		filterBarInstance = $ionicFilterBar.show({
			items: $scope.groupData,
			update: function (filteredItems, filterText) {
				$scope.groupData = filteredItems;
				if (filterText) {
					console.log(filterText);
				}
			}
		});
	};
	
})
.controller('MapsCtrl', function($scope, $ionicPopup, $ionicLoading, $state) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$scope.back = function(){
		$state.go('app.event');
	}
	$ionicLoading.hide();

	/*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
   $scope.toggleGroup = function(group) {
   	if ($scope.isGroupShown(group)) {
   		$scope.shownGroup = null;
   	} else {
   		$scope.shownGroup = group;
   	}
   };
   $scope.isGroupShown = function(group) {
   	return $scope.shownGroup === group;
   };

   var plaza = {lat: -6.1928645, lng: 106.822048};
   var initialLocation = plaza;
   var ancolEcopark = {lat: -6.127501, lng: 106.837369};

   var map = new google.maps.Map(document.getElementById('map'), {
   	center: plaza,
   	scrollwheel: false,
   	zoom: 16
   });

   if(navigator.geolocation) {
   	browserSupportFlag = true;
   	navigator.geolocation.getCurrentPosition(function(position) {
   		initialLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
   		map.setCenter(initialLocation);
   		var directionsDisplay = new google.maps.DirectionsRenderer({
   			map: map
   		});
   		var request = {
   			destination: ancolEcopark,
   			origin: initialLocation,
   			travelMode: google.maps.TravelMode.DRIVING
   		};
   		var directionsService = new google.maps.DirectionsService();
   		directionsService.route(request, function(response, status) {
   			if (status == google.maps.DirectionsStatus.OK) {
   				directionsDisplay.setDirections(response);
   			}
   		});
   	}, function() {
   		map.setCenter(plaza);
   		var request = {
   			destination: ancolEcopark,
   			origin: plaza,
   			travelMode: google.maps.TravelMode.DRIVING
   		};
   		var directionsService = new google.maps.DirectionsService();
   		directionsService.route(request, function(response, status) {
   			if (status == google.maps.DirectionsStatus.OK) {
   				directionsDisplay.setDirections(response);
   			}
   		});
   	});
   }
   else {
   	map.setCenter(plaza);
   	var request = {
   		destination: ancolEcopark,
   		origin: plaza,
   		travelMode: google.maps.TravelMode.DRIVING
   	};

   	var directionsService = new google.maps.DirectionsService();
   	directionsService.route(request, function(response, status) {
   		if (status == google.maps.DirectionsStatus.OK) {
   			directionsDisplay.setDirections(response);
   		}
   	});
   }
})


.controller('ProfileCtrl', function($scope, $state, $ionicPopup, $ionicLoading, Customer) {
	$scope.profile = {};
	$scope.oldprofile = {};
	
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		//maxWidth: 200,
		//showDelay: 0
	});
	
	Customer.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		$scope.profile = data;
		$scope.profile.password="";
		localStorage.setItem("profile_data", JSON.stringify(data));
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil profil!'
		});
	});
	$scope.editProfile = function(){
		$ionicLoading.show({
			content: 'Updating profile...',
			animation: 'fade-in',
			showBackdrop: true,
		});
		if($scope.profile.password==$scope.profile.password2) {	
			var newData = JSON.parse(localStorage.getItem("profile_data"));
			newData.name = $scope.profile.name;
			newData.address = $scope.profile.address;
			newData.password = $scope.profile.password;
			newData.password2 = $scope.profile.password2;
			newData.phone_number = $scope.profile.phone_number;
			if($scope.profile.password!=""){newData.password = $scope.profile.password;}			
			//Customer.update(localStorage.getItem("bbg_custMobile_loginEmail"), newData.name,newData.address,newData.phone_number,sha3_512(newData.password)).success(function(resp) {
				Customer.update(localStorage.getItem("bbg_custMobile_loginEmail"), newData.name,newData.address,newData.phone_number,newData.password).success(function(resp) {
					if($scope.profile.name != JSON.parse(localStorage.getItem("profile_data")).name){
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Ubah Nama Berhasil',
							template: 'Pengubahan nama berhasil dilakukan'
						});
					}
					else if($scope.profile.password != JSON.parse(localStorage.getItem("profile_data")).password){
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Ubah Alamat Berhasil',
							template: 'Pengubahan alamat berhasil dilakukan'
						});
					}
					else if($scope.profile.phone_number != JSON.parse(localStorage.getItem("profile_data")).phone_number){
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Ubah Nomor Telepon Berhasil',
							template: 'Pengubahan nomor telepon berhasil dilakukan'
						});
					}
					else if($scope.profile.address != $scope.oldprofile.address){
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Ubah Profil Berhasil',
							template: 'Pengubahan alamat berhasil dilakukan'
						});
					}
					else{
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Ubah Profil Berhasil',
							template: 'Pengubahan profil berhasil dilakukan'
						});
					}
				}).error(function(data) {
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: 'Error!',
						template: 'Edit Profile Gagal Dilakukan'
					});
				});
			}
			else {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Password tidak sama',
					template: 'Password yang anda masukkan tidak sama dengan ketik ulang password'
				});
			}
		};

		$scope.logout = function(){
			localStorage.removeItem("bbg_custMobile_loginEmail");
			localStorage.removeItem("bbg_custMobile_loginToken");
			localStorage.removeItem("tripState");
			localStorage.removeItem("activeTripId");
			$state.go('login');
		};
	})

.controller('LoyaltyPointCtrl', function($scope, $ionicPopup, $ionicLoading, LoyaltyPoint) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	LoyaltyPoint.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		$scope.point = data.LoyaltyPoint.loyalty_point_total;
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil daftar loyalty point!'
		});
	});
})

.controller('CallUsCtrl', function($scope, $ionicPopup, $ionicLoading, LoyaltyPoint) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	LoyaltyPoint.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		$scope.point = data.LoyaltyPoint.loyalty_point_total;
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil daftar loyalty point!'
		});
	});
})

.controller('ProfilePaymentCtrl', function($scope, $ionicPopup, $state, $ionicLoading, Wallets) {
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$scope.wallets = {};
	Wallets.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		var temp = {};
		for (var i = 0; i < data.result[0].payment.length; i++) {
			if(data.result[0].payment[i] != null && typeof(data.result[0].payment[i]) != "undefined") {
				temp[i] = data.result[0].payment[i];
				var cnumber = ""+temp[i].card_number;
				temp[i].masked = "xxxx xxxx xxxx " + cnumber.substring(cnumber.length-4,cnumber.length);;
			}
		};
		console.log(temp[0]);
		$scope.wallets = temp;
		//console.log($scope.wallet);
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil daftar pembayaran!'
		});
	});
	$scope.walletType = ["Kartu Kredit", "Kartu Debit", "Voucher Prabayar"];
	$scope.walletTypeData = {};
	$scope.walletTypeData.index = 0;

	$scope.newWallet = {};
	$scope.createWallet = function(){
		$ionicLoading.show({
			content: 'Registering',
			animation: 'fade-in',
			showBackdrop: true,
		});	
		var newData = {};
		newData.payment_name = $scope.newWallet.payment_name;
		newData.payment_type = $scope.walletType[$scope.walletTypeData.index];
		newData.card_number = $scope.newWallet.card_number;
		newData.card_expiry = $scope.newWallet.card_expiry;
		newData.card_ccv = $scope.newWallet.card_ccv;
		Wallets.create(localStorage.getItem("bbg_custMobile_loginEmail"),newData.payment_name,newData.payment_type,newData.card_number,newData.card_expiry,newData.card_ccv).success(function(resp) {
			$ionicLoading.hide();
			console.log(resp);
			var alertPopup = $ionicPopup.alert({
				title: 'Pembuatan Pembayaran Berhasil!',
				template: 'Anda berhasil menambah opsi pembayaran'
			});
			$state.go('app.profile-payment');
		}).error(function(data) {
			console.log(data);
			console.log(newData);
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'ERROR',
				template: 'Harap isi semua form yang disediakan dengan tepat'
			});
		});
	}

})

.controller('ProfileFavLocCtrl', function($scope, $ionicPopup, $ionicLoading, FavLocations) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	FavLocations.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		var temp = {};
		console.log(data.listFavouritePOI.favourite_location);
		for (var i = 0; i < data.listFavouritePOI.favourite_location.length; i++) {
			console.log(data.listFavouritePOI.favourite_location[i]);
			if(data.listFavouritePOI.favourite_location[i] != null && typeof(data.listFavouritePOI.favourite_location[i]) != "undefined") {
				
				temp[i] = data.listFavouritePOI.favourite_location[i];
			}
		};
		$scope.poi = data.listFavouritePOI.favourite_location;
		console.log(temp)
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		console.log('tidak dapat mengambil poi')
	});
})


.controller('TripEndCtrl', function($scope, $window, $ionicPopup, $ionicLoading, Wallets, $state, TripAndReservation, Driver, LoyaltyPoint) {
	$ionicLoading.show({
		content: 'Loading...',
		animation: 'fade-in',
		showBackdrop: true,
	});
	
	$scope.screenState = "WAITPAYMENT";
	$scope.trip;
	$scope.minimumPayment = 40000;
	$scope.surcharge = 0;
	$scope.totalFare;
	//point thingy
	$scope.isUsedPoint = false;
	$scope.usedPoint;
	$scope.totalPoint;
	$scope.pointGained;
	
	$scope.driver;
	$scope.dataRating = {
		rating : 1,
		max: 5,
		comment: ""
	}
	$scope.data = {};
	$scope.walletData = {};
	$scope.walletData.selectedPaymentMethod;
	
	Wallets.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
		$scope.wallets = data.result[0].payment;
		//$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Mohon Maaf!',
			template: 'Mohon maaf jaringan sedang bermasalah. Kami sedang mencoba memperbaiki masalah ini.'
		});
		console.log('tidak dapat mengambil daftar pembayaran');
	});

	$scope.calculateTotalFare = function(){
		var total = $scope.trip.fare + $scope.surcharge;
		$scope.totalFare = total > $scope.minimumPayment?total:$scope.minimumPayment;
		return $scope.totalFare;
	}	
	$scope.updateTotalPoint = function(prevPoint, totalFare){
		var totalPoint = prevPoint;
		$scope.pointGained = totalFare * 0.01;
		$scope.totalPoint = $scope.totalPoint + $scope.pointGained;
		LoyaltyPoint.add(localStorage.getItem("bbg_custMobile_loginEmail"),$scope.pointGained).success(function(data) {

		}).error(function(data) {
			$ionicLoading.hide();
			console.log('tidak dapat menambah loyalty point')
		});
		// console.log('total point' + $scope.totalPoint);
		// console.log('point gained' + $scope.pointGained);
		// console.log('used point' + $scope.usedPoint);
	}
	$scope.checkAndUpdateTrip = function(){
		if(localStorage.getItem("activeTripId")==null || localStorage.getItem("activeTripId")==""){
			$state.go('app.dash');
		}else{
			console.log(localStorage.getItem("activeTripId"));
			TripAndReservation.getTripById(localStorage.getItem("activeTripId")).success(function(resp) {
				console.log(localStorage.getItem("activeTripId"));
				$scope.trip = resp;
				$scope.walletData.selectedPaymentMethod = $scope.trip.payment_method;
				$scope.isTunai = ($scope.walletData.selectedPaymentMethod == "Tunai");
				$scope.totalPoint = $scope.menuprofile.loyalty_point_total;
				$scope.usedPoint = $scope.trip.loyalty_point;
				//update is used point
				$scope.isUsedPoint = ($scope.usedPoint<=0)?true:false;
				$scope.surcharge = $scope.trip.reservation_is_priority=="YES"?10000:0;
				console.log('trip status: '+resp.trip_status);
				if($scope.trip.trip_status != "WAITPAYMENT" && $scope.trip.trip_status != "WAITRATE") {
					console.log(localStorage.getItem("activeTripId"));
					localStorage.setItem('tripState',resp.trip_status);
					$state.go('app.dash');
				}
				else{
					Driver.getDriverById(resp.id_driver).success(function(drvResp) {
						$scope.driver = drvResp;
						console.log("driver_id: "+$scope.driver.id_driver);
					}).error(function(drvResp) {
						console.log('error getting driver info.. '+drvResp);
					});
				}
				if ($scope.trip.trip_status=="WAITRATE") {
					$scope.screenstate = "WAITPAYMENT";
				}
				$scope.totalFare = resp.total_fare;
				//$scope.calculateTotalFare();
				$scope.updateTotalPoint($scope.totalPoint,$scope.totalFare);
				$ionicLoading.hide();
			}).error(function(data) {
				$ionicLoading.hide();
				console.log('error checking trip status.. '+data);
			});
		}
	}
	
	$scope.checkAndUpdateTrip();
	initializePubNub();
	$scope.payNonCash = function(){
		//localStorage.setItem("tripState", "WAITRATE");
		//$state.go('app.dash');
		var tip = parseInt($scope.data.tip);
		if(isNaN(tip)){
			tip = 0;
		}
		TripAndReservation.giveTip($scope.trip.id_trip,tip).success(function(resp) {
			var total = parseInt($scope.totalPoint);
			if(isNaN(total)){
				total = 0;
			}
			TripAndReservation.closeNonCash($scope.trip.id_trip,$scope.usedPoint,total).success(function(resp) {
				$scope.screenState = "WAITRATE";			
			}).error(function(data) {
				console.log('gagal close non cash');
			});
		}).error(function(data) {
			console.log('gagal input tip di controller');
		});
	}
	$scope.payCash = function(){
		//localStorage.setItem("tripState", "WAITRATE");
		//$state.go('app.dash');
		var total = parseInt($scope.totalPoint);
		if(isNaN(total)){
			total = 0;
		}
		TripAndReservation.closeCash($scope.trip.id_trip,$scope.usedPoint,total).success(function(resp) {
			$scope.screenState = "WAITRATE";
			
		}).error(function(data) {
			console.log('error payment.. '+data);
		});
	}
	$scope.submitRate = function(){
		$ionicLoading.show({
			content: 'Mengirim nilai dan komentar...',
			animation: 'fade-in',
			showBackdrop: true,
		});
		
		var tripId = localStorage.getItem("activeTripId");
		var star = $scope.dataRating.rating;
		var comment = $scope.dataRating.comment;
		
		console.log(tripId+' || '+star+' || '+comment);
		
		TripAndReservation.giveComment(tripId, star, comment).success(function(data) {
			localStorage.setItem("tripState", "RESERVATION");
			localStorage.removeItem("activeTripId");
			$scope.screenState = "selectPickupPoint";
			$state.go('app.dash');
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Terima kasih',
				template: 'Terima kasih atas nilai dan komentar anda.'
			});
			
		}).error(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Error!',
				template: 'Gagal memberi komentar'
			});
		});
	}
	
	$scope.changePayment = function(){
		$scope.isTunai = ($scope.walletData.selectedPaymentMethod == "Tunai");
	}
	
	function initializePubNub(){
		var PUBNUB_demo = PUBNUB.init({
			//publish_key: 'pub-c-3db0975f-e35a-4e93-968b-b16a83e9d560',
			//AWsubscribe_key: 'sub-c-74258d4e-8b95-11e5-bf00-02ee2ddab7fe'
			subscribe_key: 'sub-c-4ba89c1c-89e7-11e5-8e17-02ee2ddab7fe'
		});
		PUBNUB_demo.subscribe({
			channel: 'customer_'+localStorage.getItem("bbg_custMobile_loginEmail"),
			message: function(m){processPubNubMessage(m)}
		});
		console.log("pubnub subscribe ok");
	}
	
	function processPubNubMessage(message){
		console.log("==pubnub receive message - START==");
		console.log("id_trip: "+message.trip_id);
		console.log("status: "+message.trip_status);
		console.log('isi message' + message);
		if(message.trip_id == localStorage.getItem("activeTripId") && message.trip_status=="CLOSED"){
			//$scope.checkAndUpdateTrip();
			// $scope.screenState = "WAITRATE";
			$scope.$apply(function(){$scope.screenState = "WAITRATE";});
			console.log($scope.screenState);
		}
		console.log("==pubnub receive message - END==");
	}
	
	$scope.calculateTime = function(start,end){
		var timeStart = new Date(start);
		var timeEnd = new Date(end);
		var duration = timeEnd.getTime() - timeStart.getTime();
		
		return Math.ceil(duration/60000) + " Menit";
	}
	
	/*$scope.$watch('data.rating', function() {
	  console.log('New value: '+$scope.data.rating);
	});*/

})

.controller('MapCtrl', ['$scope', '$cordovaVibration', '$filter', '$window', '$ionicLoading', '$compile', '$ionicModal', '$ionicPopup', '$state', '$interval', 'Customer', 'Wallets', 'TripAndReservation', 'Taxi', 'Driver', 'FavLocations', 'PanicButton', function($scope,$cordovaVibration , $filter, $window, $ionicLoading, $compile, $ionicModal, $ionicPopup, $state, $interval, Customer, Wallets, TripAndReservation, Taxi, Driver, FavLocations, PanicButton) {
	var myPosition;
	var mapOptions;
	var map;
	//gmapmarker_var markButton;
	var pickupMarker;
	var destMarker;
	var taxiMarker;
	var nearestTaxiMarkers = [];
	var reservedTaxiMarkers = [];
	var nearestTaxiInterval = $interval(function(){
		console.log('gambar taxi terdekat');
		showNearestTaxiLocation($scope.locPoint.latlong);
	},10000);
	var reservedTaxiInterval;
	$scope.$on('$ionicView.afterLeave', function(){
		if (nearestTaxiInterval) {
			$interval.cancel(nearestTaxiInterval);
			clearNearestTaxiMarkers();
			console.log('clean marker taxi');
		}
	});
	var destinationChanged;
	var directionsDisplay;
	var tripPopup;
	var biasaPopup;
	var gPlaceService;

	$scope.walletData = {};
	$scope.walletData.index = 0;
	
	// selection state
	$scope.pickupSelected = false;
	$scope.destinationSelected = false;
	
	$scope.showPointer = true;

	//Location data used in the map for pointed location, pickup location and destination location
	$scope.locPoint = {name:'',latlong:''};
	$scope.locPickup = {name:'',latlong:''};
	$scope.locDest = {name:'n/a',latlong:''};
	$scope.selectedTaxiType = '';
	$scope.selectedPaymentMethod = '';
	$scope.isToAirport = {};
	$scope.isToAirport.checked = false;
	$scope.ETA = '15 mins';
	$scope.pickupETA = '5 mins';
	$scope.distance = '';
	$scope.estimatedFare = '';
	$scope.driverName = '';
	$scope.hullNumber = '';
	$scope.driverArrivalStatus = 'Estimasi taksi akan tiba dalam';
	$scope.searchPOI = {};
	$scope.searchPOI.keyword="";
	$scope.data = {};
	
	//Trip Object represents current active trip.
	$scope.trip = {};
	$scope.driver = {};
	$scope.favPOI = {};
	$scope.driverRating = {
		rating : 0,
		max: 5
	}
	
	//Dynamic label list
	$scope.labels = {
		selectPointType:'Lokasi Penjemputan',
		pageTitle:'Pemesanan Taksi',
		mapLeftButton:'Pemesanan Prioritas',
		mapRightButton:'Pemesanan Biasa',
		bigButton:'Batalkan Pemesanan'
	};
	$scope.bigButtonColor = 'assertive';
	
	//Define Taxi type START
	$scope.taxiTypeItems = ["Sedan, MPV, SUV"];
	$scope.taxiTypeData = {};
	$scope.taxiTypeData.index = 0;
	
	//screenstate: selectPickupPoint, selectDestination, searchTaxi, driverEnroute, onTrip
	$scope.screenState = 'selectPickupPoint';
	
	$scope.timePickerObject = {
		inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
		step: 15,  //Optional
		format: 24,  //Optional
		titleLabel: 'Pilih waktu yang diinginkan',  //Optional
		setLabel: 'Pilih',  //Optional
		closeLabel: 'Tutup',  //Optional
		setButtonType: 'button-positive',  //Optional
		closeButtonType: 'button-stable',  //Optional
		callback: function (val) {    //Mandatory
			timePickerCallback(val);
		}
	};

	$scope.date = $filter("date")(Date.now(), 'yyyy-MM-dd');
	var d = new Date(),
	h = (d.getHours()<10?'0':'') + d.getHours(),
	m = (d.getMinutes()<10?'0':'') + d.getMinutes();
	$scope.time = h + ':' + m;
	//$scope.time = (localStorage.getItem("selectedTime")!=null?localStorage.getItem("selectedTime"):Date.now());
	console.log($scope.time);

	function getTime(date){
		return date.getHours() + ":" + date.getMinutes();
		console.log('create time')
	}
	function getDate(date){
		return date.toDateString();
		console.log('create date')
	}
	function timePickerCallback(val) {
		if (typeof (val) === 'undefined') {
			console.log('Time not selected');
		} else {
			
			var selectedTime = new Date(val * 1000),
			h = (selectedTime.getUTCHours()<10?'0':'') + selectedTime.getUTCHours(),
			m = (selectedTime.getMinutes()<10?'0':'') + selectedTime.getMinutes();
			$scope.time = h + ':' + m;
			localStorage.setItem("selectedTime",selectedTime);
			console.log(selectedTime);
		}
	}
	
	ionic.Platform.ready(initialize);
	
	if(typeof(Storage) != "undefined") {
		if(localStorage.getItem("bbg_custMobile_loginEmail")=="null" || localStorage.getItem("bbg_custMobile_loginEmail")==""){
			$state.go('login');
		}
		else if(localStorage.getItem("tripState")=="WAITPAYMENT" || localStorage.getItem("tripState")=="WAITFEEDBACK"){
			$state.go('app.tripend');
		}else{
			$ionicLoading.show({
				content: 'Loading Map...',
				animation: 'fade-in',
				showBackdrop: true,
			});
			
			//google.maps.event.addDomListener(window, 'load', initialize);
			
			initializePaymentMethod();
			getAllFavPOI();
			//initializePubNub();
			var tripAutoUpdater;
			
			//tripAutoUpdater = $interval($scope.checkAndUpdateTrip(),1000);
			//$scope.checkAndUpdateTrip();
			$ionicLoading.hide();
		}
	} else {
		alert("Sorry, your browser does not support Web Storage...");
	}
	
	
	
	/* print local storage related to app*/
	function printLocalStorage(){
		console.log("tripState:"+localStorage.getItem("tripState")+", active trip id:"+localStorage.getItem("activeTripId"));
		console.log("email:"+localStorage.getItem("bbg_custMobile_loginEmail")+", token:"+localStorage.getItem("bbg_custMobile_loginToken"));
	}
	printLocalStorage();

	// function untuk set map height
	function adjustMapsHeight(state) {
		if(state == 'reserve'){
			console.log((window.innerHeight-(220)-44));
			document.getElementById('maps').style.height = (window.innerHeight-(220)-44)+'px';
		}
		if(state =='search') {
			console.log((window.innerHeight-(180)-44));
			document.getElementById('maps').style.height = (window.innerHeight-(180)-44)+'px';
		}
		if(state =='enroute') {
			console.log((window.innerHeight-(240)-44));
			document.getElementById('maps').style.height = (window.innerHeight-(240)-44)+'px';
		}
		if(state =='onTrip') {
			console.log((window.innerHeight-(240)-44));
			document.getElementById('maps').style.height = (window.innerHeight-(240)-44)+'px';
		}
	}
	$scope.vibrate = function() {
		document.addEventListener( "deviceready", function() {
			$cordovaVibration.vibrate( 2000 ); }, false );
	};
	
	/*
		function called for checking tripStatus manually before using push notification.
		Trip & Screen state main controller
		*/
		$scope.checkAndUpdateTrip = function(){
			console.log("Executing check and update trip...");
			clearNearestTaxiMarkers();

			if(localStorage.getItem("activeTripId")!="null" && localStorage.getItem("activeTripId")!=null && localStorage.getItem("activeTripId")!=""){
				console.log("checkUpdateTrip-activeTripId: "+localStorage.getItem("activeTripId"));
				TripAndReservation.getTripById(localStorage.getItem("activeTripId")).success(function(resp) {
					$scope.trip = resp;				
					console.log('trip status: '+$scope.trip.trip_status);
					adjustMapsHeight('reserve');
					if($scope.trip.trip_status == "RSV_CREATED" || $scope.trip.trip_status == "BIDDING"){
						adjustMapsHeight('search');
						localStorage.setItem('tripState',resp.trip_status);
						if (nearestTaxiInterval) {
							$interval.cancel(nearestTaxiInterval);
							clearNearestTaxiMarkers();
							console.log('clean marker taxi');
						}
						showScreenSearchTaxi();
						console.log('sedang bidding');
					}else if($scope.trip.trip_status == "RESERVED" || $scope.trip.trip_status == "ARRIVED"){
						adjustMapsHeight('enroute');
						$scope.vibrate();
						localStorage.setItem('tripState',resp.trip_status);
						if (nearestTaxiInterval) {
							$interval.cancel(nearestTaxiInterval);
							clearNearestTaxiMarkers();
							console.log('clean marker taxi');
						}
						showScreenDriverEnroute();
						reservedTaxiInterval = $interval(function(){
							showTaxiLocation(true);
						},10000);
					}else if($scope.trip.trip_status == "HIRED"){
						adjustMapsHeight('onTrip');
						$scope.vibrate();
						localStorage.setItem('tripState',resp.trip_status);
						if (nearestTaxiInterval) {
							$interval.cancel(nearestTaxiInterval);
							clearNearestTaxiMarkers();
							console.log('clean marker taxi');
						}
						showScreenOnTrip();
						reservedTaxiInterval = $interval(function(){
							showTaxiLocation(true);
						},10000);
						console.log('sedang hired');
					}else if($scope.trip.trip_status == "WAITPAYMENT"){
						localStorage.setItem('tripState',resp.trip_status);
						$scope.vibrate();
						if (nearestTaxiInterval) {
							$interval.cancel(nearestTaxiInterval);
							clearNearestTaxiMarkers();
							console.log('clean marker taxi');
						}
						if (reservedTaxiInterval) {
							$interval.cancel(reservedTaxiInterval);
							clearReservedTaxiMarkers();
							console.log('clean marker taxi');
						}
						console.log('sedang waitpayment');
						showScreenPayment();
					}
					else if($scope.trip.trip_status == "CLOSED"){
						adjustMapsHeight('reserve');
						localStorage.setItem("tripState","reservation");
						localStorage.setItem("activeTripId","");
						console.log('sudah closed');
					}

					if(resp.id_driver != null){
						adjustMapsHeight();
						$scope.hullNumber = $scope.trip.hulls_number;
						Driver.getDriverById(resp.id_driver).success(function(drvResp) {
							$scope.driver = drvResp;
							$scope.driverRating.rating = drvResp.rating;
						}).error(function(drvResp) {
							console.log('error getting driver info.. '+drvResp);
						});
					}
				}).error(function(data) {
					console.log('error checking trip status.. '+data);
				});
			}else{
				adjustMapsHeight('reserve');
				if (reservedTaxiInterval) {
					$interval.cancel(reservedTaxiMarkers);
					clearReservedTaxiMarkers();
					console.log('clean marker taxi');
				}

			}
		}

		function initializePubNub(){
			var PUBNUB_demo = PUBNUB.init({
			//publish_key: 'pub-c-3db0975f-e35a-4e93-968b-b16a83e9d560',
			//AWsubscribe_key: 'sub-c-74258d4e-8b95-11e5-bf00-02ee2ddab7fe'
			subscribe_key: 'sub-c-4ba89c1c-89e7-11e5-8e17-02ee2ddab7fe'
		});
			PUBNUB_demo.subscribe({
				channel: 'customer_'+localStorage.getItem("bbg_custMobile_loginEmail"),
				message: function(m){processPubNubMessage(m)}
			});
			console.log("pubnub subscribe ok");
		}

		function processPubNubMessage(message){
			console.log("==pubnub receive message - START==");
			console.log("trip_id: "+message.trip_id);
			console.log("status: "+message.trip_status);
			if(message.trip_id == localStorage.getItem("activeTripId")){
				$scope.checkAndUpdateTrip();
			}
			console.log("==pubnub receive message - END==");
		}

		function initializePaymentMethod(){
			Wallets.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(function(data) {
				if(data.result[0]!=null && typeof(data.result[0] != "undefined")) {
					$scope.wallets = data.result[0].payment;
				}
			}).error(function(data) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Error!',
					template: 'Tidak dapat mengambil daftar pembayaran!'
				});
			});
		}

	//Will be called when entering destination selection
	$scope.selectDest = function(){
		$scope.screenState = 'selectDestination';
		$scope.labels.pageTitle = 'Pemilihan tujuan';
		$scope.labels.selectPointType = 'Tujuan Perjalanan';
		$scope.labels.mapLeftButton = "Batal";
		$scope.labels.mapRightButton = "Pilih Tujuan";
		//$scope.modal.hide();
		biasaPopup.close();
	}
	
	$scope.selectDestOnTrip = function(){
		$scope.screenState = 'selectDestination';
		$scope.labels.pageTitle = 'Pemilihan tujuan';
		$scope.labels.selectPointType = 'Tujuan Perjalanan';
		$scope.labels.mapLeftButton = "Batal";
		$scope.labels.mapRightButton = "Pilih Tujuan";
		//gmapmarker_markButton.setMap(map);
		$scope.showPointer = true;
		tripPopup.close();
	}
	
	//Will be called when entering pickup point selection
	$scope.selectPickupPoint = function(){
		$scope.screenState = 'selectPickupPoint';
		$scope.labels.pageTitle = 'Pemesanan Taksi';
		$scope.destinationSelected = false;
		$scope.labels.selectPointType = 'Lokasi penjemputan';
		$scope.labels.mapLeftButton = "Pemesanan Prioritas";
		$scope.labels.mapRightButton = "Pemesanan Biasa";
	}
	
	$scope.cancelConfirm = function(){
		$scope.locDest.name='n/a';
		$scope.locDest.latlong = '';
		$scope.selectPickupPoint();
		$scope.modal.hide();
		if(pickupMarker!=null && pickupMarker!="" && typeof(pickupMarker)!= "undefined"){
			pickupMarker.setMap(null);
		}
	}
	$scope.searchTaxi = function(isPriority){
		$ionicLoading.show({
			content: 'Membuat pemesanan',
			animation: 'fade-in',
			showBackdrop: true,
		});
		
		//populate reservation data
		var rsvData = {};
		var custData = {};
		var date = new Date();
		rsvData.reservation_passenger_name = $scope.menuprofile.name;
		rsvData.reservation_contact_number = $scope.menuprofile.phone_number;
		rsvData.id_trip = localStorage.getItem("bbg_custMobile_loginEmail") + (new Date).getTime();
		rsvData.trip_date_start = date.toJSON();
		rsvData.trip_date_end = date.toJSON();
		rsvData.email_customer = localStorage.getItem("bbg_custMobile_loginEmail");
		if($scope.data.usedPoint!=null && $scope.data.usedPoint!="" && typeof($scope.data.usedPoint)!= "undefined"){
			if($scope.data.usedPoint <= $scope.menuprofile.loyalty_point_total){
				rsvData.loyalty_point = $scope.data.usedPoint;
			}
			else{
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'Saldo loyalty point anda tidak mencukupi. Poin tidak jadi digunakan'
				});
				rsvData.loyalty_point = 0;
			}
		}
		else{
			rsvData.loyalty_point = 0;
		}
		rsvData.trip_status = "BIDDING";
		rsvData.reservation_is_priority = isPriority;
		rsvData.reservation_reserve_time = date.toJSON();
		rsvData.reservation_is_immediate = "YES";
		rsvData.reservation_request_time = date.toJSON();
		// pickup
		rsvData.origin_name = $scope.locPickup.name;
		rsvData.reservation_pickup_geo = {};
		rsvData.reservation_pickup_geo.type = "Point";
		rsvData.reservation_pickup_geo.coordinates = $scope.getGeoByLatLong($scope.locPickup.latlong);
		// destination
		rsvData.destination_name = $scope.locDest.name;
		rsvData.destination_geo = {};
		rsvData.reservation_is_to_airport = "NO";
		rsvData.reservation_taxi_type = $scope.selectedTaxiType;
		rsvData.payment_method = $scope.wallets[$scope.walletData.index].payment_name;
		//pickupnote
		rsvData.reservation_note_pickup = "";
		if($scope.data.reservation_note_pickup != null && typeof($scope.data.reservation_note_pickup) != "undefined"){
			rsvData.reservation_note_pickup = $scope.data.reservation_note_pickup;
		}
		else{
			rsvData.reservation_note_pickup = "";
		}
		if(rsvData.destination_name != "n/a"){
			rsvData.destination_geo.type = "Point";
			rsvData.destination_geo.coordinates = $scope.getGeoByLatLong($scope.locDest.latlong);
			TripAndReservation.checkIsToAirport(rsvData.destination_geo.coordinates[0],rsvData.destination_geo.coordinates[1]).success(function(resp) {
				console.log(resp);
				if(resp.Status == true) {
					rsvData.reservation_is_to_airport = "YES";
				}
				else{
					rsvData.reservation_is_to_airport = "NO";
				}
				TripAndReservation.createReservation(rsvData).success(function(resp) {
					console.log(rsvData);
					$ionicLoading.hide();
					localStorage.setItem("activeTripId", rsvData.id_trip);
					localStorage.setItem('tripState','BIDDING');
					$scope.checkAndUpdateTrip();
				}).error(function(data) {
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: 'ERROR',
						template: 'Harap bersabar, teknisi kami sedang memperbaiki sistem pemesanan taksi'
					});
				});
				$ionicLoading.hide();
			}).error(function(data) {
				$ionicLoading.hide();
				console.log('fail check to airport')
			});
		}
		else{
			TripAndReservation.createReservation(rsvData).success(function(resp) {
				console.log(rsvData);
				$ionicLoading.hide();
				localStorage.setItem("activeTripId", rsvData.id_trip);
				localStorage.setItem('tripState','BIDDING');
				$scope.checkAndUpdateTrip();
			}).error(function(data) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'ERROR',
					template: 'Harap bersabar, teknisi kami sedang memperbaiki sistem pemesanan taksi'
				});
			});
		}
		printLocalStorage();
	}
	
	$scope.cancelReservation = function(){
		$ionicLoading.show({
			content: 'Membuat pemesanan',
			animation: 'fade-in',
			showBackdrop: true,
		});
		pickupMarker.setMap(null);
		TripAndReservation.cancelReservation(localStorage.getItem("activeTripId")).success(function(resp) {
			$ionicLoading.hide();		
			localStorage.setItem("activeTripId", "");
			localStorage.setItem('tripState','RESERVATION');
			adjustMapsHeight('reserve');		
			showScreenInitialReservation();
			pickupMarker.setMap(null);
			//$interval.cancel(tripAutoUpdater);
		}).error(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'ERROR',
				template: 'gagal '+data
			});
		});
		printLocalStorage();
	}
	
	function getDistanceAndTariff(src, dst){
		var fromLatLong = $scope.getLocationByLatLong(src);
		var toLatLong = $scope.getLocationByLatLong(dst);
		var retval = {};
		
		var distanceSvc = new google.maps.DistanceMatrixService;
		distanceSvc.getDistanceMatrix(
		{
			origins: [fromLatLong],
			destinations: [toLatLong],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
				//avoidHighways: false,
				//avoidTolls: false
			}, function(response, status) {
				if (status !== google.maps.DistanceMatrixStatus.OK) {
					alert('Error was: ' + status);
					$scope.ETA = "";
					$scope.distance = "";
				} else {
					var results = response.rows[0].elements;
					retval.duration = results[0].duration.text;
					retval.distance = results[0].distance.text;
					$scope.ETA = results[0].duration.text;
					$scope.distance = results[0].distance.text;
					
					calculateFareEstimation(results[0].distance.value);					
				}
			}
			);
	}
	
	function calculateFareEstimation(distance){
		// 		camry		13000	7000
		// mercy		16000	8000
		// alphard		17000	9000
		var estFare = 7500;
		var estFareHigh = 7500;
		if(distance > 1000){
			estFare = estFare + (Math.ceil((distance-1000)/100) * 400);
			estFareHigh = estFare + (0.15*estFare);
		}
		$scope.estimatedFare = 'Rp '+estFare + ' - ' + 'Rp '+estFareHigh;
	}
	
	function clearNearestTaxiMarkers(){
		for (var i=0;i<nearestTaxiMarkers.length;i++){
			nearestTaxiMarkers[i].setMap(null);
		}
		nearestTaxiMarkers = [];
	}
	
	function showNearestTaxiLocation (latlong) {
		Taxi.getNearestTaxiLocation($scope.getGeoByLatLong(latlong)[0],$scope.getGeoByLatLong(latlong)[1]).success(function(resp) {
			console.log(resp);
			var carsLocation = resp.result;
			//if(nearestTaxiMarkers[0].position != $scope.getLocationByLatLong(carsLocation[0].lat+","+carsLocation[i].lng))
			clearNearestTaxiMarkers();
			//console.log("koordinat" + $scope.getGeoByLatLong(latlong))
			for(var i = 0; i<carsLocation.length;i++){
				var carLocation = $scope.getLocationByLatLong(carsLocation[i].lat+","+carsLocation[i].lng);
				nearestTaxiMarkers[i] = new google.maps.Marker({
					position: carLocation,
					map: map,
					icon: 'img/car_marker.png'
				});
			};
			console.log(nearestTaxiMarkers);			
		}).error(function(data) {
			console.log('Gagal get nearest taxi'+data);
		});
	}

	/* ========================= Start - Screen related function ========================= */

	//Change screen to reservation creation mode
	function showScreenInitialReservation(){
		$scope.selectPickupPoint();
		$scope.locDest.name='n/a';
		$scope.locDest.latlong = '';
		$scope.trip = {};
		setMapModeDynamic();
	}
	
	//Change screen to search taxi mode
	function showScreenSearchTaxi(){
		$scope.screenState = 'searchTaxi';
		$scope.labels.pageTitle = 'Mencari Taksi';
		$scope.bigButtonColor = 'assertive';
		$scope.labels.bigButton = 'Batalkan perjalanan';
		$scope.modal.hide();
		map.setZoom(15);
		//gmapmarker_markButton.setMap(null);
		
		// },5000);
		//gmapmarker_markButton.setMap(null);
		var center = new google.maps.LatLng($scope.trip.reservation_pickup_geo.coordinates[0], $scope.trip.reservation_pickup_geo.coordinates[1]);
		//var center = $scope.getLocationByLatLong($scope.locPickup.latlong);
		setMapModeStatic(center);
		map.setCenter(center);
	}
	
	//Change screen to driverEnroute mode
	function showScreenDriverEnroute(){
		$scope.screenState = 'driverEnroute';
		$scope.labels.pageTitle = 'Menunggu Taksi';
		if($scope.trip.trip_status == 'ARRIVED'){
			$scope.ETA = "";
			$scope.driverArrivalStatus = 'Taksi telah tiba di lokasi penjemputan';
		}else{
			$scope.driverArrivalStatus = 'Estimasi taksi akan tiba dalam';
		}
		console.log($scope.trip.id_trip);
		localStorage.setItem("activeHullsNo", $scope.trip.hulls_number);
		var center = new google.maps.LatLng($scope.trip.reservation_pickup_geo.coordinates[0], $scope.trip.reservation_pickup_geo.coordinates[1]);
		setMapModeStatic(center);
		map.setCenter(center);
	}

	//Change screen to on trip mode
	function showScreenOnTrip(){
		$scope.screenState = 'onTrip';
		//$scope.tripState = 'onTrip';
		if($scope.trip.destination_name == "n/a"){
			$scope.screen
		}
		$scope.labels.pageTitle = 'Dalam Perjalanan';
		$scope.bigButtonColor = 'calm';
		$scope.labels.bigButton = 'Info perjalanan';
		
		var center = new google.maps.LatLng($scope.trip.reservation_pickup_geo.coordinates[0], $scope.trip.reservation_pickup_geo.coordinates[1]);
		setMapModeStatic(center);
		showTaxiLocation(true);
	}
	
	//Change screen to payment screen
	function showScreenPayment(){
		$state.go('app.tripend');
	}
	
	/* ========================= End - Screen related function ========================= */
	
	function getAllFavPOI(){
		FavLocations.get(localStorage.getItem("bbg_custMobile_loginEmail")).success(
			function(data) {
				$scope.favPOI = data.listFavouritePOI.favourite_location;
			}
			)
		.error(
			function(data){
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Error!',
					template: 'Tidak dapat mengambil daftar poi!'
				});
			}
			);
	}

	$scope.showPlaces = function(){
		$scope.isShowPlaces=true;
	}

	$scope.hidePlaces = function(){
		console.log('hide place');
		$scope.isShowPlaces=false;
	}

	$scope.googlePOIs={};
	var poiResults;

	$scope.searchGooglePlace = function(){
		var request = {
			location:map.getCenter(),
			radius: 50000,
			keyword: $scope.searchPOI.keyword
		};
		gPlaceService.nearbySearch(request, callback);
		function callback(results, status) {
			if (status !== google.maps.places.PlacesServiceStatus.OK) {
				console.error(status);
				return;
			}
			var show = results.length > 5?5:results.length;
			$scope.googlePOIs = [];
			poiResults = results;
			for (var i = 0; i<show; i++) {
				$scope.googlePOIs[i]={};
				$scope.googlePOIs[i].location_name=results[i].name;
				$scope.googlePOIs[i].location_description=results[i].vicinity;
				$scope.googlePOIs[i].idx=i;
			}
		}
	}

	$scope.goToGpoi = function(gpoi){
		map.setCenter(poiResults[gpoi.idx].geometry.location);
		$scope.locPoint.latlong = map.getCenter().toUrlValue();
		document.getElementById('resv_from').innerHTML = gpoi.location_name + ", " + gpoi.location_description;
		$scope.locPoint.name = gpoi.location_name + ", " + gpoi.location_description;
	}

	$scope.goToFpoi = function(fpoi){
		map.setCenter($scope.getLocationByLatLong(fpoi.geo_point.coordinates[0]+","+fpoi.geo_point.coordinates[1]));
		$scope.locPoint.latlong = map.getCenter().toUrlValue();
		document.getElementById('resv_from').innerHTML = fpoi.location_name + ", " + fpoi.location_description;
		$scope.locPoint.name = fpoi.location_name + ", " + fpoi.location_description;
	}

	function setMapModeDynamic(){
		$scope.showPointer = true;
		if(typeof(pickupMarker) != "undefined"){
			if(pickupMarker!=null)pickupMarker.setMap(null);
		}
		if(pickupMarker!=null)pickupMarker.setMap(null);
		if(typeof(destMarker) != "undefined"){
			if(pickupMarker!=null)destMarker.setMap(null);
		}
		if(typeof(carMarker) != "undefined"){
			if(pickupMarker!=null)carMarker.setMap(null);
		}
		if(typeof(reservedTaxiMarkers) != "undefined"){
			if(reservedTaxiMarkers!=null)clearReservedTaxiMarkers();
		}
	}

	function setMapModeStatic(center){
		$scope.showPointer = false;
		if($scope.trip.trip_status!="HIRED"){
			pickupMarker = new google.maps.Marker({
				position: center,
				map: map,
				icon: 'img/loc_start.png'
			});
		}else{
			if(pickupMarker!=null)pickupMarker.setMap(null);
		}		

		//console.log("scope.trip.destination_geo: "+$scope.trip.destination_geo.coordinates);
		if($scope.trip.destination_geo.coordinates != null){
			console.log("destination not null");
			if(destMarker==null){
				destMarker = new google.maps.Marker({
					position: new google.maps.LatLng($scope.trip.destination_geo.coordinates[0], $scope.trip.destination_geo.coordinates[1]),
					map: map,
					icon: 'img/loc_end.png'
				});
			}else{
				destMarker.setPosition(new google.maps.LatLng($scope.trip.destination_geo.coordinates[0], $scope.trip.destination_geo.coordinates[1]));
				destMarker.setMap(map);
			}
		}
	}
	
	//Display route on google maps if destination is selected
	function displayRoute(fromLatLong){
		if($scope.trip.destination_geo.coordinates!=null || $scope.trip.trip_status=='RESERVED'){
			//var fromLatLong = $scope.getLocationByLatLong($scope.locPickup.latlong);
			var toLatLong = ($scope.trip.trip_status=='HIRED'?
				new google.maps.LatLng($scope.trip.destination_geo.coordinates[0], $scope.trip.destination_geo.coordinates[1]):
				new google.maps.LatLng($scope.trip.reservation_pickup_geo.coordinates[0], $scope.trip.reservation_pickup_geo.coordinates[1])
				);
			
			var directionsService = new google.maps.DirectionsService;
			if(directionsDisplay!=null){directionsDisplay.setMap(null);}
			directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

			directionsDisplay.setMap(map);

			var request = {
				origin : fromLatLong,
				destination : toLatLong,
				travelMode : google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
		}
	}
	

	function clearReservedTaxiMarkers(){
		for (var i=0;i<reservedTaxiMarkers.length;i++){
			reservedTaxiMarkers[i].setMap(null);
		}
		reservedTaxiMarkers = [];
	}
	function showTaxiLocation(isDisplayRoute){
		Taxi.getTaxiLocationById($scope.trip.hulls_number).success(function(resp) {
			clearReservedTaxiMarkers();
			var carLocation = $scope.getLocationByLatLong((resp.last_geo_position.coordinates[1])+","+resp.last_geo_position.coordinates[0]);
			reservedTaxiMarkers.push(new google.maps.Marker({
				position: carLocation,
				map: map,
				icon: 'img/car_marker.png'
			}));
			//clearReservedTaxiMarkers();
			// carMarker = new google.maps.Marker({
			// 	position: carLocation,
			// 	map: map,
			// 	icon: 'img/car_marker.png'
			// });

			var isShowETA = (($scope.trip.trip_status=='RESERVED')&&($scope.trip.trip_status!='ARRIVED')) ||
			(($scope.trip.trip_status=='HIRED')&&($scope.trip.destination_geo.coordinates!=null));

			if(isShowETA){
				var src = resp.last_geo_position.coordinates[1]+","+resp.last_geo_position.coordinates[0];
				var dst = ($scope.trip.trip_status=='HIRED'?
					$scope.trip.destination_geo.coordinates[0]+","+$scope.trip.destination_geo.coordinates[1]:
					$scope.trip.reservation_pickup_geo.coordinates[0]+","+$scope.trip.reservation_pickup_geo.coordinates[1]);

				getDistanceAndTariff(src, dst);
				//console.log("aaa"+$scope.pickupETA+"aaa"+$scope.ETA);
				//$scope.pickupETA = $scope.ETA;
				
				if(isDisplayRoute){
					displayRoute(carLocation);
					//map.setCenter(carLocation);
				}
			}
			
			if($scope.trip.trip_status == 'HIRED'){
				//map.setCenter(carLocation);
			}
			
		}).error(function(data) {
			console.log('error checking trip status.. '+data);
		});
	}

	$scope.onTripChangeDest = function(){
		if(destinationChanged){
			destinationChanged = false;
			$scope.checkAndUpdateTrip();
		}
	}

	$scope.mapLeftButtonClick = function(){
		if($scope.screenState == 'selectPickupPoint'){
			$scope.showPopup();
		}
		if($scope.screenState == 'selectDestination'){
			if(localStorage.getItem("tripState")== 'HIRED'){
				showScreenOnTrip();
				$scope.showTripDetail();
			}else{
				$scope.selectPickupPoint();
				$scope.screenState = 'selectPickupPoint';
				$scope.pemesananBiasaPopup();
			}
		}
	}
	$scope.mapPanicButtonClick = function(){
		$scope.showPanicPopup();
	}
	$scope.mapRightButtonClick = function(){
		if($scope.screenState == 'selectPickupPoint'){
			//$scope.modal.show();
			$scope.pemesananBiasaPopup();
			$scope.locPickup.name = $scope.locPoint.name;
			$scope.locPickup.latlong = $scope.locPoint.latlong;
			$scope.selectedTaxiType = $scope.taxiTypeItems[$scope.taxiTypeData.index];

		}else if($scope.screenState == 'selectDestination'){
			$scope.locDest.name = $scope.locPoint.name;
			$scope.locDest.latlong = $scope.locPoint.latlong;
			$scope.destinationSelected = true;

			if(localStorage.getItem("tripState")== 'HIRED'){
				//gmapmarker_markButton.setMap(null);
				var geoDest = $scope.getGeoByLatLong($scope.locDest.latlong);
				TripAndReservation.changeDestination($scope.trip.id_trip, $scope.locDest.name, geoDest[0], geoDest[1]).success(function(resp) {
					destinationChanged = true;
					$scope.showTripDetail();
					$scope.trip.destination_name = $scope.locDest.name;
					//$scope.checkAndUpdateTrip();
				}).error(function(data) {
					console.log('Error changing destination '+data);
				});
				//$scope.showPointer = false;
				//showScreenOnTrip();
				
			}else{
				$scope.selectPickupPoint();
				$scope.screenState = 'selectPickupPoint';
				$scope.pemesananBiasaPopup();
				getDistanceAndTariff($scope.locPickup.latlong, $scope.locDest.latlong);
			}
		}
	}
	
	$scope.mapBigButtonClick = function(){
		if(($scope.screenState == 'searchTaxi') || ($scope.screenState == 'driverEnroute')){
			$scope.cancelReservation();
		}else if($scope.screenState == 'onTrip'){
			$scope.showTripDetail();
		}
	}
	
	$scope.getLocationByLatLong = function(loc){
		var latlngStr = loc.split(',', 2);
		var retval = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
		return retval;
	}
	
	$scope.getGeoByLatLong = function(loc){
		var latlngStr = loc.split(',', 2);
		var retval = [latlngStr[0], latlngStr[1]];
		return retval;
	}
	$scope.pemesananBiasaPopup = function(){
		// An elaborate, custom popup
		
		var title = 'Pemesanan Biasa';
		biasaPopup = $ionicPopup.show({
			templateUrl: 'templates/biasa.html',
			title: title,
			cssClass:'biasaPopup',
			scope: $scope,
			buttons: [
			{
				text: '<b>Batal</b>',
				type: 'button-normal'
			},
			{
				text: '<b>Pesan</b>',
				type: 'button-assertive',
				onTap: function(e) {
					// $scope.locPickup.name = $scope.locPoint.name;
					// $scope.locPickup.latlong = $scope.locPoint.latlong;
					$scope.selectedTaxiType = $scope.taxiTypeItems[$scope.taxiTypeData.index];
					$scope.searchTaxi('NO');
				}
			}]
		});
		biasaPopup.then(function(res) {
			//console.log('Tapped!', res);
		});
	}
	$scope.showPopup = function() {
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			// template: '<div class="row"><label class="checkbox"><input type="checkbox" ng-model="isToAirport.checked" ng-checked="isToAirport.checked"></label><p style="font-size:small">Klik jika anda ingin pergi ke bandara soekarno-hatta</p></div>',
			title: 'Pemesanan Taksi Prioritas',
			subTitle: '<p>Pemesanan prioritas diperuntukkan bagi anda yang ingin mendapatkan taksi dengan lebih cepat. Biaya tambahan untuk pemesanan prioritas adalah Rp.10.000</p>',
			scope: $scope,
			buttons: [
			{ text: 'Batal' },
			{
				text: '<b>Pesan</b>',
				type: 'button-assertive',
				onTap: function(e) {
					$scope.locPickup.name = $scope.locPoint.name;
					$scope.locPickup.latlong = $scope.locPoint.latlong;
					$scope.selectedTaxiType = $scope.taxiTypeItems[$scope.taxiTypeData.index];
					$scope.searchTaxi("YES");
				}
			}]
		});
		myPopup.then(function(res) {
			//console.log('Tapped!', res);
		});
	};
	
	$scope.showPanicPopup = function() {
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.confirm({
			template: '<p>Panic button diperuntukkan jika ada bahaya dalam perjalanan anda. Tekan kirim jika anda benar-benar dalam bahaya, kami akan mengirimkan bantuan secepatnya.</p>',
			title: 'Panic Button'
		});
		myPopup.then(function(res) {
			if(res) {email,idtrip,lat,long
				PanicButton.create(newData).success(function(resp) {
					var alertPopup = $ionicPopup.alert({
						title: 'Kirim',
						template: 'Kami telah menerima pesan bahaya anda. Tim kami akan segera membantu anda.'
					});
					alertPopup.then(function(res) {
						alertPopup.close();
					});
					$ionicLoading.hide();
				}).error(function(data) {
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: 'ERROR',
						template: 'Pelaporan SOS gagal dilakukan'
					});
				});
			} else {
				//console.log('You are not sure');
			}
		});
		myPopup.then(function(res) {
			myPopup.close();
		});
	};

	$scope.showTripDetail = function() {
		// An elaborate, custom popup
		
		var title = $scope.trip.reservation_is_priority=='YES'?'Info Perjalanan dengan prioritas':'Info Perjalanan';
		var subTitle = $scope.trip.reservation_is_priority=='YES'?'Perjalanan akan dikenakan biaya tambahan prioritas Rp. 20,000':'';
		tripPopup = $ionicPopup.show({
			templateUrl: 'templates/onTripMenu.html',
			title: title,
			subTitle: subTitle,
			scope: $scope,
			buttons: [
			{
				text: '<b>Tutup</b>',
				type: 'button-calm login-loginbutton',
				onTap: function(e) {
					$scope.onTripChangeDest();
				}
			}
			]
		});
		tripPopup.then(function(res) {
			//console.log('Tapped!', res);
		});
	};


	$ionicModal.fromTemplateUrl('templates/modal.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	function gtcl(){
		navigator.geolocation.getCurrentPosition(function(pos) {
			map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			console.log(pos.coords.latitude,pos.coords.longitude);
			$ionicLoading.hide();
		}, function(error) {
			alert('Unable to get location: ' + error.message);
			$ionicLoading.hide();
		}
		);
	}
	$scope.goToCurrentLocation = function(){
		ionic.Platform.ready(gtcl);
	}

	/* ===================== START OF MAP INITIALIZATION FUNCTION ===================== */
	
	function initialize() {
		//initial position of center map
		myPosition = new google.maps.LatLng(-6.196495, 106.822373);
		mapOptions = {
			disableDefaultUI:true,
			// streetViewControl:false,
			// scaleControl:false,
			// zoomControl:false,
			// mapTypeControl:false,
			centerControl:true,
			center: myPosition,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById("map"), mapOptions);

		google.maps.event.addListenerOnce(map, 'idle', function(){
			//alert('Map loaded!');
			console.log("map ready");
			$scope.checkAndUpdateTrip();
			initializePubNub();
			//$ionicLoading.hide();
			geocoder = new google.maps.Geocoder;


			google.maps.event.addListener(map, "dragend", function() {
				if(!$scope.pickupSelected){
					$scope.locPoint.latlong = map.getCenter().toUrlValue();
					geocodeLatLng(geocoder, map, $scope.locPoint.latlong);
				}
			});
			
			navigator.geolocation.getCurrentPosition(function(pos) {
				$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
				$scope.locPoint.latlong = map.getCenter().toUrlValue();
				// console.log('draw taxi');
				// showNearestTaxiLocation($scope.locPoint.latlong);
				geocodeLatLng(geocoder, map, $scope.locPoint.latlong);
				$ionicLoading.hide();
			}, function(error) {
				alert('Unable to get location: ' + error.message);
				$ionicLoading.hide();
			}
			);
			$scope.map = map;
			gPlaceService = new google.maps.places.PlacesService(map);
		});


// function getAddress(raw) {
// 	var jalan;
// 	var route;
// 	var nomor;
// 	var premise;
// 	var kodepos;
// 	var kelurahan;
// 	console.log(raw);
// 	for(var i = 0;i < raw.length;i++){
// 		console.log(raw[i]);
// 		console.log(raw[i].types[0]);
// 		if(raw[i].types[0] =="street_address"){
// 			jalan = raw[i].short_name;
// 		}
// 		if(raw[i].types[0] =="street_number"){
// 			nomor = raw[i].short_name;
// 		}
// 		if(raw[i].types[0] =="route"){
// 			route = raw[i].short_name;
// 		}
// 		if(raw[i].types[0] =="premise"){
// 			premise = raw[i].short_name;
// 		}
// 		if(raw[i].types[0] =="postal_code"){
// 			kodepos = raw[i].short_name;
// 		}
// 		if(raw[i].types[0] =="administrative_area_level_4"){
// 			kelurahan = raw[i].short_name;
// 		}
// 	}
// 	return '' + route +' ' + nomor;
// }

function geocodeLatLng(geocoder, map, loc) {
	var latlngStr = loc.split(',', 2);
	var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[0]) {
							//document.getElementById('locationName').innerHTML = results[1].formatted_address;
							var locName = results[0].formatted_address;
							// if(getAddress(results[0].address_components) != "n/a"){
							// 	locName = getAddress(results[0].address_components);
							// }
							// else{
							// 	locName = results[0].formatted_address;
							// }
							if(locName.length > 50){
								locName=locName.slice(0,50)+"...";
							}
							document.getElementById('resv_from').innerHTML = locName;
							$scope.locPoint.name = locName;
						} else {
							document.getElementById('resv_from').innerHTML = 'n/a';
							$scope.locPoint.name = '';
						}
					} else {
						document.getElementById('resv_from').innerHTML = 'n/a';
						$scope.locPoint.name = '';
					}
				});
}
}
/* ===================== END OF MAP INITIALIZATION FUNCTION ===================== */

}]);