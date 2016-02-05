app.directive('shelf', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shelf/shelf.html',
        controller: 'ShelfCtrl'
    };
});

app.controller('ShelfCtrl', function ($scope, SwagFactory) { 
    SwagFactory.fetchSwag()
    .then(function (swagittyswags) {
        $scope.swags = swagittyswags;
    })
});