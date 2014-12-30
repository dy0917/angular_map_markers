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
                controller: function($scope, $location, mapService, mapControlsService, infoWindowService, todosService, markersService) {
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
                        $scope.todos = todosService;
                    };

                    $scope.$watch('location.path()', function(path) {
                        todosService.filter = (path === '/active') ?
                                {completed: false} : (path === '/completed') ?
                                {completed: true} : null;
                    });

                    $scope.$watch('todos.filter', function() {
                        var i,
                                todos = todosService.filtered(),
                                map = mapService.getMap(),
                                todoId,
                                marker,
                                markers = markersService.markers,
                                markerId,
                                uniqueTodos = {};


                        function addMarkerByTodoIndex(todoIndex) {
                            var marker,
                                    markerOptions,
                                    todo = todos[todoIndex];

                            markerOptions = {
                                map: map,
                                title: todo.title,
                                position: new google.maps.LatLng(todo.lat, todo.lng),
//                                labelContent: todo.title,
                       
                                phone: todo.phone,
                                addr: todo.addr,
                                  icon: {
                    url: "images/small_marker.png",
    
                },
                                labelClass:"markerBackground"
                            };
                            marker = new MarkerWithLabel(markerOptions);

                            marker.setValues({
                                id: todo.id,
                                desc: todo.desc
                            });
                            markersService.markers.push(marker);

                            function markerClickCallback(scope, todoId) {
                                return function() {
                                    scope.$apply(function() {
                                        //           marker.
                        
                                        mapControlsService.openInfoWindowByTodoId(todoId);
                                    });
                                };
                            }
                            google.maps.event.addListener(marker, 'click', markerClickCallback($scope, todo.id));

                            function markerDblClickCallback(scope, todoId) {
                                return function() {
                                    scope.$apply(function() {
                       
                                        mapControlsService.editTodoById(todoId);
                                    });
                                };
                            }
                            google.maps.event.addListener(marker, 'dblclick', markerDblClickCallback($scope, todo.id));
                        }

                        for (i = todos.length - 1; i >= 0; i--) {

                            uniqueTodos[todos[i].id] = i;
                        }


                        for (i = markers.length - 1; i >= 0; i--) {
                            marker = markers[i];
                            markerId = marker.get("id");
                            if (uniqueTodos[markerId] !== undefined) {
                                //   delete uniqueTodos[markerId];
                            } else {
                                marker.setMap(null);
                                markers.splice(i, 1);
                            }
                        }

                        for (todoId in uniqueTodos) {

                            if (uniqueTodos.hasOwnProperty(todoId)) {

                                addMarkerByTodoIndex(uniqueTodos[todoId]);
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
                            todosControlTemplate,
                            todosControlElem,
                            editTodoControlTemplate,
                            editTodoControlElem,
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

                    todosControlTemplate = document.getElementById('todosControlTemplate').innerHTML.trim();
                    todosControlElem = $compile(todosControlTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(todosControlElem[0]);

                    testWindowTemplate = document.getElementById('testWindowTemplate').innerHTML.trim();
                    testWindowElem = $compile(testWindowTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(testWindowElem[0]);
                    
                    loginFormTemplate = document.getElementById('loginFormTemplate').innerHTML.trim();
                    console.log(loginFormTemplate);
                    loginFormElem = $compile(loginFormTemplate)(scope);
                    map.controls[google.maps.ControlPosition.TOP_CENTER].push(loginFormElem[0]);
                    

                    editTodoControlTemplate = document.getElementById('editTodoControlTemplate').innerHTML.trim();
                    editTodoControlElem = $compile(editTodoControlTemplate)(scope);
                    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(editTodoControlElem[0]);
                }
            };

        });