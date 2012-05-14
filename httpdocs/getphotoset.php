<?
	include_once "./flickr.inc.php";
	
	// Loop through the photos and output the html
    foreach ((array)$setphotos['photoset']['photo'] as $photo) 
    {
        ?>
        <div class="imgsetcontainer">
       		<img id="id<?= $photo['id']?>" class="flickrimg"  alt='photo<?=$photo['id'] ?>' src="<?=$flickr->buildPhotoURL($photo, "large") ?>" />
			<span class="overlay"><?=$photo['title'] ?></span>			
		</div>
		<?
          
    }
?>

