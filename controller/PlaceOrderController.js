
import {customerArray, itemArray, placeOrderArray} from "../db/DB.js";

import PlaceOrderModel  from "../model/PlaceOrderModel.js";



var indexOfCartRow = undefined;

var indexOfModelCartRow = undefined;

var indexNumOfOrderArray = undefined;

var totalValueOfItems  = 0;


function loadItemsID() {

    $(".OrderItemIdCmb").empty();

    itemArray.map(item => {
        console.log(item);
        console.log(item.itemId);

        var recode = `<option>${item.itemId}</option>`

        $(".OrderItemIdCmb").append(recode);

    });
}

loadItemsID();


function generateOrderId() {

    $("#orderId").val("OR001");

    if (placeOrderArray.length === 0) {

        $("#orderId").val("OR001");

    }

}

/*--- Add Customer Details to input Field  ---*/

$("#orderCustomerId").on("keypress", (event) => {

    if (event.which === 13) {

        var orderCustomerID = $("#orderCustomerId").val();

        customerArray.map(item => {

            if (item.cusId === orderCustomerID ) {

                $("#orderCustomerName").val(item.cusName);
                $("#orderCustomerAddress").val(item.cusAddress);

            }
        })
    }
});


/*--- Add Item Details to input Field  ---*/

$("#orderItemId").on("keypress", (event) => {

    if (event.which === 13) {

        var orderItemID = $("#orderItemId").val();

        itemArray.map(item => {

            if (item.itemId === orderItemID ) {

                $("#orderItemDesc").val(item.itemName);
                $("#orderItemUnitPrice").val(item.itemUnitPrice);
                $("#orderItemQTY").attr("placeholder", item.itemQTY);

            }
        });
    }
});

/*--- Add To Cart ---*/

$("#addToCartBtn").on('click', () => {

    var orderId = $("#orderId").val();
    var orderCustomerId = $("#orderCustomerId").val();
    var orderDate = $("#orderDate").val();
    var orderItemId = $("#orderItemId").val();
    var orderItemName = $("#orderItemDesc").val();
    var orderItemPrice = +$("#orderItemUnitPrice").val();
    var orderItemQTY = +$("#orderItemQTY").val();


    var total = orderItemPrice * orderItemQTY;

    totalValueOfItems += total;

    console.log(totalValueOfItems);

    $("#orderSubTotal").val(totalValueOfItems);


    itemArray.map((item,index) => {

        if(item.itemId === orderItemId) {

            var itemQTY = item.itemQTY;

            if (itemQTY > orderItemQTY) {
                var newQTY = itemQTY - orderItemQTY;

                item.itemQTY = newQTY;

                $("#orderItemQTY").attr("placeholder", item.itemQTY);
            }
        }

    });

    let placeOrder= new PlaceOrderModel(orderId, orderCustomerId, orderDate, orderItemId, orderItemName, orderItemPrice, orderItemQTY, total);

    placeOrderArray.push(placeOrder);

    loadOrderCartTable();

    $("#addToCartResetBtn").click();

});


/*--- Load to table Order Details ---*/

function loadOrderCartTable() {

    $("#orderCart-tbody").empty();

    var orderID = $("#orderId").val();

    placeOrderArray.map(item => {

        if (item.orderId === orderID) {

            var recode = `<tr>
                <td class="order-itemId-value">${item.itemId}</td>
                <td class="order-itemName-value">${item.itemName}</td>
                <td class="order-price-value">${item.price}</td>
                <td class="order-qty-value">${item.qty}</td>
                <td class="order-orderTotal-value">${item.orderTotal}</td>
                <td class="order-orderDeleteAction-value">
                    <button type="button" class="btn btn-danger btn-sm orderDeleteActionBtn">Delete</button>                           
                </td>
            </tr>`

            $("#orderCart-tbody").append(recode);
        }
    });
}

/*--- Table row action ---*/

$("#orderCart-tbody").on('click', 'tr', function () {

    var indexOfRow = $(this).index();

    indexOfCartRow = indexOfRow;

    let orderItemIdValue = $(this).find(".order-itemId-value").text();
    let orderItemNameValue = $(this).find(".order-itemName-value").text();
    let orderPriceValue = $(this).find(".order-price-value").text();
    let orderQtyValue = $(this).find(".order-qty-value").text();

    $("#orderItemId").val(orderItemIdValue);
    $("#orderItemDesc").val(orderItemNameValue);
    $("#orderItemUnitPrice").val(orderPriceValue);
    $("#orderItemQTY").val(orderQtyValue);

    placeOrderArray.map((item, index) => {

        console.log("pasindu");

        console.log("Checking item:", {itemId: item.itemId, itemName: item.itemName, price: item.price, qty: item.qty});

        if (item.itemId === orderItemIdValue && item.itemName === orderItemNameValue) {

            indexNumOfOrderArray = index;

        }
    });
});


/*--- Delete Order Cart Item Details ---*/

$("#orderCart-tbody").on('click', '.orderDeleteActionBtn', function (event) {

    event.stopPropagation();

    placeOrderArray.map((item,index) => {

        if (indexNumOfOrderArray === index) {

            var qty = +item.qty;

            var price = +item.price;

            totalValueOfItems = totalValueOfItems - (qty * price);

            $("#orderSubTotal").val(totalValueOfItems);

            itemArray.map(item => {

               var item_qty =  +item.itemQTY;

               item.itemQTY = qty+item_qty;

            });
        }

    });

    placeOrderArray.splice(indexNumOfOrderArray, 1);

    loadOrderCartTable();
});


/*--- Purchase Balance Detail ---*/

$("#purchaseBtn").on('click', () => {

    var orderCash = +$("#orderCash").val();

    var orderDiscount = +$("#orderDiscount").val();

    var orderBalance = +$("#orderBalance").val();
    var orderTotal = +$("#orderTotal").val();
    var orderSubTotal = +$("#orderSubTotal").val();

    totalValueOfItems  = 0;

});

$("#orderDiscount").on("keypress", (event) => {

    if (event.which === 13) {

        var orderCash = +$("#orderCash").val();
        var orderDiscount = +$("#orderDiscount").val();
        var orderSubTotal = +$("#orderSubTotal").val();

        var total = (orderSubTotal * (100 - orderDiscount)) / 100;

        $("#orderTotal").val(total);

        var balance = orderCash - total;

        $("#orderBalance").val(balance);

    }
});


/*--- Search OrderId Detail part ---*/

$("#searchOrderIdBtn").on('click', () => {
    console.log("ssss");

    loadModalOrderDetail();

});

function loadModalOrderDetail() {
    var searchOrderId = $("#searchOrderId").val();

    $("#model-order-tbody").empty();

    placeOrderArray.map(item => {

        console.log("dddd");

        if (item.orderId === searchOrderId) {

            console.log("hhh");

            var recode = `<tr>
                <td class="order-model-itemId-value">${item.itemId}</td>
                <td class="order-model-itemName-value">${item.itemName}</td>
                <td class="order-model-price-value">${item.price}</td>
                <td class="order-model-qty-value">${item.qty}</td>
                <td class="order-model-orderTotal-value">${item.orderTotal}</td>
            </tr>`

            $("#model-order-tbody").append(recode);
        }
    });
}


/*--- Search Model Table row action ---*/

$("#model-order-tbody").on('click', 'tr', function () {

    var indexOfRow = $(this).index();

    indexOfModelCartRow = indexOfRow;

    let orderItemIdValue = $(this).find(".order-model-itemId-value").text();
    let orderItemNameValue = $(this).find(".order-model-itemName-value").text();
    let orderPriceValue = $(this).find(".order-model-price-value").text();
    let orderQtyValue = $(this).find(".order-model-qty-value").text();

    $("#modalOrderItemId").val(orderItemIdValue);
    $("#modalOrderItemDesc").val(orderItemNameValue);
    $("#modalOrderItemUnitPrice").val(orderPriceValue);
    $("#modalOrderItemQTY").val(orderQtyValue);

    placeOrderArray.map((item, index) => {

        console.log("pasindu");

        console.log("Checking item:", {itemId: item.itemId, itemName: item.itemName, price: item.price, qty: item.qty});

        if (item.itemId === orderItemIdValue && item.itemName === orderItemNameValue) {

            indexNumOfOrderArray = index;

            $("#modalOrderId").val(item.orderId);
            $("#modalOrderDate").val(item.date);
            $("#modalOrderCusId").val(item.customerId);

        }
    });
});




/*--- Add Modal Customer Details to input Field  ---*/

$("#modalOrderCusId").on("keypress", (event) => {

    if (event.which === 13) {

        var orderCustomerID = $("#modalOrderCusId").val();

        customerArray.map(item => {

            if (item.cusId === orderCustomerID ) {

                $("#modalOrderCusName").val(item.cusName);
                $("#modalOrderCusAddress").val(item.cusAddress);

            }
        })
    }
});


/*--- Add Modal Item Details to input Field  ---*/

$("#modalOrderItemId").on("keypress", (event) => {

    if (event.which === 13) {

        var orderItemID = $("#modalOrderItemId").val();

        itemArray.map(item => {

            if (item.itemId === orderItemID ) {

                $("#modalOrderItemDesc").val(item.itemName);
                $("#modalOrderItemUnitPrice").val(item.itemUnitPrice);
                $("#modalOrderItemQTY").attr("placeholder", item.itemQTY);
            }
        });
    }
});


/*--- Delete Order Details ---*/

$("#modalDeleteBtn").on('click', () => {

    var searchOrderId = $("#searchOrderId").val();

    placeOrderArray.map((item,index) => {

        if (item.orderId === searchOrderId) {
            placeOrderArray.splice(index, 1);
        }
    });

    loadModalOrderDetail();

});

/*--- Update Item Details ---*/

$("#modalUpdateBtn").on('click', () => {

    var orderId = $("#modalOrderId").val();
    var orderCustomerId = $("#modalOrderCusId").val();
    var orderDate = $("#modalOrderDate").val();
    var orderItemId = $("#modalOrderItemId").val();
    var orderItemName = $("#modalOrderItemDesc").val();
    var orderItemPrice = +$("#modalOrderItemUnitPrice").val();
    var orderItemQTY = +$("#modalOrderItemQTY").val();
    var total = orderItemPrice * orderItemQTY;

    totalValueOfItems += total;

    $("#orderSubTotal").val(totalValueOfItems);

    itemArray.map((item,index) => {

        if(item.itemId === orderItemId) {

            var itemQTY = item.itemQTY;

            if (itemQTY > orderItemQTY) {
                var newQTY = itemQTY - orderItemQTY;

                item.itemQTY = newQTY;

                $("#modalOrderItemQTY").attr("placeholder", item.itemQTY);
            }
        }
    });

    placeOrderArray.map((item,index) => {

        if (indexNumOfOrderArray === index) {

            item.orderId = orderId;
            item.customerId = orderCustomerId;
            item.date = orderDate;
            item.itemId = orderItemId;
            item.itemName = orderItemName;
            item.price = orderItemPrice;
            item.qty = orderItemQTY;
            item.orderTotal = total;
        }
    });
    loadModalOrderDetail();
});

/*--- View All Order Details ---*/

$("#viewAllOrders").on('click', () => {
    $("#allOrderDetails").empty();

    placeOrderArray.map(item => {

        var recode = `<tr>
                <td class="order-model-itemId-value">${item.orderId}</td>
                <td class="order-model-itemId-value">${item.itemId}</td>
                <td class="order-model-itemName-value">${item.itemName}</td>
                <td class="order-model-price-value">${item.price}</td>
                <td class="order-model-qty-value">${item.qty}</td>
                <td class="order-model-orderTotal-value">${item.orderTotal}</td>
            </tr>`

        $("#allOrderDetails").append(recode);
    });
});


$("#navOrder").on('click', () => {
    loadItemsID();
    generateOrderId();
});