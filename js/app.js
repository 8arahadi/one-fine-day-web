// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-material', 'ion-gallery', 'jett.ionic.scroll.sista', 'jett.ionic.filter.bar', 'starter.controllers', 'starter.services','starter.directive'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('disclaimer', {
    url: '/disclaimer',
    templateUrl: 'templates/disclaimer.html',
    controller: 'MainCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'MainCtrl'
  })
  .state('maps', {
    url: '/maps',
    templateUrl: 'templates/maps.html',
    controller: 'MapsCtrl'
  })
  .state('rundown', {
    url: '/rundown',
    templateUrl: 'templates/rundown.html',
    controller: 'EventCtrl'
  })
  .state('needs', {
    url: '/needs',
    templateUrl: 'templates/needs.html',
    controller: 'EventCtrl'
  })
  .state('group', {
    url: '/group',
    templateUrl: 'templates/group.html',
    controller: 'GroupCtrl'
  })
  // setup an abstract state for the tabs directive
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'MainCtrl'
  })

  // Each tab has its own nav history stack:

  .state('app.dash', {
    cache:false,
    url: '/dash',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'MapCtrl'
      }
    }
  })
  .state('app.timeline', {
    url: '/timeline',
    views: {
      'timeline': {
        templateUrl: 'templates/timeline.html',
        controller: 'TimelineCtrl'
      }
    }
  })
  .state('app.event', {
    url: '/event',
    views: {
      'event': {
        templateUrl: 'templates/event.html',
        controller: 'EventCtrl'
      }
    }
  })
  .state('app.faq', {
    url: '/faq',
    views: {
      'faq': {
        templateUrl: 'templates/faq.html',
        controller: 'FAQCtrl'
      }
    }
  })
  .state('app.photo', {
    url: '/photo',
    views: {
      'photo': {
        templateUrl: 'templates/photo.html',
        controller: 'PhotoCtrl'
      }
    }
  })
  .state('app.disclaimer', {
    url: '/disclaimer',
    views: {
      'disclaimer': {
        templateUrl: 'templates/disclaimer.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.quiz', {
    url: '/quiz',
    views: {
      'menuContent': {
        templateUrl: 'templates/quiz.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.tripend', {
    url: '/tripend',
    views: {
      'menuContent': {
        templateUrl: 'templates/trip-end.html',
        controller: 'TripEndCtrl'
      }
    }
  })

  .state('app.history', {
    url: '/history',
    views: {
      'menuContent': {
        templateUrl: 'templates/history.html',
        controller: 'HistoryCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  
  .state('app.profile-payment', {
    url: '/profile/payment',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-payment.html',
        controller: 'ProfilePaymentCtrl'
      }
    }
  })
  
  .state('app.profile-paymentAdd', {
    url: '/profile/payment/add',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-paymentAdd.html',
        controller: 'ProfilePaymentCtrl'
      }
    }
  })
  
  .state('app.profile-favPOI', {
    url: '/profile/favPOI',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-favPOI.html',
        controller: 'ProfileFavLocCtrl'
      }
    }
  })

  .state('app.profile-point', {
    url: '/profile/point',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-point.html',
        controller: 'LoyaltyPointCtrl'
      }
    }
  })
  
  .state('app.hubungi-kami', {
    url: '/profile/call',
    views: {
      'menuContent': {
        templateUrl: 'templates/hubungi-kami.html',
        controller: 'CallUsCtrl'
      }
    }
  })

  .state('app.profile-edit', {
    url: '/profile/edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-edit.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/timeline');

});
