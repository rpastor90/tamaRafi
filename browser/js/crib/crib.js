app.config(function($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        data: {
            authenticate: true
        },
        resolve: {
            user: function(UserFactory) {
                return UserFactory.getUser();
            },
            swags: function(SwagFactory, user) {
                if (SwagFactory.getUserSwagCache().length) return SwagFactory.getUserSwagCache();
                else return SwagFactory.fetchSwagByUser(user);
            },
            average: function (user) {
                var steps = user[user.fitness].steps / user.animal.stepsGoal;
                var sleep = (user[user.fitness].sleep/60) / user.animal.sleepGoal;
                return (steps + sleep)/2 * 100;
            }
        }
    });

});

app.controller('CribCtrl', function($rootScope, $scope, $state, user, AuthService, SwagFactory, swags, average) {

    var editedSwagObj = {};

    $scope.user = user;
    $scope.isShown = false;
    $scope.swags = SwagFactory.getUserSwagCache();

    // sad or happy panda state
    $scope.average = average;
    
    $scope.wearHat = function(swag) {
        if (swag.name === 'top hat') {
            $scope.removeMe = function (removeSwag) {
                if (removeSwag === swag) {
                    swag.hide = true;
                }
            };
            $('#creatureContainer').css('background', 'url("http://i.imgur.com/fMwP5tf.png")');
        }
        if (swag.name === 'storm trooper') {
            $scope.removeMe = function (removeSwag) {
                if (removeSwag === swag) {
                    swag.hide = true;
                }
            };
            $('#creatureContainer').css('background', 'url("http://i.imgur.com/JgVnEiy.png")');
        }
    };

    $scope.changeBackground = function(swag) {
        if (swag.category === 'background') {
            $scope.removeMe = function (removeSwag) {
                if (removeSwag === swag) {
                    swag.hide = true;
                }
            };
            if (swag.name === 'brick') {
                $('.crib').removeClass('normal-background space-background').addClass('brick-background');
            }
            if (swag.name === 'space') {
                $('.crib').removeClass('normal-background brick-background').addClass('space-background');
            }
        }
    };

    var onDragStop = function(event, ui, swag) {

        var leftPos = ui.offset.left + 'px';
        var topPos = ui.offset.top + 'px';
        swag.left = leftPos;
        swag.top = topPos;
        swag.dockSwag = false;

        editedSwagObj[swag._id] = swag;

        var detached = $(event.target).detach();
        $('.notTheDock').append(detached);
        detached.css('position', 'fixed');
        detached.css('left', (leftPos));
        detached.css('top', (topPos));

    };

    var onResizeStop = function(event, ui, swag) {
        swag.height = ui.helper.context.style.height;
        swag.width = ui.helper.context.style.width;
        swag.dockSwag = false;
        editedSwagObj[swag._id] = swag;
    };

    $scope.toggleButtons = function() {
        $scope.customizing = !$scope.customizing;
    };

    $scope.saveSwagPositionsAndSizes = function() {
        SwagFactory.updateCrib(editedSwagObj, user);
    };
    
    $scope.reset = function() {
        swags.forEach(function (swag) {
            swag.hide = false;
        });
        
        $('.crib').removeClass('space-background brick-background').addClass('normal-background');

        var cribItems = $('.notTheDock li').toArray();
        cribItems.forEach(SwagFactory.putOnDock);
    };

    $scope.makeUnCustomizable = function () {
        var allCribItems = $('.crib li').toArray();
        allCribItems.forEach(function(cribItem) {
            $(cribItem).resizable({disabled: true}).draggable({disabled: true});
        });
    };

    $scope.makeCustomizable = function() {
        var allCribItems = $('.crib li').toArray();
        allCribItems.forEach(function(cribItem, idx) {
            cribItem = $(cribItem);
            cribItem.resizable({
                disabled: false,
                autohide: true,
                stop: function(e, ui) {
                    return onResizeStop(e, ui, $scope.swags[idx]);
                }
            });
            cribItem.draggable({
                disabled: false,
                stop: function(event, ui) {
                    return onDragStop(event, ui, $scope.swags[idx]);
                }
            });
        });
    };

});

app.directive('setPosition', function(SwagFactory) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            const swagArray = SwagFactory.getUserSwagCache();
            console.log("this is the swagArray, will it update?", swagArray);
            for (let i = 0; i < swagArray.length; i++) {
                if (swagArray[i]._id === scope.swag._id) {
                    const detached = $(element).detach();
                    if (swagArray[i].dockSwag) {
                        SwagFactory.putOnDock(detached);
                    } else {
                        $('.notTheDock').append(detached);
                        element.css('position', 'fixed');
                        element.css('left', swagArray[i].left);
                        element.css('top', swagArray[i].top);
                        element.css('width', swagArray[i].width);
                        element.css('height', swagArray[i].height);
                    }
                };
            };
        }
    };
});
