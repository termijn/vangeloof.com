<?

	include_once "./phpflickr/phpFlickr.php";
	
	$flickr = new phpFlickr("38645fd437628da4df184582e9b76143", "e6a8d80411b24b0e");
	
	$flickr->enableCache("db", "mysql://m1_4890ced1:gRyAwWTcnG@db2.hosting2go.nl/m1_4890ced1");
	$flickr->setToken("72157629847522041-50c5898e70acfd7d");
	
	$person = $flickr->people_findByUsername("Martijn van Geloof");
 
    // Get the friendly URL of the user's photos
    $photos_url = $flickr->urls_getUserPhotos($person['id']);
 
 	$sets = $flickr->photosets_getList($person['id']);
    
	// see http://www.smashingmagazine.com/2009/07/10/35-beautiful-photography-websites/
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<title>Martijn van Geloof</title>
		<link href='http://fonts.googleapis.com/css?family=Dosis|Oxygen|Averia+Libre' rel='stylesheet' type='text/css' />
		<link href='style/style.css' rel='stylesheet' type='text/css' />
		<script type="text/javascript" src="js/animator.min.js"></script>
		<script type="text/javascript" src="js/maingallery.js"></script>
	</head>
	<body onload="createImageAnimations()">
		<p>
			<span id="title_martijn">Martijn van Geloof</span> <span id="title_photography">Photography</span>	
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		
		<div>
			<div class="navigateback" onclick="navigatebackward()">
					&larr;
			</div>
			<div class="navigateforward" onclick="navigateforward()">
					&rarr;
			</div>
		</div>
		
		<div class="gallery">
			<div id="scrollcontainer" class="galleryscroller" >	
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
					        //echo "<a href=$photos_url$photo[id]>";
					        ?>
					        <div class="imgsetcontainer">
					       		<img id="id<?= $photo['id']?>" class="flickrimg"  alt='$photo[title]' src="<?=$flickr->buildPhotoURL($photo, "medium_640") ?>" />
								<span class="overlay"><?=$photoset['title'] ?></span>			
							</div>
							<?
					          
					    }
						// If it reaches the sixth photo, insert a line break
				        if ($i % 2 == 0) 
				        {
				            //echo "<br>\n";
				        }
						
						if ($i == 8)
						{
							break;
						}
						
					}
				?>
				</div>
			</div>
		</div>
		
		<div>
			<div class="navigateback" onclick="navigatebackward()">
					&larr;
			</div>
			<div class="navigateforward" onclick="navigateforward()">
					&rarr;
			</div>
		</div>
	</body>
</html>
