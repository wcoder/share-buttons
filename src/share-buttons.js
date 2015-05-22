(function (window, document) {
	'use strict';

	/**
	 * Class to display the buttons of social networks.
	 *
	 * @author Yauheni Pakala <evgeniy.pakalo@gmail.com>
	 * @version 1.0
	 * @license MIT
	 */
	function ShareButtons() {
		
		var FB_LINK_FORMAT = 'https://www.facebook.com/sharer/sharer.php?u=',
			VK_LINK_FORMAT = 'https://vk.com/share.php?url={0}&description={1}. {2}',
			TW_LINK_FORMAT = 'https://twitter.com/intent/tweet?url=',
			MAIL_LINK_FORMAT = 'mailto:?Subject={0}{1}&body={2}{3}',

			// from http://evgeniy.pakalo.name/post/49
			stringFormat = function (str, args) {
				return str.replace(/\{(\d+)\}/g, function (m, n) {
					return args[n] || m;
				});
			};

		/**
		 * Method for initialize class for all elements
		 */
		this.init = function () {
			var i,
				share = document.querySelectorAll('.share-btn');

			for (i = share.length; i--;) {
				this.initForElement(share[i]);
			}
		};

		/**
		 * Method for initialize class for all elements
		 */
		this.initForElement = function (el) {
			var i,
				a = el.querySelectorAll('a');

			for (i = a.length; i--;) {
				this.prepareLink(a[i], {
					id: '',
					url: this.getUrl(el),
					title: this.getTitle(el),
					desc: this.getDesc(el)
				});
			}
		};
		
		/**
		 * Method for handling click event to link
		 */
		this.prepareLink = function (el, options) {
			var that = this;

			options.id = el.getAttribute('data-id');
			if (options.id) {
				that.addEventListener(el, 'click', options);
			}
		};

		/**
		 * Method for getting url from page or options
		 */
		this.getUrl = function (share) {
			return share.getAttribute('data-url') || location.href || ' ';
		};

		/**
		 * Method for getting title from page or options
		 */
		this.getTitle = function (share) {
			return share.getAttribute('data-title') || document.title || ' ';
		};

		/**
		 * Method for getting description from page or options
		 */
		this.getDesc = function (share) {
			var metaDesc = document.querySelector('meta[name=description]');
			return share.getAttribute('data-desc') || (metaDesc && metaDesc.getAttribute('content')) || ' ';
		};

		/**
		 * Method for attaching event to the element
		 */
		this.addEventListener = function (el, eventName, opt) {
			var that = this,
				handler = function () {
					that.share(opt.id, opt.url, opt.title, opt.desc);
				};

			if (el.addEventListener) {
				el.addEventListener(eventName, handler);
			} else {
				el.attachEvent('on' + eventName, function () {
					handler.call(el);
				});
			}
		};

		/**
		 * Method for handling chosen links
		 */
		this.share = function (id, urlDef, titleDef, descDef) {
			var url = encodeURIComponent(urlDef),
				desc = encodeURIComponent(descDef),
				title = encodeURIComponent(titleDef),
				text = title || desc || '';

			switch (id) {
			case 'fb':
				this.popupCenter(FB_LINK_FORMAT + url, titleDef);
				break;

			case 'vk':
				this.popupCenter(stringFormat(VK_LINK_FORMAT, [url, title, desc]), titleDef);
				break;

			case 'tw':
				if (title.length > 0 && desc.length > 0) {
					text = title + ' - ' + desc;
				}
				if (text.length > 0) {
					text = '&text=' + text;
				}

				this.popupCenter(TW_LINK_FORMAT + url + text, titleDef);
				break;

			case 'mail':
				if (title.length > 0 && desc.length > 0) {
					text = title + ' - ' + desc;
				}
				if (text.length > 0) {
					text = text + ' / ';
				}
				if (title.length > 0) {
					title += ' / ';
				}

				location.href = stringFormat(MAIL_LINK_FORMAT, [title, titleDef, text, url]);
				break;

			default:
				break;
			}
		};

		/**
		 * Method for opening popup window
		 */
		this.popupCenter = function (url, title) {
			var w = 600,
				h = 400,
				dualScreenLeft = typeof window.screenLeft !== 'undefined' ? window.screenLeft : screen.left,
				dualScreenTop = typeof window.screenTop !== 'undefined' ? window.screenTop : screen.top,
				width = window.innerWidth || document.documentElement.clientWidth || screen.width,
				height = window.innerHeight || document.documentElement.clientHeight || screen.height,
				left = ((width / 2) - (w / 2)) + dualScreenLeft,
				top = ((height / 3) - (h / 3)) + dualScreenTop,
				windowFormat = 'resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width={0},height={1},top={2},left={3}',
				newWindow = window.open(url, '', stringFormat(windowFormat, [w, h, top, left]));

			if (newWindow !== null && newWindow.focus) {
				newWindow.focus();
			}
		};
	}

	// start
	new ShareButtons().init();

}(window, document));