app.directive('reward', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/reward/reward.html',
        link: function($scope) {
        	$scope.moreInfo = false;
        	$scope.showMoreInfo = function() {
        		$scope.moreInfo =  $scope.moreInfo ? false : true;
    		}
        }

    };
});