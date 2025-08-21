app.controller('RealTimeSimulationController', function($scope, ApiService) {
    $scope.simulationStarted = false;
    $scope.isSimulating = false;
    $scope.predictionData = [];
    $scope.predictionStream = [];
    $scope.liveStats = { total: 0, passed: 0, failed: 0, accuracy: 0 };

    $scope.startSimulation = function() {
        $scope.isSimulating = true;
        $scope.simulationStarted = true;
        
        var body = { 
            simulationStart: "2021-11-01", 
            simulationEnd: "2021-12-31", 
            datasetType: "numeric" 
        };

        // For now, we'll simulate the simulation since the endpoint might be different
        // In a real scenario, you would call the API
        setTimeout(function() {
            $scope.$apply(function() {
                // Generate mock data
                var mockRecords = [];
                for (var i = 0; i < 20; i++) {
                    mockRecords.push({
                        timestamp: new Date(Date.now() - i * 60000).toLocaleTimeString(),
                        id: 'SAMPLE-' + (1000 + i),
                        prediction: Math.random() > 0.3 ? 'Pass' : 'Fail',
                        confidence: Math.random() * 40 + 60,
                        temperature: Math.random() * 20 + 20,
                        pressure: Math.random() * 100 + 900,
                        humidity: Math.random() * 30 + 40
                    });
                }
                
                $scope.predictionStream = mockRecords;
                $scope.predictionData = mockRecords.slice(0, 10).map(function(r) {
                    return { time: r.timestamp, quality: Math.round(r.confidence) };
                });
                
                var total = mockRecords.length;
                var passed = mockRecords.filter(function(r) { return r.prediction === 'Pass'; }).length;
                var failed = total - passed;
                var accuracy = total ? Math.round((passed / total) * 100) : 0;
                
                $scope.liveStats = { 
                    total: total, 
                    passed: passed, 
                    failed: failed, 
                    accuracy: accuracy 
                };
                
                $scope.isSimulating = false;
            });
        }, 1500);

        // Uncomment this when the API endpoint is available
        /*
        ApiService.runSimulation(body)
            .then(function(response) {
                if (response.data.success) {
                    var rows = response.data.data.records || [];
                    $scope.predictionStream = rows;
                    $scope.predictionData = rows.slice(0, 10).map(function(r) {
                        return { time: r.timestamp, quality: Math.round(r.confidence) };
                    });
                    
                    var s = response.data.data.summary;
                    var acc = s.totalPredictions ? Math.round((s.passCount / s.totalPredictions) * 100) : 0;
                    $scope.liveStats = { 
                        total: s.totalPredictions, 
                        passed: s.passCount, 
                        failed: s.failCount, 
                        accuracy: acc 
                    };
                } else {
                    alert(response.data.message || 'Simulation failed');
                }
            })
            .catch(function(error) {
                alert(error.data?.message || 'Simulation failed');
            })
            .finally(function() {
                $scope.isSimulating = false;
            });
        */
    };

    $scope.previousStep = function() {
        $scope.$parent.previousStep();
    };
});
