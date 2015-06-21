angular.module('locationsApp')
    .factory('locationsSvc',function($window, storageKey, utils){
        var storage = angular.fromJson($window.localStorage[storageKey]) || {};
        var _locations =  storage.locations || [];
        var listKey ='locations';

        return {
            save: function (loc) {
                var isNew = !loc.id;
                //if new record added we must add it to the collection
                if(isNew){
                    loc.id = utils.generateId()
                    _locations.push(loc);
                }
                //lets save collection to storage
                utils.updateStorage(_locations, listKey);
            },
            get: function (id) {
               return utils.findById(id, _locations)
            },
            remove: function (id) {
                var _ind = utils.findIndex(id, _locations);
                if(_ind!==-1){
                    _locations.splice(_ind, 1);
                    utils.updateStorage(_locations, listKey);
                }
            },
            list: function () {
               return  _locations;
            }
        }
    })