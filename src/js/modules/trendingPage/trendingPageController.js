(function(angular) {
    youtubeApp.controller('trendingPageController', ['$rootScope', '$scope', '$state', 'searchService', '$stateParams',
        function($rootScope, $scope, $state, searchService, $stateParams) {
            $scope.init = function() {
                var categoryId;
                switch ($stateParams.category) {
                    case 'music':
						document.title = 'ChannelAZ - Trending in Music';
                        $scope.title = 'Trending in Music';
                        categoryId = 10;
                        break;
                    case 'sports':
						document.title = 'ChannelAZ - Trending in Sports';
                        $scope.title = 'Trending in Sports';
                        categoryId = 17;
                        break;
                    case 'technology':
						document.title = 'ChannelAZ - Trending in Technology';
                        $scope.title = 'Trending in Technology';
                        categoryId = 28;
                        break;
                    case 'movies':
						document.title = 'ChannelAZ - Trending in Movies';
                        $scope.title = 'Trending in Movies';
                        categoryId = 1;
                        break;
                    case 'comedy':
						document.title = 'ChannelAZ - Trending in Comedy';
                        $scope.title = 'Trending in Comedy';
                        categoryId = 23;
                        break;
                    case 'education':
						document.title = 'ChannelAZ - Trending in Education';
                        $scope.title = 'Trending in Education';
                        categoryId = 27;
                        break;
                    default:
						document.title = 'ChannelAZ - Trending Videos';
                        $scope.title = 'Trending Videos';
                        categoryId = null;
                }

                $scope.loader = true;
                parameters = {
                    'videoCategoryId': categoryId,
                    'part': 'snippet,statistics,contentDetails',
                    'maxResults': 12,
                    'chart': 'mostPopular',
                    'pageToken' : $stateParams.pageToken
                }
                searchService.getVideos(parameters).then(function(data) {
                    for (var i = 0; i < data.items.length; i++) {
                        var id = data.items[i].id;
                        data.items[i].id = {};
                        data.items[i].id.videoId = id;
                    }
                    $scope.nextPageToken = data.nextPageToken;
                    $scope.prevPageToken = data.prevPageToken;
                    $scope.videos = data.items;
                    $scope.loader = false;
                })
            }

            $scope.nextOrPrev = function(pageToken) {
                $state.go('home.trending', { category: $stateParams.category, pageToken: pageToken });
            }
        }
    ]);
})(window.angular);
