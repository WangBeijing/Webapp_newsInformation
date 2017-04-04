var userInfoModule = angular.module('UserInfoModule', []);
userInfoModule.controller('controlName', ['$scope', '$http', '$location', function($scope, $http, $location) {
	//获取ID参数
	var searchObject = $location.search();
	//上传图片
	$scope.img_upload = function(files) { //单次提交图片的函数
		var data = new FormData(); //以下为像后台提交图片数据
		for(var i = 0; i < files.length; i++) {
			data.append('image', files[i]);
		}
		console.log(data)
		$http({
			method: 'post',
			url: '/upload',
			data: data,
			headers: {
				'Content-Type': undefined
			},
			transformRequest: angular.identity
		}).success(function(data) {
			if(data.status) {
				$scope.form.goodImage = data.data.imagePath;
			}

		})
	};
	//获取商品编辑信息
	$http.get("/li?id=" + searchObject.id).success(function(data) {
			$scope.form = data;
		})
		//提交信息
	$scope.submit_form = function() {
		console.log($scope.form)
		$http.post('/gx?id=' + searchObject.id, {
			data: $scope.form
		}).success(function(data) {
			console.log(data)
			alert(data.message)

		});

	};
}]);
//富文本编辑器初始化
userInfoModule.directive('contenteditable', function() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ngModel) {
			// 初始化 编辑器内容
			if(!ngModel) {
				return;
			} // do nothing if no ng-model
			// Specify how UI should be updated
			ngModel.$render = function() {
				element.html(ngModel.$viewValue || '');
			};
			// Listen for change events to enable binding
			element.on('blur keyup change', function() {
				scope.$apply(readViewText);
			});
			// No need to initialize, AngularJS will initialize the text based on ng-model attribute
			// Write data to the model
			function readViewText() {
				var html = element.html();
				// When we clear the content editable the browser leaves a <br> behind
				// If strip-br attribute is provided then we strip this out
				if(attrs.stripBr && html === '<br>') {
					html = '';
				}
				ngModel.$setViewValue(html);
			}

			// 创建编辑器
			var editor = new wangEditor(element);
			editor.config.uploadImgUrl = '/imgupload';
			editor.config.uploadImgFileName = 'editorFile'
			editor.config.codeDefaultLang = 'javascript'
				// 关闭菜单栏fixed
			editor.config.menuFixed = false;
			editor.create();
		}
	};
});