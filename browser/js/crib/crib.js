app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        data : { authenticate: true },
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            },
            swags: function(SwagFactory, AuthService, $animate) {
                return AuthService.getLoggedInUser()
                .then(function(user) {
                    return SwagFactory.fetchSwagByUser(user)
                })
            }
        }
    });

});




app.controller('CribCtrl', function ($scope, $state, user, AuthService, swags, SwagFactory) {

    var swagPositions = [];

    $scope.user = user;
    $scope.isShown = false;
    $scope.swags = swags;
    // $scope.toggle = function9
    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };
    $scope.setPositions = function() {


    };
    $scope.onStart = function (event, helper, swag) {

    };

    $scope.onStop = function (event, helper, swag) {
        var swagPositionObj = {};
        swagPositionObj.swag = swag._id;
        swagPositionObj.posX = event.pageX + 'px';
        swagPositionObj.posY = event.pageY + 'px';
        swagPositions.push(swagPositionObj);
        console.log(swagPositions)
        // SwagFactory.updateSwagPosition(swag._id, {posX: event.pageX + 'px', posY: event.pageY + 'px'})
    };

    $scope.startCallback = function() {


    };
    $scope.onDrag = function(event) {
        console.log(event.pageX, event.pageY)
        console.log("draggin")
    };

    $scope.toggleButtons = function() {
        $scope.customizing = !$scope.customizing ? true : false
    };

    $scope.saveSwagPositions = function() {
            console.log(swagPositions, "SWAG POS") // key here is the swag._id
        SwagFactory.updateSwagPositions(swagPositions, user)
    }

});
app.directive('setPosition', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {
            for (var i = 0; i < scope.user.animal.swagPositions.length; i++) {
                if (scope.user.animal.swagPositions[i].swag === scope.swag._id) {
                    element.css('position', 'fixed');
                    element.css('left', scope.user.animal.swagPositions[i].posX);
                    element.css('top', scope.user.animal.swagPositions[i].posY);
                }
            }
            if (scope.swag._id)
            if (scope.swag.posX && scope.swag.posY){

            }
        }
    };
});



