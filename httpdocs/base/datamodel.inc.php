<?

class DataModel {
  var $fields = array();
  var $isnew = true;
  var $id;
    
  function SetField($field, $value) {
    if ($field == "id") {
        	 $this->id = $value; 
    } else {
          $this->fields[$field] = $value;
    } 
  }

  function GetId(){
    return $this->id;
  }

  function GetEntityName() {
    return "No entity name";
  }
}

?>