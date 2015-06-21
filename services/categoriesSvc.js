angular.module('locationsApp')
.factory('categoriesSvc',function($window, storageKey, utils){
 var storage = angular.fromJson($window.localStorage[storageKey]) || {};
 var _categories =  storage.categories || [];
 var listKey = 'categories';
 return {
     save: function (cat) {
         var isNew = !cat.id;
         //if new record added we must add it to the collection
         if(isNew){
             cat.id = utils.generateId()
             _categories.push(cat);
         }
         //lets save collection to storage
         utils.updateStorage(_categories, listKey);
     },
     get:function(id){
         return utils.findById(id, _categories);
     },
     remove:function(id){
         var _ind = utils.findIndex(id, _categories);
         if(_ind!==-1){
             _categories.splice(_ind, 1);
             utils.updateStorage( _categories, listKey);
         }
     },
     list:function(){
         return _categories
     }
 }
})