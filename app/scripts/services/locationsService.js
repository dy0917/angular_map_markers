'use strict';
/**
 * @ngdoc function
 * @name angularMapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMapApp
 */
mapApp.service('locationsService', function($filter, $location,$http) {
    // nextId and list both have mock starting data
    this.searchString = "";
    this.nextId = 4;
    this.items = [
        {
            id: 0,
            title: '梧桐树花园私房菜',
            addr: '354 Remuera Road, Remuera, Auckland City',
            phone: '09-5201099',
            desc: '',
            lat: -36.8800528,
            lng: 174.7972431
        }, {
            id: 1,
            title: '鼎鼎香火锅',
            addr: 'Unit 14, 16 Gooch Pl, MeadowLand, Auckland',
            phone: '09-5335008',
            desc: '',
            lat: -36.912178,
            lng: 174.927837
        }, {
            id: 2,
            title: '小肥羊Newmarket总店',
            addr: '27 Davis Crescent, New Market, Auckland',
            phone: '09-5206866',
            desc: '',
            lat: -36.8660628,
            lng: 174.7778149
        },
        {id: 3,
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
        return $filter('filter')(this.items).length;
    };
    this.getlocationById = function(locationId) {
        var location, i;
        for (i = this.items.length - 1; i >= 0; i--) {
            location = this.items[i];
            if (location.id === locationId) {
                return location;
            }
        }
        return false;
    };
    this.addlocation = function(title, desc, lat, lng) {
        var newlocation = {
            location: {
            id: this.nextId++,
            title: title,
            desc: desc,
            lat: lat,
            lng: lng
        }
        };
        console.log(newlocation);
//        JSON.stringify(newlocation);
       var that=this;
                this.items.push(newlocation); 
                
//              $http.post(apiPath+'/location/create', newlocation).
//  success(function(data, status, headers, config) {
//          that.items.push(newlocation); 
//      console.log(data);
//  }).
//  error(function(data, status, headers, config) {
//      console.log(data);
//    
//  });
        
    
    };
    this.updatelocation = function(locationId, title, desc, lat, lng, comp) {
        var location = this.getlocationById(locationId);
        if (location) {
            location.title = title;
            location.desc = desc;
            location.lat = lat;
            location.lng = lng;
            location.completed = comp;
            location.id = this.nextId++;
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