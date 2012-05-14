<?
	include_once "./flickr.inc.php";
	
 	
	//foreach ((array)$sets['photoset'] as $photoset)
    //{
    	//$i++;
    	//echo "<br/>". $photoset["title"]."<br>";
		//$photos = $flickr->photosets_getPhotos($photoset["id"], NULL, NULL, 1);
		
		// Loop through the photos and output the html
	    foreach ($setsphotos as $setphoto) 
	    {
	        ?>
	        <div class="imgsetcontainer">
	       		<img id="id<?= $setphoto['id']?>" class="flickrimg"  alt='set<?=$setphoto["setid"] ?>' src="<?=$flickr->buildPhotoURL($setphoto['photo'], "medium_640") ?>" />
				<span class="overlay"><?=$setphoto['title'] ?></span>			
			</div>
			<?
	          
	    }
		
	//}
?>