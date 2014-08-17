var globalScope;
var homeScope;
var tutorialScope;
window.SC = function(selector){
    return angular.element(selector).scope();
};
var Android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
var user_id;
var url = "";
var timeouts = [];

var UserInformation = "json/user.json?";

var imagesList = "json/image-list.json?user_id=:UserID&location=:Location";
var vocalizations = "json/vocals.json?image_id=:ImageID";
var brandList = "json/brand-list.json?user_id=:UserID&location=:Location";
var storeById = "http://54.235.146.32/wish/store_by_id.php?store_id=:StoreID&gender=:Gender";
var subscribe = "http://54.235.146.32/wish/subscribe.php?user_id=:UserID&user_store_id=:UserStoreID&store_id=:StoreID";
var unsubscribe = "http://54.235.146.32/wish/unsubscribe.php?user_id=:UserID&user_store_id=:UserStoreID&store_id=:StoreID";
var storeSearch = "http://54.235.146.32/wish/search_stores.php?search=:Input&user_id=:UserID";