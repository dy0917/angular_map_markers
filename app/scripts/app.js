'use strict';

/**
 * @ngdoc overview
 * @name angularMapMarkersApp
 * @description
 * # angularMapMarkersApp
 *
 * Main module of the application.
 */
var apiPath="http://api.map.webfocusstudio.com";
var mapApp = angular
        .module('angularMapMarkersApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
        ])
        .config(function($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    .when('/shop/:shopid', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    
                    .when('/about', {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });
mapApp.value('NEW_TODO_ID', -1);
