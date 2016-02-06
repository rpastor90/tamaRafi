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

app.controller('CribCtrl', function ($scope, $state, user, AuthService, SwagFactory, swags) {

    var swagPositions = [];
    var swagSizes = [];

    $scope.user = user;
    $scope.isShown = false;
    $scope.swags = swags;

    $scope.logout = function() {
        AuthService.logout()
        .then(function() {
            $state.go('home');
        });
    };


    var onDragStop = function(event, ui, swag) {
        console.log(ui.helper.context.style.width, "UI AND EVET")
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
            console.log('EVENT PAGE X AND Y BEFORE PUSHED', event.pageX, event.pageY)
            swagPositionObj.posX = event.pageX - Number(ui.helper.context.style.width.split('.')[0])/2 + 'px';
            swagPositionObj.posY = event.pageY + Number(ui.helper.context.style.height.split('.')[0])/2 + 'px';
            console.log('AFTER', swagPositionObj)
            swagPositions.push(swagPositionObj);
        } else {
            swagPositions[indexStore].posX = event.pageX - Number(ui.helper.context.style.width.split('.')[0])/2 + 'px';
            swagPositions[indexStore].posY = event.pageY + Number(ui.helper.context.style.height.split('.')[0])/2 + 'px';
        }
        // And push to the swagPositions array
        console.log("updated swagPositions", swagPositions);

        // Remove this element from the dock and set position

        //MIGHT STILL NEED THIS
        var detached = $(event.target).detach();
        $('.notTheDock').append(detached);
        detached.css('position', 'fixed');
        console.log('UI POSITION', ui.position)
        console.log('this is the width', ui.helper.context, event.pageX)
        // console.log('this is the height', Number(ui.helper.context.style.height.split('.')[0]))
        if (ui.helper.context.style.width && ui.helper.context.style.height) {
            detached.css('left', event.pageX - Number(ui.helper.context.style.width.split('.')[0])/2  + 'px');
            detached.css('top', event.pageY + Number(ui.helper.context.style.height.split('.')[0])/2 + 'px');
        }
    };

    var onResizeStop = function(event, ui, swag) {
        console.log(ui, 'THIS IS THE UI ON RESIZE FUNC')
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
            swagSizeObj.height = Number(ui.helper.context.style.height.split('.')[0])/2 + 'px';
            swagSizeObj.width = Number(ui.helper.context.style.width.split('.')[0])/2 + 'px';
            swagSizes.push(swagSizeObj);

        } else {
            swagSizes[indexStore].height = Number(ui.helper.context.style.height.split('.')[0])/2 + 'px';
            swagSizes[indexStore].width = Number(ui.helper.context.style.width.split('.')[0])/2 + 'px';
        }
    }

    $scope.onDrag = function(event) {
        console.log(event.pageX, event.pageY)
    };

    $scope.toggleButtons = function() {
        $scope.customizing = !$scope.customizing ? true : false
    };

    $scope.saveSwagPositionsAndSizes = function() {
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
