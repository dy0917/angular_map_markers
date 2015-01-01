'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('mapControlsService', function(infoWindowService, markersService, mapService,todosService, NEW_TODO_ID) {
    this.editTodo = false;
    this.isLogin = false;
    this.user = null;
    this.editTodoId = NEW_TODO_ID;

    this.newTodo = function() {
        this.editTodoById();
    };
    this.editTodoById = function(todoId) {
 
//        this.editTodoId = todoId || NEW_TODO_ID;
 this.editTodoId = todoId;
        this.editTodo = true;
    };
    this.openInfoWindowByTodoId = function(todoId) { 
        var marker = markersService.getMarkerByTodoId(todoId);
        var todo= todosService.getTodoById(todoId);
        
     console.log(todo.lat, todo.lng);
        if (marker) {
            infoWindowService.setData(todoId, marker.getTitle(), marker.get("desc"), marker.get("phone"), marker.get("addr"));
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