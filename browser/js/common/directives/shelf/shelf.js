app.directive('shelf', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/shelf/shelf.html',
        scope: {
          swags : "="
        }
    };
});
