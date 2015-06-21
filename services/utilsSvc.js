/**
 * Created by moshe on 6/20/2015.
 */
angular.module('locationsApp')
    .factory('utils',function($window, storageKey) {

   return {



        generateId: function (){
            return new Date().getTime()+'';
        },
        updateStorage: function(list, listKey){
			storage = angular.fromJson($window.localStorage[storageKey]) || {};
            storage[listKey] = list;			 
            $window.localStorage[storageKey]= angular.toJson(storage);
        },
        findById: function(id, list){
            var found = list.filter(function(loc, ind){
                return loc.id===id;
            })
            return found && found.length && found[0]
        },
        findIndex: function(id, list){
            var _ind = null;
            //find  index
            var found = list.filter(function(loc, ind){
                if(loc.id===id){_ind = ind;}
                return loc.id===id;
            })
            if(!found){return -1;}
            return _ind;
        }
   }
})
