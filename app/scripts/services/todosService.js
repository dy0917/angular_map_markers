'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('todosService', function($filter, $location) {
    // nextId and list both have mock starting data
    this.searchString = "";
    this.nextId = 4;
    this.items = [
        {
            id: 0,
            completed: false,
            title: '梧桐树花园私房菜',
            addr: '354 Remuera Road, Remuera, Auckland City',
            phone: '09-5201099',
            desc: '',
            lat: -36.8800528,
            lng: 174.7972431
        }, {
            id: 1,
            completed: true,
            title: '鼎鼎香火锅',
            addr: 'Unit 14, 16 Gooch Pl, MeadowLand, Auckland',
            phone: '09-5335008',
            desc: '',
            lat: -36.912178,
            lng: 174.927837
        }, {
            id: 2,
            completed: false,
            title: '小肥羊Newmarket总店',
            addr: '27 Davis Crescent, New Market, Auckland',
            phone: '09-5206866',
            desc: '',
            lat: -36.8660628,
            lng: 174.7778149
        },
        {id: 3,
            completed: true,
            title: 'Genuine Chinese Massage 正规按摩',
            addr: '10 Cashmore Place, Flat Bush, Auckland',
            phone: '09-9488639',
            desc: '',
            lat: -36.9706643,
            lng: 174.9020878
        },
    ];
    this.filter = {};
    this.filtered = function() {
        return $filter('filter')(this.items, this.filter);
    };
    this.remainingCount = function() {
        return $filter('filter')(this.items, {completed: false}).length;
    };
    this.getTodoById = function(todoId) {
        var todo, i;
        for (i = this.items.length - 1; i >= 0; i--) {
            todo = this.items[i];
            if (todo.id === todoId) {
                return todo;
            }
        }
        return false;
    };
    this.addTodo = function(title, desc, lat, lng) {
        var newTodo = {
            id: this.nextId++,
            completed: false,
            title: title,
            desc: desc,
            lat: lat,
            lng: lng
        };
        this.items.push(newTodo);
    };
    this.updateTodo = function(todoId, title, desc, lat, lng, comp) {
        var todo = this.getTodoById(todoId);
        if (todo) {
            todo.title = title;
            todo.desc = desc;
            todo.lat = lat;
            todo.lng = lng;
            todo.completed = comp;
            todo.id = this.nextId++;
        }
    };
    this.prune = function() {
        var flag = false, i;
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].completed) {
                flag = true;
                this.items.splice(i, 1);
            }
        }
        if (flag)
            this.nextId++;
    };

    this.filterBy = function(searchString) {
        this.filter = {
            title: searchString
        };
        this.items = $filter('filter')(this.items, this.filter);

    };

});