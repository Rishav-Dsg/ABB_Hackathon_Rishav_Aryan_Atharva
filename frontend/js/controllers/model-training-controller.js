app.controller('ModelTrainingController', function($scope, ApiService) {
    $scope.busy = false;
    $scope.trained = false;
    $scope.metrics = null;

    $scope.train = function() {
        $scope.busy = true;
        
        var body = {
            trainStart: "2021-01-01",
            trainEnd: "2021-08-31",
            testStart: "2021-09-01",
            testEnd: "2021-10-31",
            datasetType: "numeric"
        };

        // For now, we'll simulate the training since the endpoint might be different
        // In a real scenario, you would call the API
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.metrics = {
                    accuracy: 0.945,
                    precision: 0.932,
                    recall: 0.958,
                    f1Score: 0.945,
                    aucScore: 0.978
                };
                $scope.trained = true;
                $scope.busy = false;
            });
        }, 2000);

        // Uncomment this when the API endpoint is available
        /*
        ApiService.trainModel(body)
            .then(function(response) {
                if (response.data.success) {
                    $scope.metrics = response.data.data;
                    $scope.trained = true;
                } else {
                    alert(response.data.message || 'Training failed');
                }
            })
            .catch(function(error) {
                alert(error.data?.message || 'Training failed');
            })
            .finally(function() {
                $scope.busy = false;
            });
        */
    };

    $scope.nextStep = function() {
        if ($scope.trained) {
            $scope.$parent.nextStep();
        }
    };

    $scope.previousStep = function() {
        $scope.$parent.previousStep();
    };
});
