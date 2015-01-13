'use strict';

/**
 * @ngdoc function
 * @name angularMapMarkersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMapMarkersApp
 */
mapApp.controller('loginCtrl', function($scope, mapControlsService) {
    var editPinImage,
            editMarker;

    $scope.user = {};

    $scope.login = function() {
        var user = $scope.user;
        if (user.username == "admin" && user.password == "Pa55word")
        {

            mapControlsService.setUser($scope.user);
        }
        else
        {
            console.log("not login");
        }
        $scope.user = {};
    };

    $scope.onkeypress = function(keyEvent) {
        if (keyEvent.which === 13) {
        $scope.login();
        }
    };
        $scope.onkeyup = function(keyEvent) {
        if (keyEvent.which === 27) {
           $scope.reset();
        }
    };

    $scope.reset = function() {
        $scope.user = {};
        mapControlsService.isLogin = false;
    };





});
