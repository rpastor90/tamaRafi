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
        // Create the position object
        var swagPositionObj = {};
        swagPositionObj.swag = swag._id;
        swagPositionObj.posX = event.pageX + 'px';
        swagPositionObj.posY = event.pageY + 'px';
        // And push to the swagPositions array
        swagPositions.push(swagPositionObj);

        // Remove this element from the dock and set position
        var detached = $(event.target).detach();
        $('.notTheDock').append(detached);
        detached.css('position', 'fixed');
        detached.css('left', event.pageX + 'px');
        detached.css('top', event.pageY + 'px');
    };
    
    $scope.onDrop = function(event, helper, swag) {
        console.log(swag, "ON DROP")
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
    console.log("in directive")
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {
            
            $(element).resizable({
                        resize: function(e, ui) {
                            console.log(e, ui, "in resize")
                            },
                        autohide: true,
                        stop: function(e, ui) {
                                 // Create the position object
                                var swagSizeObj = {};
                                swagSizeObj.swag = scope.swag._id;
                                swagSizeObj.height = ui.size.height + 'px';
                                swagSizeObj.width = ui.size.width + 'px';
                                // And push to the swagSizes array
                                swagSizes.push(swagSizeObj);
                        }
                        })


            for (var i = 0; i < scope.user.animal.swagPositions.length; i++) {
                if (scope.user.animal.swagPositions[i].swag === scope.swag._id) {
                    var detached = $(element).detach();
                    $('.notTheDock').append(detached);
                    element.css('position', 'fixed');
                    element.css('left', scope.user.animal.swagPositions[i].posX);
                    element.css('top', scope.user.animal.swagPositions[i].posY);

                    };


                    
                }
            }

        }
    });




