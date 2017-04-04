app.controller('tj', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var list = [];
	var x = 1;     //传后台
	var y = true; //ng-if用
	$scope.list = list;
	$http.get(url + "/dat").success(function(data) {
		for(var i = 0; i < data.length; i++) {
			list.push(data[i]);
		}
	})
	//下拉刷新
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				list.splice(0, list.length)
				console.log(list)
				for(var i = 0; i < data.length; i++) {
					list.push(data[i]);
				}
				x = 1;
				y = true;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
				
			});

	};
//	上拉加载
	$scope.jiazai = function() {
		$http.get(url + '/datdown?x=' + x).success(function(data) {
			for(var i = 0; i < data.length; i++) {
				list.push(data[i]);
			}
			x++;
			$scope.$broadcast('scroll.infiniteScrollComplete');
			if(data.length == 0) {
				y = false
				alert("没了")
			}
		})
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.jiazai();
	});
	$scope.jieshu = function() {
		return y;
	}

}])
app.controller('xs', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("xs").getAttribute("data-title");
	console.log(dataT)
	$http.get(url + "/datt?class=" + dataT).success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat") 
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('sy', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("sy").getAttribute("data-title");
	console.log(dataT)
	$http.get(url + "/datt?class=" + dataT).success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat") 
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('yd', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("yd").getAttribute("data-title");
	console.log(dataT)
	$http.get(url + "/datt?class=" + dataT).success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat")
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('qd', ['$scope', '$timeout', '$http', function($scope, $timeout, $http, services, $interval) {
	var dataT = document.getElementById("qd").getAttribute("data-title");
	console.log(dataT)
	$http.get(url + "/datt?class=" + dataT).success(function(data) {
		$scope.list = data;
	})
	$scope.doRefresh = function() {
		$http.get(url + "/dat") 
			.success(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
}])
app.controller('ccon', ['$scope', '$http', function($scope, $http) {
	$scope.sy = function() {
		window.location.href = "#/tab/sy";
	}
	$scope.qd = function() {
		window.location.href = "#/tab/qd";
	}
	$scope.yd = function() {
		window.location.href = "#/tab/yd";
	}
	$scope.xw = function() {
		window.location.href = "#/tab/xs";
	}
}])
app.controller('controlName', ['$ionicHistory', '$scope', '$http', '$location', function($ionicHistory, $scope, $http, $location) {
	var searchObject = $location.search();
	$http.get(url + "/li?id=" + searchObject.id).success(function(data) {
		$scope.det = data;
	})
	$scope.gou = function() {
		$ionicHistory.goBack(); //返回上一页
	}

}])
app.controller('bac', ['$ionicHistory', '$scope', '$http', '$location', function($ionicHistory, $scope, $http, $location) {
	$scope.gou = function() {
		$ionicHistory.goBack(); //返回上一页
	}
}])
app.controller('search', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$http.get(url + "/search?TAG=" + $location.search().TAG).success(function(data) {
		$scope.list = data;
	})
}])