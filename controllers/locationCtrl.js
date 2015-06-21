/**
 * Created by moshe on 6/19/2015.
 */
angular.module('locationsApp')
    .controller('locationCtrl', function($scope, locationsSvc, $state, categories, $timeout, openEmailSvc) {
        //initialize controller
        function activate(){
            $scope.locations = locationsSvc.list();
            $scope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                 if(/location.edit/g.test(toState.name )) {
                     $scope.location = $scope.selected = locationsSvc.get(toParams.id)
					 $timeout(function(){
					 $('#categories').val($scope.location.categories[0].id).trigger("liszt:updated");
					 },200)
                 }
                 if(/location.new/g.test(toState.name )) {
                     $scope.location = {};
                 }
            })
        }
        // we will store all of our form data in this object
        $scope.location = {};
		//for multi select
        $scope.categories = categories;
         // for selecting some location from list
        $scope.select = function(loc){
            navigator && navigator.notification && navigator.notification.vibrate(500);
            $scope.selected = $scope.selected && $scope.selected.id===loc.id ?null: loc;
        }
        //go to edit mode
        $scope.selectAndGo = function(event) {
            if(!$scope.selected){
                alert('nothing selected');
                return;
            }

            $scope.location = $scope.selected;

        }

        //export
        $scope.exportLocations = function(){
            openEmailSvc()
        }

        //remove the location
        $scope.remove = function(selected){
           if(!selected){
               alert('nothing selected');
               return;
           }

           locationsSvc.remove(selected.id);
           $scope.selected = null;
           $state.go('location.list')
        }

        // function to save location
        $scope.saveLocation = function() {
			if($scope.locationForm.$invalid){
                return;
            }
			
            var cp =angular.copy($scope.location), isNew = !$scope.location.id;

            locationsSvc.save(cp);
            if(isNew){//clear the form
                 $scope.location = {};
				 $scope.locationForm.$setPristine();
				 

            }
            //notification:
           	$scope.showSuccess = true;
            $timeout(function(){$scope.showSuccess = false;},500)
        };

        //initialize
        activate();
    });