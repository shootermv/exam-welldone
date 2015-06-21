/**
 * Created by moshe on 6/21/2015.
 */
angular.module('locationsApp').factory('getCurrentPositionSvc', function(deviceReady, $document, $window, $rootScope){
    return function(done) {
        deviceReady(function(){
            navigator.geolocation.getCurrentPosition(function(position){
                $rootScope.$apply(function(){
                    done(position);
                });
            }, function(error){
                $rootScope.$apply(function(){
                    throw new Error('Unable to retreive position');
                });
            });
        });
    };
});