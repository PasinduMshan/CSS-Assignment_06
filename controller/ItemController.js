
import ItemModel from "../model/ItemModel.js";

import {customerArray, itemArray} from "../db/DB.js";



var recodeIndex = undefined;

var searchItemIndex = undefined;

validation();

/*--- Save Item Details ---*/

$("#itemBtnSubmit").on('click', () => {
    var itemId = $("#itemId").val();
    var itemName = $("#itemName").val();
    var itemUnitPrice = $("#itemUnitPrice").val();
    var itemQty = $("#itemQTY").val();

    if (!validation()) {
        alert("Fill the Detail Correctly..");
        return;
    }

    let item = new ItemModel(itemId, itemName, itemUnitPrice, itemQty);

    itemArray.push(item);

    loadItemTable();

    alert("Item Save Successful!!!");

    $("#itemBtnReset").click();
});


/*--- Load to table Customer Details ---*/

function loadItemTable() {
  $("#item-tbody").empty();

  itemArray.map(item => {

    var recode = `<tr>
    <td class="item-id-value">${item.itemId}</td>
    <td class="item-Name-value">${item.itemName}</td>
    <td class="item-unitPrice-value">${item.itemUnitPrice}</td>
    <td class="item-Qty-value">${item.itemQTY}</td>
    </tr>`

    $("#item-tbody").append(recode);
  });
}

/*--- Table row action ---*/

$("#item-tbody").on('click', 'tr', function () {

    var indexOfRow = $(this).index();

    recodeIndex = indexOfRow;

    let itemIDValue = $(this).find(".item-id-value").text();
    let itemNameValue = $(this).find(".item-Name-value").text();
    let itemUnitPriceValue = $(this).find(".item-unitPrice-value").text();
    let itemQtyValue = $(this).find(".item-Qty-value").text();


    $("#itemId").val(itemIDValue);
    $("#itemName").val(itemNameValue);
    $("#itemUnitPrice").val(itemUnitPriceValue);
    $("#itemQTY").val(itemQtyValue);

    $("#searchItemCode").val(itemIDValue);
});

/*--- Item Search  ---*/

$("#searchItemBtn").on('click', () => {

    let searchICode = $("#searchItemCode").val();

    itemArray.map((item, index) => {
        if (item.itemId === searchICode) {
            $("#modalItemId").val(item.itemId);
            $("#modalItemName").val(item.itemName);
            $("#modalItemUnitPrice").val(item.itemUnitPrice);
            $("#modalItemQTY").val(item.itemQTY);
        }

        searchItemIndex = index;
    });

    $("#itemBtnReset").click();
});

/*--- Update Item Details ---*/

$("#itemBtnUpdate").on('click', () => {
    let item_ID = $("#modalItemId").val();
    let item_Name = $("#modalItemName").val();
    let item_UnitPrice = $("#modalItemUnitPrice").val();
    let item_Qty = $("#modalItemQTY").val();

    let itemObj = itemArray[searchItemIndex];

    itemObj.itemId = item_ID;
    itemObj.itemName = item_Name;
    itemObj.itemUnitPrice = item_UnitPrice;
    itemObj.itemQTY = item_Qty;

    alert("Item Update Successful!!!");

    loadItemTable();
});

/*--- Delete Customer Details ---*/

$("#itemBtnDelete").on('click', () => {

    itemArray.splice(searchItemIndex, 1);

    alert("Item Delete Successful!!!");

    loadItemTable();

    $("#itemModalResetBtn").click();
});

/*--- Refresh input fields ---*/

$("#itemBtnReset").on('click', () => {

    $("#searchItemResetBtn").click();

});


/*--- Validation Part ---*/


function validation(){


    //Item ID

    $('.ValidateItemId').on('propertychange input', function (e) {

        var itemID = $(".ValidateItemId").val();

        let index = itemArray.findIndex(item => item.itemId === itemID);

        if (index === 0) {
            $('.ValidateItemId').css("border","2px solid #FF00FF");
            return;
        }

        if(!itemID.match("[I]\\d{3,}")){
            $('.ValidateItemId').css("border","2px solid red");
        }else{
            $('.ValidateItemId').css("border","2px solid #92F646");
        }

    });


    //Item Name

    $('.ValidateItemDesc').on('propertychange input', function (e) {

        var itemDesc = $(".ValidateItemDesc").val();

        if(!itemDesc.match( "^[A-Z][a-zA-Z]{2,}$")){
            $('.ValidateItemDesc').css("border","2px solid red");
        }else{
            $('.ValidateItemDesc').css({"border":"2px solid #92F646"});
        }

    });

    //item Price

    $('.ValidateItemPrice').on('propertychange input', function (e) {

        var itemPrice = $(".ValidateItemPrice").val();


        if(!itemPrice.match("^\\d+$")){
            $('.ValidateItemPrice').css("border","2px solid red");
        }else{
            $('.ValidateItemPrice').css("border","2px solid #92F646");
        }

    });


    //item QTY

    $('.ValidateItemQty').on('propertychange input', function (e) {

        var itemQty = $(".ValidateItemQty").val();

        if(!itemQty.match( "^\\d+$")){
            $('.ValidateItemQty').css("border","2px solid red");
        }else{
            $('.ValidateItemQty').css("border","2px solid #92F646");
        }

    });


    var itemID = $(".ValidateItemId").val();
    var itemDesc = $(".ValidateItemDesc").val();
    var itemPrice = $(".ValidateItemPrice").val();
    var itemQty = $(".ValidateItemQty").val();

    if(itemID.length === 0 || itemDesc.length === 0 || itemPrice.length === 0 || itemQty.length === 0){
        return false;
    }else {
        return true;
    }
}
