'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp
        .directive('helloMaps', function($compile) {
            return {
                controller: function($scope, $location, mapService, mapControlsService, infoWindowService, locationsService, markersService) {
                    if ($location.path() === '') {
                        $location.path('/');
                    }

                    $scope.location = $location;
                    $scope.infow = infoWindowService;
                    $scope.controls = mapControlsService;
                    this.registerInfoWindow = function(myInfoWindow) {
                        infoWindowService.registerInfoWindow(myInfoWindow);
                    };

                    this.registerMap = function(myMap) {
                        mapService.setMap(myMap);
                        $scope.locations = locationsService;
                    };

                    $scope.$watch('location.path()', function(path) {
                        locationsService.filter = (path === '/active') ?
                                {completed: false} : (path === '/completed') ?
                                {completed: true} : null;
                    });

                    $scope.$watch('locations.filter', function() {
                        var i,
                                locations = locationsService.filtered(),
                                map = mapService.getMap(),
                                locationId,
                                marker,
                                markers = markersService.markers,
                                markerId,
                                uniquelocations = {};

                        function addMarkerBylocationIndex(locationIndex) {
                            var marker,
                                    markerOptions,
                                    location = locations[locationIndex];

                            markerOptions = {
                                map: map,
                                title: location.title,
                                position: new google.maps.LatLng(location.lat, location.lng),
                       
                                phone: location.phone,
                                addr: location.addr,
                                  icon: {
                    url: "images/small_marker.png",
    
                },
                                labelClass:"markerBackground"
                            };
                            marker = new MarkerWithLabel(markerOptions);

                            marker.setValues({
                                id: location.id,
                                desc: location.desc
                            });
                            markersService.markers.push(marker);

                            function markerClickCallback(scope, locationId) {
                                return function() {
                                    scope.$apply(function() {
         
                      
                                        mapControlsService.openInfoWindowBylocationId(locationId);
                                    });
                                };
                            }
                            google.maps.event.addListener(marker, 'click', markerClickCallback($scope, location.id));

                            function markerDblClickCallback(scope, locationId) {
                                return function() {
                                    scope.$apply(function() {
                               if(mapControlsService.user){
                                        mapControlsService.editlocationById(locationId);
                                    }
                                    });
                                };
                            }
                            google.maps.event.addListener(marker, 'dblclick', markerDblClickCallback($scope, location.id));
                        }

                        for (i = locations.length - 1; i >= 0; i--) {

                            uniquelocations[locations[i].id] = i;
                        }


                        for (i = markers.length - 1; i >= 0; i--) {
                            marker = markers[i];
                            markerId = marker.get("id");
                            if (uniquelocations[markerId] !== undefined) {
                                //   delete uniquelocations[markerId];
                            } else {
                                marker.setMap(null);
                                markers.splice(i, 1);
                            }
                        }

                        for (locationId in uniquelocations) {

                            if (uniquelocations.hasOwnProperty(locationId)) {

                                addMarkerBylocationIndex(uniquelocations[locationId]);
                            }
                        }
                    });
                },
                link: function(scope, elem, attrs, ctrl) {
                    var mapOptions,
                            latitude = attrs.latitude,
                            longitude = attrs.longitude,
                            testWindowTemplate,
                            testWindowElem,
                      
                        loginFormTemplate,
                            loginFormElem,
                            infoWindowTemplate,
                            infoWindowElem,
                            infowindow,
                            locationsControlTemplate,
                            locationsControlElem,
                            editlocationControlTemplate,
                            editlocationControlElem,
                            mapStyles,
                            map;

                    latitude = latitude && parseFloat(latitude, 10) || -36.8404;
                    longitude = longitude && parseFloat(longitude, 10) || 174.7399;

                    
                    infoWindowTemplate = document.getElementById('infoWindowTemplate').innerHTML.trim();
                    infoWindowElem = $compile(infoWindowTemplate)(scope);
                    infowindow = new google.maps.InfoWindow({
                        content: infoWindowElem[0]
                    });

                    ctrl.registerInfoWindow(infowindow);

                    mapStyles = [{
                            featureType: 'all',
                            stylers: [
                            //    {hue: '#0000b0'},
                                {invert_lightness: 'true'},
                                {saturation: -30}
                            ]
                        }];

                    mapOptions = {
                        zoom: 12,
                        disableDefaultUI: true,
                        center: new google.maps.LatLng(latitude, longitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: mapStyles
                    };

                    google.maps.visualRefresh = true;

                    map = new google.maps.Map(elem[0], mapOptions);

                    ctrl.registerMap(map);

                    locationsControlTemplate = document.getElementById('locationsControlTemplate').innerHTML.trim();
                    locationsControlElem = $compile(locationsControlTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationsControlElem[0]);

                    testWindowTemplate = document.getElementById('testWindowTemplate').innerHTML.trim();
                    testWindowElem = $compile(testWindowTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(testWindowElem[0]);
                    
                    loginFormTemplate = document.getElementById('loginFormTemplate').innerHTML.trim();
             
                    loginFormElem = $compile(loginFormTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP_CENTER].push(loginFormElem[0]);
                    

                    editlocationControlTemplate = document.getElementById('editlocationControlTemplate').innerHTML.trim();
                    editlocationControlElem = $compile(editlocationControlTemplate)(scope);
                    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(editlocationControlElem[0]);
                }
            };

        });