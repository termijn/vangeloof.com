<?

	include_once "./phpflickr/phpFlickr.php";
	
	$flickr = new phpFlickr("38645fd437628da4df184582e9b76143", "e6a8d80411b24b0e");
	
	$flickr->enableCache("db", "mysql://m1_4890ced1:gRyAwWTcnG@db2.hosting2go.nl/m1_4890ced1");
	$flickr->setToken("72157629847522041-50c5898e70acfd7d");
	
	$person = $flickr->people_findByUsername("Martijn van Geloof");
 
 	$sets = $flickr->photosets_getList($person['id']);
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
		<p id="mainsection">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		
		
			<div class="line">
				<div class="navigateback">
						&larr;
				</div>
				<div class="navigateforward">
						&rarr;
				</div>
				<span id="backtoimagesets">&uarr;</span>
			</div>
			
			<div class="gallery" >
				
		
				<div id="scrollcontainer" class="galleryscroller" >
					<div id="pageoverlay">
						<img src="ajax-loader.gif" alt="loading" />
					</div>	
					<div id="scrollcontent" >
					<?
						foreach ((array)$sets['photoset'] as $photoset)
					    {
					    	$i++;
					    	//echo "<br/>". $photoset["title"]."<br>";
							$photos = $flickr->photosets_getPhotos($photoset["id"], NULL, NULL, 1);
							
							// Loop through the photos and output the html
						    foreach ((array)$photos['photoset']['photo'] as $photo) 
						    {
						        ?>
						        <div class="imgsetcontainer">
						       		<img id="id<?= $photo['id']?>" class="flickrimg"  alt='<?=$photoset["id"] ?>' src="<?=$flickr->buildPhotoURL($photo, "medium_640") ?>" />
									<span class="overlay"><?=$photoset['title'] ?></span>			
								</div>
								<?
						          
						    }
						}
					?>
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
	</body>
</html>
