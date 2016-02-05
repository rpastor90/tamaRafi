app.factory('LeaderboardFactory', function ($http) {
    var LeaderboardFactory = {};
    LeaderboardFactory.getEveryone = function () {
        return $http.get('/api/users/')
        .then(function (allUsers) {
            return allUsers.data;
        })
    };
    return LeaderboardFactory;
});

app.controller('LeaderboardCtrl', function ($scope, $uibModal) {
    $scope.animationsEnabled = true;

    $scope.showLeaderboard = function() {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/leaderboard/leaderboard.html',
            controller: 'OpenLeaderboardCtrl',
            resolve: {
                user: function(AuthService) {
                    return AuthService.getLoggedInUser();
                }
            }
        });
    };
})
.controller('OpenLeaderboardCtrl', function($scope, $uibModalInstance, user, LeaderboardFactory) {
    $scope.user = user;
    
    var fullstackers = [
        {
            name: 'Joe',
            animal: { totalSteps: 5000 }
        },
        {
            name: 'Katkat',
            animal: { totalSteps: 99999999 }
        },
        {
            name: 'Sethwazhere',
            animal: { totalSteps: 1972394 }
        },
        {
            name: 'Mark',
            animal: { totalSteps: 51432 }
        },
        {
            name: 'Jess',
            animal: { totalSteps: 1893847 }
        }
    ]

    LeaderboardFactory.getEveryone()
    .then(function (allUsers) {
        fullstackers.forEach(function (fakeProfile) {
            allUsers.push(fakeProfile);
        })
        $scope.rankedUsers = allUsers.sort(function (a, b) {
            return b.animal.totalSteps - a.animal.totalSteps;
        })
    })
})