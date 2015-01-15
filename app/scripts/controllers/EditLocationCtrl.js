'use strict';

/**
 * @ngdoc function
 * @name angularMapMarkersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMapMarkersApp
 */
mapApp.controller('EditlocationCtrl', function($scope, mapService, locationsService, infoWindowService, mapControlsService, NEW_location_ID) {
    var editPinImage,
            editMarker;

    $scope.editlocation = {};
    // editMarker Setup Start

    editPinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + "55FF00",
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));

    editMarker = new google.maps.Marker({
        title: "Drag Me",
        draggable: true,
        clickable: false,
        icon: editPinImage,
        position: new google.maps.LatLng(0, 0)
    });

    function editMarkerDragCallback(scope, myMarker) {

        return function() {
            var pos = myMarker.getPosition();
            scope.editlocation.lat = pos.lat();
            scope.editlocation.lng = pos.lng();
            if (!scope.$$phase)
                scope.$apply();
        };
    }
    google.maps.event.addListener(editMarker, 'drag', editMarkerDragCallback($scope, editMarker));

    function editMarkerDblClickCallback(scope) {

        return function() {
            scope.$apply(function() {
  
                scope.submitlocation();
            });
        };
    }
    google.maps.event.addListener(editMarker, 'dblclick', editMarkerDblClickCallback($scope));

    $scope.$watch(function() {
        return locationsService.searchString;
    }, function(newValue) {
        locationsService.filter={title: newValue};


    }, true);

    $scope.$watch('editlocation.lat + editlocation.lng', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            var pos = editMarker.getPosition(),
                    latitude = pos.lat(),
                    longitude = pos.lng();
            if ($scope.editlocation.lat !== latitude || $scope.editlocation.lng !== longitude)
                editMarker.setPosition(new google.maps.LatLng($scope.editlocation.lat || 0, $scope.editlocation.lng || 0));
        }
    });

    // editMarker Setup End

    $scope.$watch('controls.editlocation + controls.editlocationId', function() {
        console.log("NEW_location_ID" +NEW_location_ID);
        console.log("mapControlsService.editlocationId " +mapControlsService.editlocationId);
        var pos, location = mapControlsService.editlocationId !== NEW_location_ID && locationsService.getlocationById(mapControlsService.editlocationId);
        infoWindowService.close();
   
        if (mapControlsService.editlocation) {
            if (location) {
                console.log(location);
                $scope.editlocation = {
                    id: location.id,
                    title: location.title,
                    desc: location.desc,
                    lat: location.lat,
                    lng: location.lng,
                    comp: location.completed,
                    saveMsg: "Update Location",
                    cancelMsg: "Discard Changes"
                };
            }
            else {
                pos = mapService.getLatLng();
                $scope.editlocation = {
                    id: NEW_location_ID,
                    lat: pos.lat,
                    lng: pos.lng,
                    saveMsg: "Save Location",
                    cancelMsg: "Discard Location"
                };
            }
            editMarker.setMap(mapService.getMap());
        }
    });

    $scope.submitlocation = function() {
      
        if ($scope.editlocationForm.$valid) {
            if ($scope.editlocation.id === NEW_location_ID)
                addlocation();
            else
                editlocation();
        }
    };

    $scope.resetCloselocationForm = function() {
        editMarker.setMap(null);
        mapControlsService.editlocation = false;
        mapControlsService.editlocationId = NEW_location_ID;
        $scope.editlocation = {};
    };


    function addlocation() {
        locationsService.addlocation(
                $scope.editlocation.title,
                $scope.editlocation.desc,
                $scope.editlocation.lat,
                $scope.editlocation.lng);
        $scope.resetCloselocationForm();
    }

    function editlocation() {
        locationsService.updatelocation(
                $scope.editlocation.id,
                $scope.editlocation.title,
                $scope.editlocation.desc,
                $scope.editlocation.lat,
                $scope.editlocation.lng,
                $scope.editlocation.comp);
        $scope.resetCloselocationForm();
    }
});
