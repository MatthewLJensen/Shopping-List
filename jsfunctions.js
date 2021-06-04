/*
Matthew Jensen
Created Oct 15, 2020
*/
var temp_edit_value;

document.addEventListener('keydown', function (event) {
	/*console.log(event.keyCode);*/
	if (event.keyCode == 13) {
        addItem();
    }
	else if (event.keyCode == 27) {
        resetInputs();
    }
});



function onLoad() {
	adjustTotals();

}

function addItem() {
	var itemDiv = document.querySelector("#item_template");
	var itemTemplate = itemDiv.cloneNode(true);
	var unchecked = document.querySelector("#unchecked");

	var value_quantity = document.querySelector("#quantity_value");
	var value_unit = document.querySelector("#unit_value");
	var value_item = document.querySelector("#item_value");
	var value_price = document.querySelector("#price_value");
	
	var quantity = itemTemplate.querySelector("#quantity_template");
	var unit = itemTemplate.querySelector("#unit_template");
	var item = itemTemplate.querySelector("#item_template");
	var price = itemTemplate.querySelector("#price_template");

	if (value_item.value == "" || value_price.value == ""){
		return;
	}
	
	quantity.innerText = value_quantity.value;
	unit.innerText = ((value_unit.value.includes("each")) ? '' : value_unit.value);
	item.innerText = value_item.value;
	price.innerText = "(" + ((!value_price.value.includes("$")) ? '$' : '') + value_price.value + "/" + ((value_unit.value == "") ? 'each' : value_unit.value) + ")";
	
	itemTemplate.classList.remove("template");
	itemTemplate.querySelector("#checkbox").checked = false; 
	unchecked.appendChild(itemTemplate);
	
	value_quantity.value = "1";
	value_unit.value = "";
	value_item.value = "";
	value_price.value = "";
	
	adjustTotals();
}

function swapCart(item){
	/*console.log(item.parentNode.parentNode.getAttribute("id"));*/
	var unchecked = document.querySelector("#unchecked");
	var checked = document.querySelector("#checked");
	if (item.parentNode.parentNode.getAttribute("id") == "unchecked"){
		checked.appendChild(item.parentNode);
	}else{
		unchecked.appendChild(item.parentNode);
	}
	adjustTotals();
}

function deleteItem(item){
	var con = confirm("Are you sure you want to delete \"" + item.parentNode.querySelector("#item_template").innerHTML + "\" from your shopping list?");
    if (con) {
		item.parentNode.remove();
    }
	adjustTotals();
}

function checkout(){
	var checked = document.querySelector("#checked");
	
	var con = confirm("Are you sure you want to remove all (" + checked.childElementCount + ") checked items from the shopping list?");
    if (con) {
		
		while (checked.firstChild){
			checked.removeChild(checked.firstChild);
		}		
		adjustTotals();
	}
}

function editItem(item){
	
	var con = confirm("Are you sure you want to edit this item?");
    if (con) {
		var value_quantity = document.querySelector("#quantity_value");
		var value_unit = document.querySelector("#unit_value");
		var value_item = document.querySelector("#item_value");
		var value_price = document.querySelector("#price_value");
		var cancel_edit = document.querySelector("#cancel_edit");
		
		value_quantity.value = item.parentNode.querySelector("#quantity_template").innerHTML;
		value_unit.value = ((value_unit.value == "") ? 'each' : item.parentNode.querySelector("#unit_template").innerHTML);
		value_item.value = item.parentNode.querySelector("#item_template").innerHTML;
		value_price.value = "$" + item.parentNode.querySelector("#price_template").innerHTML.replace(/[^0-9.]/g, "");
		
		temp_edit_value = item.parentNode;
		temp_edit_parent = item.parentNode.parentNode;
		
		cancel_edit.style.visibility = "visible";
		
		item.parentNode.remove();
		
		adjustTotals();
	}
}

function cancelEditItem(){
	var value_quantity = document.querySelector("#quantity_value");
	var value_unit = document.querySelector("#unit_value");
	var value_item = document.querySelector("#item_value");
	var value_price = document.querySelector("#price_value");
	var cancel_edit = document.querySelector("#cancel_edit");
	
	value_quantity.value = "1";
	value_unit.value = "";
	value_item.value = "";
	value_price.value = "";
	
	temp_edit_parent.appendChild(temp_edit_value);
	
	cancel_edit.style.visibility = "hidden";
	
	adjustTotals();
}

function resetInputs(){
	var value_quantity = document.querySelector("#quantity_value");
	var value_unit = document.querySelector("#unit_value");
	var value_item = document.querySelector("#item_value");
	var value_price = document.querySelector("#price_value");
	
	value_quantity.value = "1";
	value_unit.value = "";
	value_item.value = "";
	value_price.value = "";
}

function adjustTotals(){
	var uncheckedTotal = 0;
	var checkedTotal = 0;
	
	var unchecked = document.querySelector("#unchecked");
	var uncheckedElements = unchecked.children;
	var checked = document.querySelector("#checked");
	var checkedElements = checked.children;
	
	for (var i = 0; i < uncheckedElements.length; i++) {
		var uncheckedChild = uncheckedElements[i];
		uncheckedTotal += (parseFloat(uncheckedChild.querySelector("#price_template").innerHTML.replace(/[^0-9.]/g, "")) * parseInt(uncheckedChild.querySelector("#quantity_template").innerHTML));
	}
	
	for (var i = 0; i < checkedElements.length; i++) {
		var checkedChild = checkedElements[i];
		checkedTotal += (parseFloat(checkedChild.querySelector("#price_template").innerHTML.replace(/[^0-9.]/g, "")) * parseInt(checkedChild.querySelector("#quantity_template").innerHTML));
	}
	
	
	
	var uncheckedValue = document.querySelector("#uncheckedValue");
	uncheckedValue.innerHTML = uncheckedTotal;
	
	var checkedValue = document.querySelector("#checkedValue");
	checkedValue.innerHTML = checkedTotal;
	
	
	/*console.log("Unchecked total: " + uncheckedTotal);
	console.log("Checked total: " + checkedTotal);*/
}