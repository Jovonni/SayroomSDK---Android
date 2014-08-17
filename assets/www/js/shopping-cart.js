//----------------------------------------------------------------
// brand image List (contains the store list items)

function brandImagesList(brand_image_list_items) {
  
  this.brandImages = [];
  this.brand_image_list_items = brand_image_list_items;
  this.setOf = 0;
  this.loadBrandImageSet(this.brand_image_list_items);
};

brandImagesList.prototype.loadBrandImageSet = function (brand_image_list_items) {
	this.setOf+=10;
	var property = brand_image_list_items.results;
    for (var i = this.setOf-10; i < this.setOf; i++) {
		  if(property[i] == undefined){ 
		     this.setOf = property.length + 1;
		     return false;
		   }else{
		     this.brandImages.push(new image_list_item(
				property[i].brand_image_id, property[i].brand_name,
				property[i].brand_image, property[i].vocalized, 
				property[i].vocalizations
			  ));
		   }
    };
};




//----------------------------------------------------------------
// image_list_item class
function image_list_item(id, name, image, vocalized, vocalizations) {
    this.id = id;
	this.name = name;
	this.image = image;
    this.vocalized = vocalized;
	this.vocalizations = parseInt(vocalizations);
}



//----------------------------------------------------------------
// runner brand List (contains the brand list items)

function runnerBrandsList(runner_brand_list_items) {
  
  this.runnerBrands = [];
  this.runner_brand_list_items = runner_brand_list_items;
  this.setOf = 0;
  this.loadRunnerBrandSet(this.runner_brand_list_items);
};

runnerBrandsList.prototype.loadRunnerBrandSet = function (runner_brand_list_items) {
	this.setOf+=10;
	var property = runner_brand_list_items.results;
    for (var i = this.setOf-10; i < this.setOf; i++) {
		  if(property[i] == undefined){ 
		     this.setOf = property.length + 1;
		     return false;
		   }else{
		     this.runnerBrands.push(new brand_list_item(
				property[i].brand_id, property[i].brand_name,
				property[i].brand_image, property[i].brand_task, 
				property[i].brand_reward, property[i].vocalizations,
				property[i].captured, property[i].task_id,
				property[i].requirement
			  ));
		   }
    };
};



//----------------------------------------------------------------
// store_list_item class
function brand_list_item(id, name, image, task, reward, vocalizations, captured, taskId, requirement) {
    this.id = id;
	this.name = name;
	this.image = image;
	this.task = task;
    this.reward = reward;
	this.taskId = taskId;
	this.vocalizations = parseInt(vocalizations);
	this.captured = parseInt(captured);
	this.requirement = parseInt(requirement);
	
}


runnerBrandsList.prototype.getBrand = function (id) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id)
            return this.runnerBrands[i];
    }
    return null;
}



//----------------------------------------------------------------
// store_list_item class
function user(user) {
    this.id = user.user_id;
}



