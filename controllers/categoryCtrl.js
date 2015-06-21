/**
 * Created by moshe on 6/19/2015.
 */
// our controller for the form
// =============================================================================
angular.module('locationsApp')
    .controller('categoryCtrl', function($scope, categoriesSvc, $state, $timeout) {

        //initialize controller
        function activate(){
            $scope.categories = categoriesSvc.list();
            $scope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    if(/category.edit/g.test(toState.name )) {
                        $scope.category = $scope.selected = categoriesSvc.get(toParams.id)
                    }
                    if(/category.new/g.test(toState.name )) {
                        $scope.category = {};
                    }
                })
        }

        // for selecting some category from list
        $scope.select = function(cat){
            $scope.selected = $scope.selected && $scope.selected.id===cat.id ?null: cat;
        }
        //go to edit mode
        $scope.selectAndGo = function(event) {
            if(!$scope.selected){
                alert('nothing selected');
                return;
            }

            $scope.category = $scope.selected;

        }
        // function to save category
        $scope.saveCategory = function() {
            if($scope.categoryForm.$invalid){
                return;
            }
            var cp =angular.copy($scope.category), isNew = !$scope.category.id;

            categoriesSvc.save(cp);
            if(isNew){//clear the form

                $scope.category = {};
                $scope.categoryForm.$setPristine();
            }
            //notification:
            $scope.showSuccess = true;
            $timeout(function(){$scope.showSuccess = false;},500)

        };
        //remove the category
        $scope.remove = function(selected){
            if(!selected){
                alert('nothing selected');
                return;
            }

            categoriesSvc.remove(selected.id);
            $scope.selected = null;
            $state.go('category.list')
        }
        activate()

});