'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('markersService', function() {
    this.markers = [];
    this.getMarkerBylocationId = function(locationId) {
        var marker, i;
        for (i = this.markers.length - 1; i >= 0; i--) {
            marker = this.markers[i];
            if (marker.get("id") === locationId) {
                return marker;
            }
        }
        return false;
    };
 
});