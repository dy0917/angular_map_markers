'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('mapControlsService', function(infoWindowService, markersService, mapService,locationsService, NEW_location_ID) {
    this.editlocation = false;
    this.isLogin = false;
    this.user = null;
    this.editlocationId = NEW_location_ID;

    this.newlocation = function() {
     
     //                $scope.editlocation = {
//                    id: NEW_location_ID,
//                    lat: pos.lat,
//                    lng: pos.lng,
//                    saveMsg: "Save Location",
//                    cancelMsg: "Discard Location"
//                };
     
        this.editlocationById();
    };
    this.editlocationById = function(locationId) {
//        this.editlocationId = locationId || NEW_location_ID;
 this.editlocationId = locationId;
        this.editlocation = true;
    };
    this.openInfoWindowBylocationId = function(locationId) { 
        var marker = markersService.getMarkerBylocationId(locationId);
        var location= locationsService.getlocationById(locationId);
        
        if (marker) {
            infoWindowService.setData(locationId, marker.getTitle(), marker.get("desc"), marker.get("phone"), marker.get("addr"));
            infoWindowService.open(marker);
            return;
        }
    };

    this.loginclick = function() {
        this.isLogin = !this.isLogin;
      
    };

    this.setUser = function(user) {
        this.user = user;
        this.isLogin = false;

    }
//    this.login = function() {
//     console.log(user.username);
//    };

    this.test = function() {
        console.log(this.user);
    };


});