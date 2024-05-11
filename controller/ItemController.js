
import ItemModel from "../model/ItemModel.js";

import {customerArray, itemArray} from "../db/DB.js";



var recodeIndex = undefined;

var searchItemIndex = undefined;


/*--- Save Item Details ---*/

$("#itemBtnSubmit").on('click', () => {
    var itemId = $("#itemId").val();
    var itemName = $("#itemName").val();
    var itemUnitPrice = $("#itemUnitPrice").val();
    var itemQty = $("#itemQTY").val();
    

    let item = new ItemModel(itemId, itemName, itemUnitPrice, itemQty);

    itemArray.push(item);

    loadItemTable();

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

/*--- Update Customer Details ---*/

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

    loadItemTable();
});

/*--- Delete Customer Details ---*/

$("#itemBtnDelete").on('click', () => {

    itemArray.splice(searchItemIndex, 1);

    loadItemTable();

    $("#itemModalResetBtn").click();
});

/*--- Refresh input fields ---*/

$("#itemBtnReset").on('click', () => {

    $("#searchItemResetBtn").click();

});