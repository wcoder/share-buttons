# share-buttons [![version](http://img.shields.io/badge/release-v1.0.0-brightgreen.svg?style=flat)](https://github.com/wcoder/share-buttons/archive/master.zip) [![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/wcoder/share-buttons/blob/master/LICENSE)

Simple social buttons for your site.

## Browser support
* Google Chrome (latest)
* Mozilla Firefox (latest)
* Opera (latest)
* Internet Explorer 9+

## Install
Include `share-buttons.js` in the end of page:
``` html
<script src="../dist/share-buttons.js"></script>
```
Paste this html on the page:
``` html
<div class="share-btn">
	<a class="btn-vk" data-id="vk">VK</a>
	<a class="btn-facebook" data-id="fb">Facebook</a>
	<a class="btn-twitter" data-id="tw">Twitter</a>
	<a class="btn-mail" data-id="mail">EMail</a>
</div>
```
Added styles:
``` css
.share-btn > a {
	border: 1px solid #ccc;
	padding: 5px;
	font-size: 12px;
	font-family: Verdana, Arial;
}
.share-btn > a:hover {
	cursor: pointer;
}
```
Profit!!

## Customization
Custom 'url', 'title', 'description':
``` html
<div class="share-btn" data-url="https://..." data-title="..." data-desc="...">
	<a class="btn-vk" data-id="vk">VK</a>
	<a class="btn-facebook" data-id="fb">Facebook</a>
	<a class="btn-twitter" data-id="tw">Twitter</a>
	<a class="btn-mail" data-id="mail">EMail</a>
</div>
```
Styles - full customization.

----

&copy; 2015 - Yauheni Pakala
