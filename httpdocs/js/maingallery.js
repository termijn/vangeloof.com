var imageGallery;

var createImageAnimations=function()
{
	imageGallery = new gallery("flickrimg", "overlay", "scrollcontainer", "scrollcontent");
	var forwardElements = getElementsByClassName("navigateforward");
	for (var i = 0; i < forwardElements.length; i++)
	{
		forwardElements[i].onmousedown = function(imageGallery) {return imageGallery.navigateforward}(imageGallery); 
	}
	
	var backwardElements = getElementsByClassName("navigateback");
	for (var i = 0; i < backwardElements.length; i++)
	{
		backwardElements[i].onmousedown = function(imageGallery) {return imageGallery.navigatebackward}(imageGallery); 
	}
}

function gallery(imgclass, imgoverlayclass, scrollcontainerid, scrollcontentid) 
{
	var self = this;
	
	this.setGalleryMoveOver = function(className) 
	{
		var imageElements = getElementsByClassName(className);
		
		for (var i = 0; i < imageElements.length; i++)
		{
			this.createHoverAnimation(imageElements[i]);
		}
	};
	
	this.onMouseOut = function(e, hitTestElem, animationElem)
	{
		e = e || event;
	
		if (this.isOutside(e, hitTestElem)) 
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
	};
	
	this.backtosets = function() 
	{
		self.showwait();
		getURL('getphotosets.php', 
			function(status) 
			{
				var element = document.getElementById("scrollcontent");
				element.innerHTML = status.content;	
				self.reset();
				self.hidewait();
			}
		);
	}
	
	this.reset = function()
	{
		self.isScrolling = false;
		self.position = 0;
		self.images = getElementsByClassName("flickrimg");
	   	self.imageIndex = 0;
		self.currentImage = self.images[self.imageIndex];
		
		this.setGalleryMoveOver(imgoverlayclass);
		var scrollcontent = document.getElementById("scrollcontent");
		scrollcontent.style.marginLeft =  self.position + "px";
	}
	
	this.showwait = function() 
	{
		var waitingElement = document.getElementById("pageoverlay");
		setOpacity(waitingElement, 0.5);
		waitingElement.style.visibility = "visible";
	}
	
	this.hidewait = function() 
	{
		var waitingElement = document.getElementById("pageoverlay");
		setOpacity(waitingElement, 0.0);
		waitingElement.style.visibility = "hidden";
	}

	
	this.imageclicked = function(e, setid) 
	{
		self.showwait();
		getURL('getphotoset.php?setid=' + escape(setid), 
			function(status) 
			{
				var element = document.getElementById("scrollcontent");
				element.innerHTML = status.content;	
				self.reset();
				self.hidewait();
			}
		);
	}
	
	this.photoclicked = function(e, imageElement)
	{
		var element = document.getElementById("detailoverlay");
		var detailimage = document.getElementById("detailimage");
		var detailoverlaycover = document.getElementById("detailoverlaycover");
		element.style.visibility = "visible";
		detailoverlaycover.style.visibility = "visible";
		setOpacity(detailoverlaycover, 0);
		setOpacity(element, 0);
		detailimage.src = imageElement.src;
		element.animator.seekTo(1.0);
	}
	
	this.createHoverAnimation = function(element)
	{			
		var backbutton = document.getElementById('backtoimagesets');
		backbutton.onmousedown = function(e)
		{
			self.backtosets();
		};
		var imageElements = getElementsByClassName("flickrimg", "img", element.parentNode);
		
		for (var i = 0; i < imageElements.length; i++)
		{
			if (imageElements[i].alt.startsWith("set"))
			{
				var setId = imageElements[i].alt.replace("set","");
				imageElements[i].onmousedown = 
					function(setid) 
					{ 
						return function(e)
						{
							self.imageclicked(e, setid);
						} 
					}(setId);
			}  
			else if (imageElements[i].alt.startsWith("photo")) 
			{
				var image = imageElements[i];				
				var photoId = image.alt.replace("photo","");
				image.onmousedown = 
					function(imageElement) 
					{ 
						return function(e)
						{
							self.photoclicked(e, imageElement);
						} 
					}(image);
			}
		}
		
		element.parentNode.onmouseout = element.parentNode.onmousemove = 
			function(hitTestElem, animationElem, gallery) 
			{
				return function(e) 
				{
					gallery.onMouseOut(e, hitTestElem, animationElem);
				}
			}(element.parentNode, element, this);
			
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
	};
	
	this.createDetailAnimation=function()
	{
		var detailoverlay = document.getElementById("detailoverlay");
		var detailimage = document.getElementById("detailimage");
		var detailoverlaycover = document.getElementById("detailoverlaycover");
		
		detailimage.onmousedown = detailoverlay.onmousedown = detailoverlaycover.onmousedown = function(element)
		{
			return function(e) 
			{
				element.animator.seekTo(0.0);
			};
		}(detailoverlay);
		
		
		detailoverlay.animator = new Animator( { duration: 400, interval: 1 } );
		
	    detailoverlay.animator.addSubject(
	    	function(image, detailoverlaycover)
			{
				return function(value) 
				{
					if (value == 0.0)
					{
						image.style.visibility = "hidden";
						detailoverlaycover.style.visibility = "hidden";
					}
					setOpacity(image, value);
					setOpacity(detailoverlaycover, value / 1.5);
				}
			}(detailoverlay, detailoverlaycover)
		);	
	}
	
	this.createScrollAnimation=function()
	{
		var scrollcontainer = document.getElementById("scrollcontainer");
		var scrollcontent = document.getElementById("scrollcontent");
		
	   	self.images = getElementsByClassName("flickrimg");
	   	self.imageIndex = 0;
		self.currentImage = self.images[self.imageIndex];
		
		scrollcontainer.animator =
			new Animator(
				{
			    	duration: 400,
			    	interval: 1
			    }
			   );
		    
	    scrollcontainer.animator.addSubject(
	    	function(scrollableContent)
			{
				return function(value) 
				{
					
					self.position = self.startPosition + value * self.scrollStep;
					if (self.position >= 0)
					{
						self.position = 0;
					}
					
					if (value == 1.0)
					{
						self.isScrolling = false;
					}
					
					scrollableContent.style.marginLeft =  self.position + "px";
				}
			}(scrollcontent)
		);
	};
	
	
	this.navigatebackward=function(e)
	{
		if (self.isScrolling) 
		{
			return;	
		}
		
		
		self.imageIndex--;
		
		if (self.imageIndex >= 0)
		{
			self.isScrolling = true;
			self.startPosition = self.position;
		
			self.currentImage = self.images[self.imageIndex];
			self.scrollStep = self.currentImage.width + 3;
			
			var scrollcontainer = document.getElementById("scrollcontainer");
			scrollcontainer.animator.play();
		} 
		else 
		{
			self.imageIndex = 0;
			self.currentImage = self.images[self.imageIndex];
		}
		
	};
	
	this.navigateforward=function(e) 
	{
		if (self.isScrolling || self.imageIndex == self.images.length-1) 
		{
			return;	
		}
		
		self.scrollStep = -(self.currentImage.width + 3);
	
		if (self.imageIndex < self.images.length-1) 
		{
			self.startPosition = self.position;
			self.isScrolling = true;
			var scrollcontainer = document.getElementById("scrollcontainer");
			scrollcontainer.animator.play();
		}
		self.imageIndex = Math.min(self.imageIndex+1, self.images.length-1);	
		
		self.currentImage = self.images[self.imageIndex];
	};
	
	this.isOutside = function(evt, parent) 
	{
	  var elem = evt.relatedTarget || evt.toElement || evt.fromElement || evt.srcElement;
	 
	  while ( elem && elem !== parent) {
	    elem = elem.parentNode;
	  }
	 
	  if ( elem !== parent) {
	    return true
	  }
	};

	// Constructor logic
	this.reset();
	this.createDetailAnimation();
	this.createScrollAnimation();
	this.backtosets();
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

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

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
