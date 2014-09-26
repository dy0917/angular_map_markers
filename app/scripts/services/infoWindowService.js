'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('infoWindowService', function (mapService) {
      var infowindow;
      this.data = {};
      this.registerInfoWindow = function (myInfoWindow) {
        infowindow = myInfoWindow;
      };
      this.setData = function (todoId, todoTitle, todoDesc) {
        this.data.id = todoId;
        this.data.title = todoTitle;
        this.data.desc = todoDesc;
      };
      this.open = function (marker) {
        infowindow.open(mapService.getMap(), marker);
      };
      this.close = function () {
        if (infowindow) {
          infowindow.close();
          this.data = {};
        }
      };
    });