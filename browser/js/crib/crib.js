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
    // var tracker2 = function() {
    //     var obj = document.getElementById("beingMoved")
      
    //     console.log(obj.offsetTop, obj.scrollLeft, obj.clientLeft)
    // };

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
        console.log(document.getElementById('#currentItem'))
     
    };
    $scope.onStart = function (event, helper, swag) {
        console.log(arguments, "args")
        console.log(event.pageX, event.pageY)
        console.log("testing", $scope.testing)
        console.log("you started!")
    };

    $scope.onStop = function (event, helper, swag) {
        console.log("on stop")
        SwagFactory.updateSwagPosition(swag._id, {posX: event.pageX + 'px', posY: event.pageY + 'px'})
    };

    
    $scope.startCallback = function() {
        console.log("hello");

    };
    $scope.onDrag = function(event) {
        console.log(event.pageX, event.pageY)
        console.log("draggin")
    }
   
});
app.directive('setPosition', function () {
    console.log("in position set")
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {
            console.log(scope, element, attrs)
            if (scope.swag.posX && scope.swag.posY){
                element.css('border', '3px solid black');
                element.css('position', 'fixed');
                element.css('left', scope.swag.posX);
                element.css('top', scope.swag.posY);
            }
        }
    };
});



