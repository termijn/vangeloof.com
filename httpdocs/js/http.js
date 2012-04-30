 

function HTTP() {
 var xmlhttp
 /*@cc_on @*/
 /*@if (@_jscript_version >= 5)
   try {
   xmlhttp=new ActiveXObject("Msxml2.XMLHTTP")
  } catch (e) {
   try {
     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
   } catch (E) {
    xmlhttp=false
   }
  }
 @else
  xmlhttp=false
 @end @*/
 if (!xmlhttp) {
  try {
   xmlhttp = new XMLHttpRequest();
  } catch (e) {
   xmlhttp=false
  }
 }
 return xmlhttp
}

if (typeof getURL=='undefined') {
 getURL=function(url,fn) { 
  var xmlhttp= HTTP();
  if (xmlhttp) {
   xmlhttp.open('GET',url, true, '', '');  

   xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
     fn({status:xmlhttp.status,content:xmlhttp.responseText,
      contentType:xmlhttp.getResponseHeader("Content-Type")})
    }
   }
   xmlhttp.send(null)
  } else {
   //Some Appropriate Fallback...
  }
 }
}
if (typeof postURL=='undefined') {
 postURL=function(url,txt,fn,type,enc) {
  var xmlhttp=new HTTP();
  if (xmlhttp) {
   xmlhttp.open("POST",url,true);
   if (enc) xmlhttp.setRequestHeader("Content-Encoding",enc)
   if (type) xmlhttp.setRequestHeader("Content-Type",type)
   xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
     fn({status:xmlhttp.status,content:xmlhttp.responseText,
      contentType:xmlhttp.getResponseHeader("Content-Type")})
    }
   }
   xmlhttp.send(txt)
  } else {
   //Some Appropriate Fallback...
  }
 }
}

function DeleteCartItemClicked(number)
{
	getURL
	(
		'session/deletefromcart.php?number='+number, 
		function(obj) 
		{ 
			document.location.href="index.php?page=checkout";
		}
	);
}

function StoreValue(key, value) 
{
	getURL('session/setordervalue.php?key=' + escape(key) + '&value='+escape(value), function(status) {});
}

function NavigateToIdeal()
{
	var issuerid = document.getElementById("issuerid").value;
	getURL(
		'session/navigatetoideal.php?issuerid=' + escape(issuerid), 
		function(status) 
		{ 
			document.location.href=status.content; 
		}
	);
}

function OnCustomSizeClicked(count, size, glanzend)
{
	var uploadform = document.getElementById("uploadform");
 	var sizeidelem = document.getElementById("sizeid");
 	var shinyelem = document.getElementById("shiny");
 	sizeidelem.value = size;
 	shinyelem.value = glanzend;
 	uploadform.submit();
}

function OnSizeClicked(count, size, glanzend)
{
	var imgdetail = document.getElementById("imgdetail");
	
	getURL(
		'session/addtocart.php?count='+count+'&image='+imgdetail.name+'&size='+size+'&shiny='+glanzend, 
		function(obj) 
		{ 
			var element = document.getElementById("cartdiv");
			element.innerHTML = obj.content;
			var popup = document.getElementById("popupdiv");
			popup.fade.seekTo(1.0);
		}
	);
}

function OnAccessoryClickedFromCheckout(id) 
{
	getURL(
		'session/addaccessorytocart.php?accessory='+id, 
		function(obj) 
		{ 
			var popup = document.getElementById("popupdiv");
			popup.fade.seekTo(1.0);
			document.location.href="index.php?page=checkout";
		}
	);
}

function OnAccessoryClicked(id) 
{
	getURL(
		'session/addaccessorytocart.php?accessory='+id, 
		function(obj) 
		{ 
			var element = document.getElementById("cartdiv");
			element.innerHTML = obj.content;
			var popup = document.getElementById("popupdiv");
			popup.fade.seekTo(1.0);
		}
	);
}