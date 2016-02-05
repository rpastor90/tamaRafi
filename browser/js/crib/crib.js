app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            user: function (AuthService, UserFactory) {
                return AuthService.getLoggedInUser()
                    .then(function(user) {
                        return UserFactory.getUser(user);
                    })
            },
            swags: function (SwagFactory, $animate, user) {
                return SwagFactory.fetchSwagByUser(user)
            }
        }
    });

});

app.controller('CribCtrl', function ($scope, $state, user, AuthService, SwagFactory, swags) {

    var swagPositions = [];
    var swagSizes = [];

    $scope.user = user;
    $scope.isShown = false;
    $scope.swags = swags;
    // $scope.toggle = function9
    $scope.logout = function() {
        AuthService.logout()
            .then(function() {
                $state.go('home');
            });
    };

    var onDragStop = function(event, ui, swag) {
        console.log(arguments, "ARGUMENTS");
        var bool = false;
        var indexStore = null;
        swagPositions.forEach(function(swagObj, i) {
            console.log("swagObj in onStop function", swagObj)
            if (swagObj.swag === swag._id) {
                bool = true;
                indexStore = i;
            }
        });

        var swagPositionObj = {};

        if (!bool) {
            swagPositionObj.swag = swag._id;
            // Create the position object
            swagPositionObj.posX = event.pageX + 'px';
            swagPositionObj.posY = event.pageY + 'px';
            swagPositions.push(swagPositionObj);
        } else {
            swagPositions[indexStore].posX = event.pageX + 'px';
            swagPositions[indexStore].posY = event.pageY + 'px';
        }
        // And push to the swagPositions array
        console.log("updated swagPositions", swagPositions);

        // Remove this element from the dock and set position

        //MIGHT STILL NEED THIS
        var detached = $(event.target).detach();
        $('.notTheDock').append(detached);
        detached.css('position', 'fixed');
        detached.css('left', event.pageX + 'px');
        detached.css('top', event.pageY + 'px');
    };

    var onResizeStop = function(event, ui, swag) {

        var bool = false;
        var indexStore = null;
        swagSizes.forEach(function(swagObj, i) {
            console.log("swagObj in onStop function", swagObj)
            if (swagObj.swag === swag._id) {
                bool = true;
                indexStore = i;
            }
        });

        var swagSizeObj = {};

        if (!bool) {

            swagSizeObj.swag = swag._id;
            swagSizeObj.height = ui.size.height + 'px';
            swagSizeObj.width = ui.size.width + 'px';
            swagSizes.push(swagSizeObj);

        } else {
            swagSizes[indexStore].height = ui.size.height + 'px';
            swagSizes[indexStore].width = ui.size.width + 'px';
        }
        console.log(swagSizes, "SWAG SIZES")
    }

    $scope.onDrag = function(event) {
        console.log(event.pageX, event.pageY)
        console.log("draggin")
    };

    $scope.toggleButtons = function() {
        $scope.customizing = !$scope.customizing ? true : false
    };

    $scope.saveSwagPositionsAndSizes = function() {
        console.log(swagPositions, "SWAG POS") // key here is the swag._id
        SwagFactory.updateSwagPositions(swagPositions, user)
        SwagFactory.updateSwagSizes(swagSizes, user)
    };

    $scope.reset = function() {
        var cribItems = $('.notTheDock li').toArray();
        cribItems.forEach(function(cribItem) {
            $(cribItem).detach();
            $('.dock ul').append(cribItem);
            $(cribItem).css('position', 'relative');
            $(cribItem).css('left', 'auto');
            $(cribItem).css('top', 'auto');
            $(cribItem).css('width', '100px');
            $(cribItem).css('height', '100px');
        })
    };

    $scope.makeCustomizable = function() {
        var allCribItems = $('.crib li').toArray();
        allCribItems.forEach(function(cribItem, idx) {
            // console.log(cribItem)
            cribItem = $(cribItem);
            // cribItem.attr('data-drag','true')
            // cribItem.attr('jqyoui-draggable', "{onStart: 'onStart(swag)', onDrag:'onDrag', onStop:'onStop(swag)'}" );
            // cribItem[0].draggable = true;
            cribItem.resizable({
                resize: function(e, ui) {
                    console.log(e, ui, "in resize")
                },
                autohide: true,
                stop: function(e, ui) {
                    return onResizeStop(e, ui, $scope.swags[idx])
                }
            })
            cribItem.draggable({
                stop: function(event, ui) {
                    return onDragStop(event, ui, $scope.swags[idx])
                }
            });
        });
    }
});

app.directive('setPosition', function() {
    console.log("in directive")
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            for (var i = 0; i < scope.user.animal.swagPositions.length; i++) {
                if (scope.user.animal.swagPositions[i].swag === scope.swag._id) {
                    var detached = $(element).detach();
                    $('.notTheDock').append(detached);
                    element.css('position', 'fixed');
                    element.css('left', scope.user.animal.swagPositions[i].posX);
                    element.css('top', scope.user.animal.swagPositions[i].posY);

                };
            };
            for (var i = 0; i < scope.user.animal.swagSizes.length; i++) {
                if (scope.user.animal.swagSizes[i].swag === scope.swag._id) {
                    var detached = $(element).detach();
                    $('.notTheDock').append(detached);
                    element.css('position', 'fixed');
                    element.css('width', scope.user.animal.swagSizes[i].width);
                    element.css('height', scope.user.animal.swagSizes[i].height);

                };
            }
        }
    }
});