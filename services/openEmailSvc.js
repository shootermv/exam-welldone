/**
 * Created by moshe on 6/21/2015.
 */
angular.module('locationsApp').factory('openEmailSvc', function(deviceReady, locationsSvc, $cordovaFile){
    return function(done) {
        deviceReady(function () {

            var data =JSON.stringify(locationsSvc.list())

            $cordovaFile.createFile(cordova.file.externalDataDirectory , 'locations.json', true).then(function(result) {
                // File succesfully created
                $cordovaFile.writeFile(cordova.file.externalDataDirectory , 'locations.json', data, {
                    'append': false
                }).then(function(result) {
                    // Success! image contents succesfully written to file but it does not open succesfully
                    cordova.plugins.email.open({
                        subject: 'your locations',
                        body:    'Here are all your locations:',
                        attachments:cordova.file.externalDataDirectory + 'locations.json'
                    });
                }, function(err) {
                    // An error occured. Show a message to the user
                    alert('file write error : ' + JSON.stringify(err));
                });
            }, function(err) {
                // An error occured. Show a message to the user
                alert('file create error : ' + JSON.stringify(err));
            });

        });
    }

});