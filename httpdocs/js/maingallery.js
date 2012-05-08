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
	
	this.createHoverAnimation = function(element)
	{			
		var imageElements = getElementsByClassName("flickrimg", "img", element.parentNode);
		
		
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
	this.isScrolling = false;
	this.imageIndex = 0;
	this.position = 0;
	
	this.setGalleryMoveOver(imgoverlayclass);
	this.createScrollAnimation();
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