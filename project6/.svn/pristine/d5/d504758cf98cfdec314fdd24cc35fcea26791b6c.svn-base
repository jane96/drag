'use strict';

app.factory('utilsService', ['$sce', 'SweetAlert', function($sce, SweetAlert) {
	var factory = {};

	//请求成功，可以传入title
	factory.success = function(title) {
		var text = (!angular.isDefined(title) ? "加载成功…" : title)
		SweetAlert.swal({
			title: "",
			text: text,
			type: "success",
			timer: 1000,
			showConfirmButton: false
		});
	};

	//请求错误，可以传入title
	factory.error = function(title) {
		var text = (!angular.isDefined(title) ? "请求错误…" : title)
		SweetAlert.swal({
			title: "",
			text: text,
			type: "error",
			timer: 1000,
			showConfirmButton: false
		});
	};

	//请求警告，可以传入title
	factory.warning = function(title) {
		var text = (!angular.isDefined(title) ? "参数有误…" : title)
		SweetAlert.swal({
			title: "",
			text: text,
			type: "warning",
			timer: 1000,
			showConfirmButton: false
		});
	};


	//公用头像封装，url：如果存在头像则为头像地址，title：没有头像的用户名称；size：头像显示大小
	factory.avatar = function(url, title, size) {
		size = (angular.isDefined(size) && size != '' ? size : 'lg');
		//size:lg/md/sm
		var imgSrc = '';
		if (angular.isDefined(url) && url != '') {
			imgSrc = '<input type="image" src = " ' + url + '" class="btn btn-rounded btn-' + size + ' btn-icon btn-info"></input>  ';
		} else if (angular.isDefined(title) && title != '') {
			if(title.length>2){
				title = title.substring(title.length-2,title.length);
			}
			var code = title.charCodeAt() + "";
		    code = code.substring(code.length,code.length-1);
		    var color = "info";
		    if(code == 0 || code == 1 || code == 2){
		        color = "primary";
		    }else if(code == 3 || code == 4){
		        color = "success";
		    }else if(code == 5 || code == 6){
		        color = "warning";
		    }
			imgSrc = '<button class="btn btn-rounded btn-' + size + ' btn-icon btn-' + color + '">' + title + '</button>';
		}

		return $sce.trustAsHtml(imgSrc);
	};

	return factory;
}]);


app.service('xxxService', ['$document', function($document) {
	this.load = function() {

	};
}]);