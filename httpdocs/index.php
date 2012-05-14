<?
	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<title>Martijn van Geloof</title>
		<link href='http://fonts.googleapis.com/css?family=Dosis|Oxygen' rel='stylesheet' type='text/css' />
		<link href='style/style.css' rel='stylesheet' type='text/css' />
		<script type="text/javascript" src="js/animator.min.js"></script>
		<script type="text/javascript" src="js/maingallery.js"></script>
	</head>
	<body onload="createImageAnimations()">
		<p id="titlesection">
			<span id="title_martijn">Martijn van Geloof</span> <span id="title_photography">Photography</span>	
		</p>
		<!--p id="mainsection">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p-->
			<div class="line">
				<div class="navigateback">
						&larr;
				</div>
				<div class="navigateforward">
						&rarr;
				</div>
				<span id="backtoimagesets">&uarr;</span>
			</div>
			
			<div class="gallery">
				<div id="scrollcontainer" class="galleryscroller" >
					<div id="pageoverlay">
						<img src="ajax-loader.gif" alt="loading" />
					</div>	
					<div id="scrollcontent" >
					
					</div>
				</div>
			</div>
			
			<div/>
			
			<div class="line">
				<div class="navigateback">
						&larr;
				</div>
				<div class="navigateforward">
						&rarr;
				</div>
			</div>
			
			<div id="detailoverlaycover">
				
			</div>
			<div id="detailoverlay">
				<img id="detailimage" src="" alt="detail image" />
				<div>
					Klik om terug te gaan
				</div>
			</div>
			
	</body>
</html>
