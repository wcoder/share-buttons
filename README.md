# share-buttons

Simple social buttons for your site.

## Browser support
* Google Chrome (latest)
* Mozilla Firefox (latest)
* Opera (latest)
* Internet Explorer 9+

## Install
Include `share-buttons.js` in the end of page:
```
<script src="../dist/share-buttons.js"></script>
```
Paste this html on the page:
```
<div class="share-btn">
	<a class="btn-vk" data-id="vk">VK</a>
	<a class="btn-facebook" data-id="fb">Facebook</a>
	<a class="btn-twitter" data-id="tw">Twitter</a>
	<a class="btn-mail" data-id="mail">EMail</a>
</div>
```
Added styles:
```
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
```
<div class="share-btn" data-url="https://..." data-title="..." data-desc="...">
	<a class="btn-vk" data-id="vk">VK</a>
	<a class="btn-facebook" data-id="fb">Facebook</a>
	<a class="btn-twitter" data-id="tw">Twitter</a>
	<a class="btn-mail" data-id="mail">EMail</a>
</div>
```
Styles - full customization.

----

&copy; 2015 - Yauheni Pakala - MIT
