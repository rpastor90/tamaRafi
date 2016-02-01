app.directive('shelf', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shelf/shelf.html',
        link: function($scope) {
        	$scope.moreInfo =false;
        	$scope.showMoreInfo = function() {
        		$scope.moreInfo =  $scope.moreInfo ? false : true;
    		}
        }

    };
});