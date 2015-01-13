'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('infoWindowService', function(mapService) {
    var infowindow;
    this.data = {};
    this.registerInfoWindow = function(myInfoWindow) {
        infowindow = myInfoWindow;
    };
    this.setData = function(locationId, locationTitle, locationDesc, phone, addr) {

        this.data.id = locationId;
        this.data.title = locationTitle;
        this.data.desc = locationDesc;
        this.data.phone = phone;
        this.data.addr = addr;

    };
    this.open = function(marker) {
 
        infowindow.open(mapService.getMap(), marker);
        console.log(marker.getPosition());
          mapService.getMap().setCenter( marker.getPosition());
    };
    this.close = function() {
        if (infowindow) {
            infowindow.close();
            this.data = {};
        }
    };
});