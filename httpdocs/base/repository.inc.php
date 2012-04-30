<?

include_once "connectdb.inc.php";

class DBRepository
{ 
	
	// constructor
	function DBRepository()
	{ 
		  
	}
	
	function SaveModel(&$model) {
    	 $result = true;
    	 $sql = "";
       if ($model->isnew) {
    	  $sql = "insert into ".$model->GetEntityName()." ({0}) values ({1})";
    	  $fieldnames = "";
        $values = "";
        foreach($model->fields as $field => $value ) {
          $fieldnames = $fieldnames.",".$field;
          $values = $values.", '". mysql_real_escape_string($value) ."'"; 
        } 
        $values = trim($values, ',');
        $fieldnames = trim($fieldnames, ',');
        $sql = str_replace("{0}", $fieldnames, $sql);
        $sql = str_replace("{1}", $values, $sql);
        
       } else {
          $sql = "update ".$model->GetEntityName()." set {0} where id=".$model->GetId();
          $updates = "";
          foreach($model->fields as $field => $value ) {
            $updates = $updates.", ".$field." = '". mysql_real_escape_string($value) ."'"; 
          }  
          $updates = trim($updates, ',');
          $sql = str_replace("{0}", $updates, $sql);
          $result = $model->GetId();
       }
       
       mysql_query($sql);
       if ($model->isnew) {
        $result = mysql_insert_id();
        $model->isnew = false;
       }
       return $result;
  }
	
	function GetModels($entityname, $filter, $order, $orderdirection = "asc") {
	  $sql = "select * from ".$entityname;
        if (isset($filter)) 
        {
          if ($filter != "") 
          {
            $sql = "select * from ".$entityname." where ".$filter;
          }
        }
    
        if (isset($order)) 
        {
            $sql = $sql." order by `".$order."` ".$orderdirection;
        }

        $result = mysql_query($sql);
     
        $models = array();
     if (($result) && (mysql_num_rows($result) > 0)) {
     while ($row = mysql_fetch_assoc($result)) {
      $model = new DataModel();
      $model->entityname = $entityname;
      $model->isnew = false;
      foreach ($row as $key => $value) {  
     	  $model->SetField($key, $value);
      }
      array_push($models, $model);
     }
     }
     return $models;
  }
	
	// Fill the model with data.
  function Get(&$model) {
	   $sql = "select * from ".$model->GetEntityName()." where id = ".$model->GetId();
	   $result = mysql_query($sql);
     
     if (!$result) {
      return false;
     }
     $row = mysql_fetch_assoc($result);
     foreach ($row as $key=>$value) {
     	  $model->SetField($key, $value);
     }
     $model->isnew = false;
     return true;
  }
} 
?>