/**
 * Created by moshe on 6/21/2015.
 */

angular.module('locationsApp').factory('deviceReady', function(){
    return function(done) {
        if (typeof window.cordova === 'object') {
            document.addEventListener('deviceready', function () {
                done();
            }, false);
        } else {
            done();
        }
    };
});