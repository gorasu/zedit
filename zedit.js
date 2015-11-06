/**
 *
 * @toDO реализовать возможность сохранения данных по происзвольному событию и по клику на какой либо элемент (кнопка сохранить)
 *
 **/

jQuery.zedit = function(options){
	var ZE = this;
	(function($){

		ZE.options =$.extend({
			'title':'zedit',
			'ajax':{
				'url':'',
				'type':'post',
			},
			'hooks':new Array(),
			'imgSrc':'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAADxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBDYW4ndCBjb25uZWN0IHRvIGxvY2FsIE15U1FMIHNlcnZlciB0aHJvdWdoIHNvY2tldCAnL3Zhci9ydW4vbXlzcWxkL215c3FsZC5zb2NrJyAoMikgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQSBsaW5rIHRvIHRoZSBzZXJ2ZXIgY291bGQgbm90IGJlIGVzdGFibGlzaGVkIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IENhbid0IGNvbm5lY3QgdG8gbG9jYWwgTXlTUUwgc2VydmVyIHRocm91Z2ggc29ja2V0ICcvdmFyL3J1bi9teXNxbGQvbXlzcWxkLnNvY2snICgyKSBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+CjxiciAvPgo8Yj5XYXJuaW5nPC9iPjogIG15c3FsX3F1ZXJ5KCkgWzxhIGhyZWY9J2Z1bmN0aW9uLm15c3FsLXF1ZXJ5Jz5mdW5jdGlvbi5teXNxbC1xdWVyeTwvYT5dOiBBIGxpbmsgdG8gdGhlIHNlcnZlciBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQgaW4gPGI+L2hvbWUvYWpheGxvYWQvd3d3L2xpYnJhaXJpZXMvY2xhc3MubXlzcWwucGhwPC9iPiBvbiBsaW5lIDxiPjY4PC9iPjxiciAvPgo8YnIgLz4KPGI+V2FybmluZzwvYj46ICBteXNxbF9xdWVyeSgpIFs8YSBocmVmPSdmdW5jdGlvbi5teXNxbC1xdWVyeSc+ZnVuY3Rpb24ubXlzcWwtcXVlcnk8L2E+XTogQ2FuJ3QgY29ubmVjdCB0byBsb2NhbCBNeVNRTCBzZXJ2ZXIgdGhyb3VnaCBzb2NrZXQgJy92YXIvcnVuL215c3FsZC9teXNxbGQuc29jaycgKDIpIGluIDxiPi9ob21lL2FqYXhsb2FkL3d3dy9saWJyYWlyaWVzL2NsYXNzLm15c3FsLnBocDwvYj4gb24gbGluZSA8Yj42ODwvYj48YnIgLz4KPGJyIC8+CjxiPldhcm5pbmc8L2I+OiAgbXlzcWxfcXVlcnkoKSBbPGEgaHJlZj0nZnVuY3Rpb24ubXlzcWwtcXVlcnknPmZ1bmN0aW9uLm15c3FsLXF1ZXJ5PC9hPl06IEEgbGluayB0byB0aGUgc2VydmVyIGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCBpbiA8Yj4vaG9tZS9hamF4bG9hZC93d3cvbGlicmFpcmllcy9jbGFzcy5teXNxbC5waHA8L2I+IG9uIGxpbmUgPGI+Njg8L2I+PGJyIC8+Cg=='

		},options);



		ZE.o = function(name,result){
			if(result === undefined){
				result = null;
			}
			return  ZE.options[name] !== undefined ? ZE.options[name] : result;
		}

		ZE._callHooksObj = [];
		ZE.callHook = function(hookName,data){


			var hooks = ZE.o('hooks');

			if(hooks[hookName] == undefined){
				return false;
			}
			var hookArray =hooks[hookName];

			if(!(hookArray instanceof Array)){
				hookArray = [hookArray];
			}
			for(var i = 0; i < hookArray.length; i++){
				if(!(hookArray[i] instanceof Function) ){
					console.warn('Hook '+ hookName +'['+i+'] is not a function');
					continue;
				}
				hookArray[i](data,ZE);
			}
		}



		ZE.options.imgLoading = new Image();
		ZE.options.imgLoading.src = ZE.o('imgSrc');


		ZE.dataPrefix = function(name){
			return 'data-'+ ZE.o('title')+'-'+name;
		}
		ZE.escapeHtml = function(text) {
			var map = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			};

			return text.replace(/[&<>"']/g, function(m) { return map[m]; });
		}




		ZE.dataToAttrObj = function(el){
			var dataZedit = new Array();
			var dataZeditClear = new Array();
			var otherAttr = new Array();
			var pattern = "^data\-"+ZE.o('title')+"\-";
			var regSearch = new RegExp(pattern);
			var regReplace = new RegExp(pattern+'(?!parametrs)');
			$(el.attributes).each(function(index,el){
				if(el.name.search(regSearch) != -1) {
					dataZeditClear[el.name.replace(regReplace,'')] = el.value;
					dataZedit[el.name] = el.value;
				}
				else {
					otherAttr[el.name] = el.value;
				}

			});
			return {
				'dataZeditClear':dataZeditClear, // убран префикс data-zedit
				'dataZedit':dataZedit, // Все атрибуты с data-zedit
				'otherAttr':otherAttr // другие атрибуты элемента
			};
		}



		// Оъект с атрибутами в строку
		ZE.getAttrStr  = function(obj,callBack){
			var stringAttr = '';
			for (var key in obj) {
				var attr = {'key':key,'value':obj[key]};
				if(callBack instanceof Function){
					callBack(attr);
				}
				var quote = '"';
				if(attr.value.search('"') != -1) {
					var quote = "'";
				}
					stringAttr += attr.key + '='+quote+ attr.value +quote+ ' ';


			}
			return stringAttr;

		}


		ZE.init = function(){
			var clickElement = '';

			$(document).ready(function() {

				$('body').on('dblclick','[' + ZE.dataPrefix('type') + ']',function () {
					clickElement = this;
					/* Атрибуты элемента по которому произошел клик
					* attrs.dataZedit - атрибуты плагина
					* attrs.otherAttr - другие атрибуты элемента class, style и т.п.
					**/
					var attrs = ZE.dataToAttrObj(clickElement);

					// Имя тега
					var tagName = clickElement.tagName;
					// Текст который содержится внутри элемента
					var text = clickElement.textContent;
					attrs.dataZeditClear.value = attrs.dataZeditClear.value == undefined ? text : attrs.dataZeditClear.value;
					attrs.dataZeditClear.value = $.trim(attrs.dataZeditClear.value);

					var stringAttr = '';
					stringAttr += ZE.getAttrStr(attrs.dataZeditClear);
					stringAttr += ZE.dataPrefix('create-element')+ '= "1"'; // Отметка для созданного элемента формы

					var field = '';

					/** @toDO добавить возможность добавления элемента формы типа SELECT */
					switch(attrs.dataZeditClear.type){
						case 'textarea':
							field='<textarea '+stringAttr+'>'+attrs.dataZeditClear.value+'</textarea>';
							break;
						default:field = '<input ' + stringAttr + '>';

					}
					var el =  $(field);

					$(clickElement).html(el);

					$(el).focus()
					// Курсор в конец поля
					switch(attrs.dataZeditClear.type){
						case 'text':
						case 'textarea':
						$(el).val("").val(attrs.dataZeditClear.value);
					}



				});

				// Когда появившийся элемент теряет фокус происходит сохранение данных и преоразование элемента формы в текст
				$('body').on('blur','[' + ZE.dataPrefix('create-element') + ']',function(){


					// Берем все атрибуты элемента который потерял фокус
					var attrs = ZE.dataToAttrObj(this);
					delete attrs.dataZeditClear['create-element'];


					var input = this;
					var sendData = $(input).serializeArray();
					switch($(input).attr('type')) {
						case 'checkbox':
						case 'radio':
							if ($(input).prop('checked')) {
								attrs.otherAttr.checked = 'checked';
							}
							else {
								delete attrs.otherAttr.checked;
								sendData[0] = {'name':$(input).attr('name'),'value':null};
							}
							break;
					}
					var jsonParametrs = $(input).data(ZE.o('title')+'-parametrs');
					if(jsonParametrs){
						for(var key in jsonParametrs) {
							sendData.push({'name':key,'value':jsonParametrs[key]});
						}
					}


					var imgLoading = ZE.o('imgLoading');
					var ajaxOptions = ZE.o('ajax');
					var ajaxOptions = $.extend(ajaxOptions,{
						'data':sendData,
						'beforeSend':function(){
							$(input).replaceWith(imgLoading);
						},
						'success':function(data){

							switch($(input).attr('type')){

								case 'text':
								case 'textarea':
									attrs.otherAttr.value = data;
									break;
							}

							var attrsClickElement = ZE.dataToAttrObj(clickElement);

							for(var key in attrsClickElement.dataZedit ) {
								$(clickElement).removeAttr(key);
							}

							for(var key in attrs.otherAttr ) {
								$(clickElement).attr(ZE.dataPrefix(key),attrs.otherAttr[key]);
							}
							for(var key in attrs.dataZeditClear ) {
								$(clickElement).attr(key,attrs.dataZeditClear[key]);
							}

							$(clickElement).html(data);
							ZE.callHook('afterSuccessAjax',{'attrs':attrs,'data':data,'input':input,'clickElement':clickElement});
						}
					});
					$.ajax(ajaxOptions);



				});



			});


		}



		ZE.init();



	})(jQuery);

return ZE;
}
