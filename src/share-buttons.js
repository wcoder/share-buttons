(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.ShareButtons = factory());
}(this, function () { 'use strict';

    var w = window;
    var d = w.document;

    /**
     * Class to display the buttons of social networks.
     *
     * @author Yauheni Pakala <https://wcoder.github.io>
     * @version 1.6
     * @license MIT
     */
    function ShareButtons() {

        var FB_LINK_FORMAT = 'https://www.facebook.com/sharer/sharer.php?u={0}&quote={1}',
            VK_LINK_FORMAT = 'https://vk.com/share.php?url={0}&title={1}',
            TW_LINK_FORMAT = 'https://twitter.com/intent/tweet?url={0}&text={1}',
            TG_LINK_FORMAT = 'https://t.me/share/url?url={0}&text={1}',
            POCKET_LINK_FORMAT = 'https://getpocket.com/edit?url={0}&title={1}',
            RE_LINK_FORMAT = 'https://reddit.com/submit?url={0}&title={1}',
            EV_LINK_FORMAT = 'https://www.evernote.com/clip.action?url={0}&t={1}',
            IN_LINK_FORMAT = 'https://www.linkedin.com/shareArticle?mini=true&url={0}&title={1}&summary={2}&source={0}',
            PI_LINK_FORMAT = 'https://pinterest.com/pin/create/button/?url={0}&media={0}&description={1}',
            SK_LINK_FORMAT = 'https://web.skype.com/share?url={0}&source=button&text={1}',
            WA_LINK_FORMAT = 'https://wa.me/?text={0}%20{1}',
            OK_LINK_FORMAT = 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={0}',
            TU_LINK_FORMAT = 'https://www.tumblr.com/widgets/share/tool?posttype=link&title={0}&caption={0}&content={1}&canonicalUrl={1}&shareSource=tumblr_share_button',
            HN_LINK_FORMAT = 'https://news.ycombinator.com/submitlink?t={0}&u={1}',
            XI_LINK_FORMAT = 'https://www.xing.com/app/user?op=share;url={0};title={1}',
            MAIL_LINK_FORMAT = 'mailto:?subject={0}&body={1}',
            FB_CLASS_NAME = 'fb',
            VK_CLASS_NAME = 'vk',
            TW_CLASS_NAME = 'tw',
            TG_CLASS_NAME = 'tg',
            PK_CLASS_NAME = 'pk',
            RE_CLASS_NAME = 're',
            EV_CLASS_NAME = 'ev',
            IN_CLASS_NAME = 'in',
            PI_CLASS_NAME = 'pi',
            SK_CLASS_NAME = 'sk',
            WA_CLASS_NAME = 'wa',
            OK_CLASS_NAME = 'ok',
            TU_CLASS_NAME = 'tu',
            HN_CLASS_NAME = 'hn',
            XI_CLASS_NAME = 'xi',
            MAIL_CLASS_NAME = 'mail',
            PRINT_CLASS_NAME = 'print';

        /**
         * Method for get string in the special format by arguments
         * from https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript
         * @param {string} str
         * @param {Array} args
         */
        var stringFormat = function (str, args) {
            return str.replace(/\{(\d+)\}/g, function (m, n) {
                return args[n] || m;
            });
        };

        /**
         * Method for merge array of strings to the special format string
         * @param {Array} texts
         */
        var mergeForTitle = function (texts) {
            return texts.join(' - ');
        };

        /**
         * Method for initialize class for all elements
         */
        this.i = function () {
            var i, share = d.querySelectorAll('.share-btn');

            for (i = share.length; i--;) {
                initForElement(share[i]);
            }
        };

        /**
         * Method for initialize class for all elements
         * @param {HTMLElement} el Parent container
         */
        var initForElement = function (el) {
            var i, a = el.querySelectorAll('a');

            for (i = a.length; i--;) {
                prepareLink(a[i], {
                    id: '',
                    url: getUrl(el),
                    title: getTitle(el),
                    desc: getDesc(el)
                });
            }
        };

        /**
         * Method for handling click event to link
         * @param {HTMLElement} el
         * @param {Object} options
         */
        var prepareLink = function (el, options) {
            options.id = getAttribute(el, 'data-id');
            if (options.id) {
                addEventListener(el, 'click', options);
            }
        };

        /**
         * Method for getting url from page or options
         * @param {HTMLElement} share
         */
        var getUrl = function (share) {
            return getAttribute(share, 'data-url') || location.href || ' ';
        };

        /**
         * Method for getting title from page or options
         * @param {HTMLElement} share
         */
        var getTitle = function (share) {
            return getAttribute(share, 'data-title') || d.title || ' ';
        };

        /**
         * Method for getting description from page or options
         * @param {HTMLElement} share
         */
        var getDesc = function (share) {
            var metaDesc = d.querySelector('meta[name=description]');
            return getAttribute(share, 'data-desc') || (metaDesc && getAttribute(metaDesc, 'content')) || ' ';
        };

       /**
        * Method for attaching event to the element
        * @param {HTMLElement} el
        * @param {string} eventName
        * @param {Object} opt
        */
        var addEventListener = function (el, eventName, opt) {
            var handler = function () {
                share(opt.id, opt.url, opt.title, opt.desc);
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
         * Method for get attribute value by name
         * @param {HTMLElement} el
         * @param {string} attrName
         */
        var getAttribute = function (el, attrName) {
            return el.getAttribute(attrName);
        };

        /**
         * Method for encoding text to URL format
         * @param {string} text
         */
        var encode = function (text) {
            return encodeURIComponent(text);
        };

        /**
         * Method for handling chosen links
         * @param {string} id
         * @param {string} urlDef
         * @param {string} titleDef
         * @param {string} descDef
         */
        var share = function (id, urlDef, titleDef, descDef) {
            var url = encode(urlDef),
                desc = encode(descDef),
                title = encode(titleDef),
                text = title || desc || '';

            switch (id) {
            case FB_CLASS_NAME:
                popupCenter(
                    stringFormat(FB_LINK_FORMAT, [url, title]),
                    titleDef);
                break;

            case VK_CLASS_NAME:
                popupCenter(
                    stringFormat(VK_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case TW_CLASS_NAME:
                popupCenter(
                    stringFormat(TW_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case TG_CLASS_NAME:
                popupCenter(
                    stringFormat(TG_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case PK_CLASS_NAME:
                popupCenter(
                    stringFormat(POCKET_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case RE_CLASS_NAME:
                popupCenter(
                    stringFormat(RE_LINK_FORMAT, [url, title]),
                    titleDef);
                break;

            case EV_CLASS_NAME:
                popupCenter(
                    stringFormat(EV_LINK_FORMAT, [url, title]),
                    titleDef);
                break;

            case IN_CLASS_NAME:
                popupCenter(
                    stringFormat(IN_LINK_FORMAT, [
                        url,
                        title,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case PI_CLASS_NAME:
                popupCenter(
                    stringFormat(PI_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case SK_CLASS_NAME:
                popupCenter(
                    stringFormat(SK_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case WA_CLASS_NAME:
                popupCenter(
                    stringFormat(WA_LINK_FORMAT, [
                        mergeForTitle([title, desc]),
                        url
                    ]),
                    titleDef);
                break;

            case OK_CLASS_NAME:
                popupCenter(
                    stringFormat(OK_LINK_FORMAT, [ url ]),
                    titleDef);
                break;

            case TU_CLASS_NAME:
                popupCenter(
                    stringFormat(TU_LINK_FORMAT, [
                        mergeForTitle([title, desc]),
                        url
                    ]),
                    titleDef);
                break;

            case HN_CLASS_NAME:
                popupCenter(
                    stringFormat(HN_LINK_FORMAT, [
                        mergeForTitle([title, desc]),
                        url
                    ]),
                    titleDef);
                break;

            case XI_CLASS_NAME:
                popupCenter(
                    stringFormat(XI_LINK_FORMAT, [
                        url,
                        mergeForTitle([title, desc])
                    ]),
                    titleDef);
                break;

            case MAIL_CLASS_NAME:
                if (title.length > 0 && desc.length > 0) {
                    text = mergeForTitle([title, desc]);
                }
                if (url.length > 0) {
                    text = text + ' / ' + url;
                }

                location.href = stringFormat(MAIL_LINK_FORMAT, [title, text]);
                break;

            case PRINT_CLASS_NAME:
                window.print();
                break;

            default:
                break;
            }
        };

        /**
         * Method for opening popup window
         * @param {string} url
         */
        var popupCenter = function (url, title) {
            var _w = 600,
                _h = 400,
                dualScreenLeft = typeof w.screenLeft !== 'undefined' ? w.screenLeft : screen.left,
                dualScreenTop = typeof w.screenTop !== 'undefined' ? w.screenTop : screen.top,
                width = w.innerWidth || d.documentElement.clientWidth || screen.width,
                height = w.innerHeight || d.documentElement.clientHeight || screen.height,
                left = ((width / 2) - (_w / 2)) + dualScreenLeft,
                top = ((height / 3) - (_h / 3)) + dualScreenTop,
                windowFormat = 'resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width={0},height={1},top={2},left={3}',
                newWindow = w.open(url, '', stringFormat(windowFormat, [_w, _h, top, left]));

            if (newWindow !== null && newWindow.focus) {
                newWindow.focus();
            }
        };
    }

    // start
    var shareButtons = new ShareButtons();
    shareButtons.i();

    return {
        update: function () {
            shareButtons.i();
        }
    };

}));
