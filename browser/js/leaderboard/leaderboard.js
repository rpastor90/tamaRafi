app.config(function ($stateProvider) {
    $stateProvider.state('leaderboard', {
        url: '/leaderboard',
        templateUrl: 'js/leaderboard/leaderboard.html',
        controller: 'LeaderboardCtrl',
        data : { authenticate: true },
        resolve: {
            user: function (AuthService, $state) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.factory('LeaderboardFactory', function ($http, $state, AuthService) {
    var LeaderboardFactory = {};
    LeaderboardFactory.getEveryone = function () {
        return $http.get('/api/users/')
        .then(function (allUsers) {
            return allUsers.data;
        })
    };
    return LeaderboardFactory;
});

app.controller('LeaderboardCtrl', function ($scope, $state, LeaderboardFactory, user, AuthService) {
    $scope.user = user;

    LeaderboardFactory.getEveryone()
    .then(function (allUsers) {
        $scope.rankedUsers = allUsers.sort(function (a, b) {
            return b.animal.totalSteps - a.animal.totalSteps;
        })
    })

    $scope.logout = function() {
        AuthService.logout()
        .then(function() {
            $state.go('home');
        });
    };
});
