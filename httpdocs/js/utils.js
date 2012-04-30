

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};



var setGalleryThumbsMoveOver=function(className) 
{
	var imageElements = getElementsByClassName(className);
	
	for (var i = 0; i < imageElements.length; i++)
	{
		var element = imageElements[i];
		element.onmousemove = function(img)
		{
			return function(e)
			{
				if (img.style.opacity != 0.5)
				{
					img.animator.seekTo(0.5);
				}
			};
			
		} (element);	
			
		element.onmouseout = function(element)
		{
			return function(e)
			{
				element.animator.seekTo(1.0);	
			}
		}(element);
		element.onclick = createThumbClickHandler(element);		
		element.animator = 
			new Animator(
			{
		    	duration: 400,
		    	interval: 5
		    }
		    );
		    
	    element.animator.addSubject(
	    	function(img)
			{
				return function(value) 
				{
					setOpacity(img, value);
				}
			}(element)
	    );
	    element.animator.jumpTo(1);
	}
};

var lastClickedThumb;

var createThumbClickHandler = function(thumb) 
{	 
	return function(event)
	{
		var img = document.getElementById("imgdetail");
		if (img == null)
		{
			return;
		}
	
		var newSrc = "base/image.php?maxwidth=800&id=" + thumb.name;

		if (lastClickedThumb == thumb)
		{
			return;
		}
		
		lastClickedThumb = thumb;
		
		img.animator.options.onComplete =
			function(element, src)
			{ 
				return function()
				{
					element.onload = function(imgelement) 
					{
						return function()
						{
							imgelement.onload = null;
							imgelement.animator.options.onComplete = function(){};
							imgelement.animator.seekFromTo(0,1);		
						}
					}(element);
					element.src = src;
				}
			}(img, newSrc);
		
		img.animator.seekFromTo(1,0);
		img.name = thumb.name;
	}
}

var setDetailImage=function() {
	
	var img = document.getElementById("imgdetail");
	if (img == null)
	{
		return;
	}
	img.animator = new Animator({ duration: 400, interval: 5});
	img.animator.addSubject(
		function(element)
		{
			return function(value)
			{
				setOpacity(element, value); 
			}
		}(img)
		);
	
	img.onload = function() 
		{
			img.animator.play();
		};
		
	img.fadeOut = new Animator({duration: 400, interval: 5});
	img.fadeOut.addSubject(
		function(element) 
		{
			return function(value)
			{
				setOpacity(element, 1-value); 
			}	
		}(img)
	);
	
	img.parentNode.onmouseout = img.parentNode.onmousemove = onDetailMouseOut;
}

var onDetailMouseMove = function(event) 
{
		
}

var onDetailMouseOut = function(e)
{
	//e = e || event;
	//var imgdetailcontainer = document.getElementById("imgdetailcontainer");
	//if (isOutside(e, imgdetailcontainer)) 
	//{
		//if (besteloverlay.opened) 
		//{
			//besteloverlay.opened = false;
			//besteloverlay.fade.seekTo(0.3);	
		//}
	//} else if (!besteloverlay.opened) {
		//besteloverlay.opened = true;
		//besteloverlay.fade.seekTo(0.7);	
	//}
	
}

var besteloverlay;

function isOutside(evt, parent) {
  var elem = evt.relatedTarget || evt.toElement || evt.fromElement || evt.srcElement;
 
  while ( elem && elem !== parent) {
    elem = elem.parentNode;
  }
 
  if ( elem !== parent) {
    return true
  }
}
 
function OnUploadImageChanged(fileelement)
{	
	document.getElementById('bestelcontent').style.visibility = 'visible' 
}


var createImageGallery=function()
{
	setGalleryThumbsMoveOver("imgthumb");
	setDetailImage();
	
	var imageElements = getElementsByClassName("imgthumb" );
	createThumbClickHandler(imageElements[0])(null);
	
	var popup = document.getElementById("popupdiv");		
	popup.fade = new Animator({duration: 1000, interval: 5});
	popup.fade.addSubject(
		function(element)
		{
			return function(value) 
			{
				if (value == 1)
				{
					window.setTimeout(function() {popup.fade.seekTo(0.0);}, 2000);
				}
				setOpacity(element, value);
				//element.style.bottom = (-40 + (value * 40));
			}
		}(popup)
	);
	
	
	
	besteloverlay = document.getElementById("besteloverlay");
	if (besteloverlay == null)
	{
		return;	
	}
	besteloverlay.fade = new Animator({duration: 400, interval: 10});
	besteloverlay.fade.addSubject(
		function(overlayElement)
		{
			return function(value) 
			{
				setOpacity(overlayElement, value);	
			}
		}(besteloverlay) 
	);
};


var setOpacity = function(element, opacity)
{
	var opacityPercentage = opacity * 100;
	if (element.filters != null && element.filters.alpha != null)
	{
		element.filters.alpha.opacity= opacityPercentage;	
	}
		
	element.style.filter='progid:DXImageTransform.Microsoft.Alpha(Opacity='+ opacityPercentage +')';
	element.style.opacity = opacity;
};