'use strict';

/**
 * @ngdoc function
 * @name angularMapMarkersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMapMarkersApp
 */
angular.module('angularMapMarkersApp')
  .controller('MainCtrl', function ($scope,$location,$routeParams,$http) {
            console.log('Current route name: ' + $location.path());
      // Get all URL parameter
      console.log($routeParams);
      $http.post(apiPath+'/location/3', {msg:'hello word!'}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(data);
  }).
  error(function(data, status, headers, config) {
      console.log(data);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  });
