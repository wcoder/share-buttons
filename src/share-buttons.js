(function () {
	'use strict';

	var FB_LINK = 'https://www.facebook.com/sharer/sharer.php?u=';
	var VK_LINK = 'https://vk.com/share.php?url={0}&description={1}. {2}';
	var TW_LINK = 'https://twitter.com/intent/tweet?url=';
	var GP_LINK = 'https://plus.google.com/share?url=';
	var IN_LINK = 'https://www.linkedin.com/shareArticle?mini=true&url=';

	// from http://evgeniy.pakalo.name/post/49
	var _F = function(str, args){
		return str.replace(/\{(\d+)\}/g, function(m,n){
			return args[n] ? args[n] : m;
		});
	};

	function ShareButtons() {
		var width = 600,
			height = 400;

		this.init = function() {
			var _this = this,
				share = document.querySelectorAll('.share-btn');
			for (var i = 0, l = share.length; i < l; i++) {
				var url = share[i].getAttribute('data-url') || location.href,
					title = share[i].getAttribute('data-title') || document.title, 
					desc = share[i].getAttribute('data-desc') || ' ',
					el = share[i].querySelectorAll('a');

				for (var a = 0, al = el.length; a < al; a++) {
					var id = el[a].getAttribute('data-id');
					if (id) {
						_this.addEventListener(el[a], 'click', {
							id: id,
							url: url,
							title: title,
							desc: desc
						});
					}
				}
			}
		};

		this.addEventListener = function(el, eventName, opt) {
			var _this = this,
				handler = function () {
					_this.share(opt.id, opt.url, opt.title, opt.desc);
				};

			if (el.addEventListener) {
				el.addEventListener(eventName, handler);
			} else {
				el.attachEvent('on' + eventName, function() {
					handler.call(el);
				});
			}
		};

		this.share = function(id, url, title, desc) {
			url = encodeURIComponent(url);
			desc = encodeURIComponent(desc);
			title = encodeURIComponent(title);

			switch (id) {
				case 'fb':
					this.popupCenter(FB_LINK + url, this.title, this.width, this.height);
					break;

				case 'vk':
					var url = _F(VK_LINK, [url, title, desc]);

					this.popupCenter(url, this.title, this.width, this.height);
					break;

				case 'tw':
					var text = title || desc || '';
					if (title.length > 0 && desc.length > 0) {
						text = title + ' - ' + desc;
					}
					if (text.length > 0) {
						text = '&text=' + text;
					}
						
					this.popupCenter(TW_LINK + url + text, this.title, this.width, this.height);
					break;

				case 'gp':
					this.popupCenter(GP_LINK + url, this.title, this.width, this.height);
					break;

				case 'in':
					this.popupCenter(IN_LINK + url, this.title, this.width, this.height);
					break;

				case 'mail':
					var text = title || desc || '';
					if (title.length > 0 && desc.length > 0) {
						text = title + ' - ' + desc;
					}
					if (text.length > 0) {
						text = text + ' / ';
					}
					if (title.length > 0) {
						title = title + ' / ';
					}
					
					var mail = 'mailto:?Subject=' + title + this.title + '&body=' + text + url;
					this.newTab(mail);
					break;

				default:
					break;
			};
		};

		this.newTab = function (url) {
			var win = window.open(url, '_blank');
			win.focus();		
		};

		this.popupCenter = function (url, title, w, h) {
			var dualScreenLeft = window.screenLeft !== undefined
				? window.screenLeft
				: screen.left;
			var dualScreenTop = window.screenTop !== undefined
				? window.screenTop
				: screen.top;

			var width = window.innerWidth
				? window.innerWidth
				: document.documentElement.clientWidth
					? document.documentElement.clientWidth
					: screen.width;
			var height = window.innerHeight
				? window.innerHeight
				: document.documentElement.clientHeight
					? document.documentElement.clientHeight
					: screen.height;
			
			var left = ((width / 2) - (w / 2)) + dualScreenLeft;
			var top = ((height / 3) - (h / 3)) + dualScreenTop;

			var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

			if (window.focus) {
				newWindow.focus();
			}
		}
	};



	// start
	var sb = new ShareButtons();
	sb.init();

}());

	