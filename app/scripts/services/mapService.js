'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
   mapApp.service('mapService', function () {
      var map;
      this.setMap = function (myMap) {
        map = myMap;
      };
      this.getMap = function () {
        if (map) return map;
        throw new Error("Map not defined");
      };
      this.getLatLng = function () {
        var center = map.getCenter();
        return {
          lat: center.lat(),
          lng: center.lng()
        };
      };
    });