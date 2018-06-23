(function (window, document) {
    'use strict';

    /**
     * Class to display the buttons of social networks.
     *
     * @author Yauheni Pakala <https://wcoder.github.io>
     * @version 1.1
     * @license MIT
     */
    function ShareButtons() {

        var FB_LINK_FORMAT = 'https://www.facebook.com/sharer/sharer.php?u={0}',
            VK_LINK_FORMAT = 'https://vk.com/share.php?url={0}&title={1}',
            TW_LINK_FORMAT = 'https://twitter.com/intent/tweet?url={0}&text={1}',
            TG_LINK_FORMAT = 'https://t.me/share/url?url={0}&text={1}',
            POCKET_LINK_FORMAT = 'https://getpocket.com/edit?url={0}&title={1}',
            RE_LINK_FORMAT = 'https://reddit.com/submit/?url={0}',
            EV_LINK_FORMAT = 'https://www.evernote.com/clip.action?url={0}&t={1}',
            MAIL_LINK_FORMAT = 'mailto:?Subject={0}{1}&body={2}{3}',
            FB_CLASS_NAME = 'fb',
            VK_CLASS_NAME = 'vk',
            TW_CLASS_NAME = 'tw',
            TG_CLASS_NAME = 'tg',
            PK_CLASS_NAME = 'pk',
            RE_CLASS_NAME = 're',
            EV_CLASS_NAME = 'ev',
            MAIL_CLASS_NAME = 'mail',

            // from https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript
            stringFormat = function (str, args) {
                return str.replace(/\{(\d+)\}/g, function (m, n) {
                    return args[n] || m;
                });
            },

            mergeForTitle = function (texts) {
                return texts.join(' - ');
            };

        /**
         * Method for initialize class for all elements
         */
        this.init = function () {
            var i, share = document.querySelectorAll('.share-btn');

            for (i = share.length; i--;) {
                this.initForElement(share[i]);
            }
        };

        /**
         * Method for initialize class for all elements
         */
        this.initForElement = function (el) {
            var i, a = el.querySelectorAll('a');

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
            case FB_CLASS_NAME:
                this.popupCenter(
                    stringFormat(FB_LINK_FORMAT, [url]),
                    titleDef);
                break;

            case VK_CLASS_NAME:
                this.popupCenter(
                    stringFormat(VK_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case TW_CLASS_NAME:
                this.popupCenter(
                    stringFormat(TW_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case TG_CLASS_NAME:
                this.popupCenter(
                    stringFormat(TG_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case PK_CLASS_NAME:
                this.popupCenter(
                    stringFormat(POCKET_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case RE_CLASS_NAME:
                this.popupCenter(
                    stringFormat(RE_LINK_FORMAT, [url]),
                    titleDef);
                break;

            case EV_CLASS_NAME:
                this.popupCenter(
                    stringFormat(EV_LINK_FORMAT, [url, title]),
                    titleDef);
                break;

            case MAIL_CLASS_NAME:
                if (title.length > 0 && desc.length > 0) {
                    text = mergeForTitle([title, desc]);
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
