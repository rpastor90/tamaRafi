app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            user : function (UserFactory) {
                return UserFactory.getUser();
                    
            },
            swags: function(SwagFactory, $animate, user) {
                return SwagFactory.fetchSwagByUser(user);
            }
        }
    });

});

app.controller('CribCtrl', function ($rootScope, $scope, $state, user, AuthService, SwagFactory, swags) {

    var swagPositions = [];
    var swagSizes = [];

    $scope.user = user;
    $scope.isShown = false;
    $scope.swags = swags;

    $scope.isHat = false;

    $scope.wearHat = function (swag) {
        if (swag.name === 'top hat') {
            $scope.isHat = true;
            $('#creatureContainer').css('background', 'url("http://i.imgur.com/fMwP5tf.png")');
        }
        if (swag.name === 'storm trooper') {
            $scope.isHat = true;
            $('#creatureContainer').css('background', 'url("http://i.imgur.com/JgVnEiy.png")');
        }
    }

    $scope.changeBackground = function (swag) {
        console.log("inside the fuction ", swag);
        if (swag.category === 'background') {
            if (swag.name === 'brick') {
                $('.crib').css('background', 'url("http://i.imgur.com/Hv9Be1e.png") no-repeat center center fixed');
    // -moz-background-size: cover;
    // -o-background-size: cover;
    // background-size: cover;
    // position: fixed;
    // top: 0;
    // left: 0;
            }
            if (swag.name === 'space') {
                $('.crib').css('background', 'url("http://i.imgur.com/cqOaGQe.png") no-repeat center center fixed');
            }
                $('.crib').css('-webkit-background-size', 'cover');
                $('.crib').css('background-size', 'cover');
                $('.crib').css('position', 'fixed');
                $('.crib').css('top', '0');
                $('.crib').css('left', '0');
                $('.crib').css('min-width', '100%');
                $('.crib').css('min-height', '100%');
                $('.crib').css('z-index', '-1');
        }

    }

    $scope.logout = function() {
        AuthService.logout()
        .then(function() {
            $state.go('home');
        });
    };

    var onDragStop = function(event, ui, swag) {
        var bool = false;
        var indexStore = null;
        swagPositions.forEach(function(swagObj, i) {
            if (swagObj.swag === swag._id) {
                bool = true;
                indexStore = i;
            }
        });

        var swagPositionObj = {};


        if (!bool) {
            swagPositionObj.swag = swag._id;
            // Create the position object
           swagPositionObj.posX = event.pageX - Number(ui.helper.context.style.width.slice(0,-2))/2 + 'px';
            swagPositionObj.posY = event.pageY + Number(ui.helper.context.style.height.slice(0,-2))/2 + 'px';
            swagPositions.push(swagPositionObj);
        } else {
            swagPositions[indexStore].posX = event.pageX - Number(ui.helper.context.style.width.slice(0,-2))/2  + 'px';
            swagPositions[indexStore].posY = event.pageY + Number(ui.helper.context.style.height.slice(0,-2))/2  + 'px';
        }
        // And push to the swagPositions array
        
        // Remove this element from the dock and set position

        //MIGHT STILL NEED THIS
        var detached = $(event.target).detach();
        $('.notTheDock').append(detached);
        detached.css('position', 'fixed');
        //getting rid of this && ui.helper.context.style.height
            console.log("in reset")
            detached.css('left', (event.pageX + 'px'));
            detached.css('top', (event.pageY + 'px'));
        
    };

    var onResizeStop = function(event, ui, swag) {
        var bool = false;
        var indexStore = null;
        swagSizes.forEach(function(swagObj, i) {
            if (swagObj.swag === swag._id) {
                bool = true;
                indexStore = i;
            }
        });

        var swagSizeObj = {};

        // if (!bool) {
        //     swagSizeObj.swag = swag._id;
        //     swagSizeObj.height = ui.helper.context.style.height + 'px';
        //     swagSizeObj.width = ui.helper.context.style.width + 'px';
        //     swagSizes.push(swagSizeObj);
        // } else {
        //     swagSizes[indexStore].height = ui.helper.context.style.height + 'px';
        //     swagSizes[indexStore].width = ui.helper.context.style.width + 'px';
        // }
        if (!bool) {
            swagSizeObj.swag = swag._id;
            swagSizeObj.height = ui.helper.context.style.height;
            swagSizeObj.width = ui.helper.context.style.width;
            swagSizes.push(swagSizeObj);

        } else {
            swagSizes[indexStore].height = ui.helper.context.style.height;
            swagSizes[indexStore].width = ui.helper.context.style.width;
        }
    }

    $scope.onDrag = function(event) {
        console.log(event.pageX, event.pageY)
    };

    $scope.toggleButtons = function() {
        $scope.customizing = !$scope.customizing;
    };

    $scope.saveSwagPositionsAndSizes = function() {
        SwagFactory.updateSwagPositions(swagPositions, user)
        SwagFactory.updateSwagSizes(swagSizes, user)
    };

    $scope.reset = function() {
        $scope.isHat = false;
        $('#creatureContainer').css('background', 'url("http://createalittle.com/wp-content/uploads/2014/01/panda_colour.png")');
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
            cribItem = $(cribItem);
            if ($scope.customizing) {
                cribItem.resizable({
                    resize: function(e, ui) {
                        // console.log(e, ui, "in resize")
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
            } else {
                console.log('THIS SHOULD PRINT IF TRYING TO RESIZE AFTER SAVE')
                cribItem.removeClass('ui-resizable ui-draggable ui-draggable-handle');
            }
        });
    }

});

app.directive('setPosition', function() {
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
