<?

	include_once "./phpflickr/phpFlickr.php";
	
	$flickr = new phpFlickr("38645fd437628da4df184582e9b76143", "e6a8d80411b24b0e");
	
	$flickr->enableCache("db", "mysql://m1_4890ced1:gRyAwWTcnG@db2.hosting2go.nl/m1_4890ced1");
	$flickr->setToken("72157629847522041-50c5898e70acfd7d");
	
	$person = $flickr->people_findByUsername("Martijn van Geloof");
 
 	$sets = $flickr->photosets_getList($person['id']);
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