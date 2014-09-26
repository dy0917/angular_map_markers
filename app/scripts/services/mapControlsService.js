'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('mapControlsService', function(infoWindowService, markersService, NEW_TODO_ID) {
    this.editTodo = false;
    this.editTodoId = NEW_TODO_ID;
    this.newTodo = function() {
        this.editTodoById();
    };
    this.editTodoById = function(todoId) {
        this.editTodoId = todoId || NEW_TODO_ID;
        this.editTodo = true;
    };
    this.openInfoWindowByTodoId = function(todoId) {
        var marker = markersService.getMarkerByTodoId(todoId);
        if (marker) {
            infoWindowService.setData(todoId, marker.getTitle(), marker.get("desc"));
            infoWindowService.open(marker);
            return;
        }
    };
    this.test = function()
    {
        console.log("test");
    };
});