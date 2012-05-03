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

function resize(imageid, max) 
{
  var elem = document.getElementById(imageid);
  if (elem == undefined || elem == null) return false;
  if (max == undefined) max = 100;
  if (elem.width > elem.height) {
    if (elem.width > max) elem.width = max;
  } else {
    if (elem.height > max) elem.height = max;
  }
  elem.style.visibility = 'visible';
}

function resizeHeight(imageid, maxHeight) 
{
  var elem = document.getElementById(imageid);
  if (elem == undefined || elem == null) return false;
  if (maxHeight == undefined) maxHeight = 100;
  
  
    elem.height = maxHeight;
  
  elem.style.visibility = 'visible';
}

var createImageAnimations=function()
{
	setGalleryMoveOver("overlay");
	createScrollAnimation();
}

var position = 0;
var direction = 1;

var createScrollAnimation=function()
{
	var scrollcontainer = document.getElementById("scrollcontainer");
	var scrollcontent = document.getElementById("scrollcontent");
	
	scrollcontainer.animator =
		new Animator(
			{
		    	duration: 500,
		    	interval: 10
		    }
		   );
	    
    scrollcontainer.animator.addSubject(
    	function(scrollableContent)
		{
			return function(value) 
			{
				var scrollStep = (document.width) / 10;
				position += direction * (value * scrollStep);
				if (position >= 0)
				{
					position = 0;
				}
				scrollableContent.style.marginLeft =  position + "px";
			}
		}(scrollcontent)
	);
}

var navigatebackward=function(e)
{
	direction = 1;
	var scrollcontainer = document.getElementById("scrollcontainer");
	scrollcontainer.animator.play();
}

var navigateforward=function(e) 
{
	direction = -1;
	var scrollcontainer = document.getElementById("scrollcontainer");
	scrollcontainer.animator.play();
}

var scrollgallery=function(e) 
{
	e = e || event;
	
	var scrollcontainer = document.getElementById("scrollcontainer");
	
	var delta = event.clientX -  (window.innerWidth / 2);
    if (delta < -250)
    {
    	if (direction = -1)
    	{
    	   scrollcontainer.animator.stop();
    	   direction = 1;
    	   scrollcontainer.animator.play();
    	}
    	
    }
    else if (delta > 250) {
    	if (direction = 1)
    	{
    	   scrollcontainer.animator.stop();
    	   direction = -1;
    	   scrollcontainer.animator.play();
    	}
    	
    } else 
    {
    	direction = 0;
    	scrollcontainer.playing = false;
    	scrollcontainer.animator.stop();
    }
    
    
	if (isOutside(e, scrollcontainer))
	{
		scrollcontainer.playing = false;
		scrollcontainer.animator.seekTo(0);
	} 
	else 
	{
		if (!scrollcontainer.playing) 
		{
			scrollcontainer.playing = true;
			scrollcontainer.animator.play();	
		}
	}
	
	
	// var delta = event.clientX -  (window.innerWidth / 2);
    // delta = delta / (window.innerWidth / 380);	
// 	
	// delta = Math.max(-190, Math.min(delta, 190));
	// if(Math.abs(delta) < 50) 
	// {
		// return;	
	// }
// 	
	// scrollposition -= delta;
	// if (scrollposition > 0)
	// {
		// scrollposition = 0;
	// }
// 	
	// scrollcontent.style.left = scrollposition + "px";
}



var setGalleryMoveOver=function(className) 
{
	var imageElements = getElementsByClassName(className);
	
	for (var i = 0; i < imageElements.length; i++)
	{
		createHoverAnimation(imageElements[i]);
	}
}

var createHoverAnimation = function(element)
{			
	var imageElements = getElementsByClassName("flickrimg", "img", element.parentNode);
	
	
	element.parentNode.onmouseout = element.parentNode.onmousemove = 
		function(hitTestElem, animationElem) 
		{
			return function(e) 
			{
				onMouseOut(e, hitTestElem, animationElem);
			}
		}(element.parentNode, element);
		
	//element.onclick = createThumbClickHandler(element);		
	element.animator = 
		new Animator(
		{
	    	duration: 1000,
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
	element.animator.jumpTo(0.5);
}

var onMouseOut = function(e, hitTestElem, animationElem)
{
	e = e || event;

	if (isOutside(e, hitTestElem)) 
	{
		if (animationElem.opened) 
		{
			animationElem.opened = false;
			animationElem.animator.seekTo(0.5);	
		}
	} 
	else if (!animationElem.opened) 
	{
		animationElem.opened = true;
		animationElem.animator.seekTo(0.7);	
	}
}


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

function isOutside(evt, parent) 
{
  var elem = evt.relatedTarget || evt.toElement || evt.fromElement || evt.srcElement;
 
  while ( elem && elem !== parent) {
    elem = elem.parentNode;
  }
 
  if ( elem !== parent) {
    return true
  }
}

