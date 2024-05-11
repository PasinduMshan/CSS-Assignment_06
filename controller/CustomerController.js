
import CustomerModel from "../model/CustomerModel.js";

import {customerArray} from "../db/DB.js";


var recodeIndex = undefined;

var searchCustomerIndex = undefined;


/*--- Save Customer Details ---*/

$("#cusBtnSubmit").on('click', () => {
    var cusId = $("#customerId").val();
    var cusName = $("#customerName").val();
    var cusAddress = $("#customerAddress").val();
    var cusContact = $("#customerContact").val();
    var cusNIC = $("#customerNIC").val();

    let customer = new CustomerModel(cusId, cusName, cusAddress, cusContact, cusNIC);

    customerArray.push(customer);

    loadCusTable();

    $("#cusBtnReset").click();
});

/*--- Load to table Customer Details ---*/

function loadCusTable() {
    $("#customer-tbody").empty();

    customerArray.map(item => {
       var recode = `<tr>
           <td class="customer-cusId-value">${item.cusId}</td>
           <td class="customer-cusName-value">${item.cusName}</td>
           <td class="customer-cusAddress-value">${item.cusAddress}</td>
           <td class="customer-cusContact-value">${item.cusContact}</td>
           <td class="customer-cusNIC-value">${item.cusNIC}</td>
       </tr>`;

       $("#customer-tbody").append(recode);
    });
}


/*--- Table row action ---*/

$("#customer-tbody").on('click', 'tr', function () {

    var index = $(this).index();

    recodeIndex = index;

    let customerIDValue = $(this).find(".customer-cusId-value").text();
    let customerNameValue = $(this).find(".customer-cusName-value").text();
    let customerAddressValue = $(this).find(".customer-cusAddress-value").text();
    let customerContactValue = $(this).find(".customer-cusContact-value").text();
    let customerNICValue = $(this).find(".customer-cusNIC-value").text();

    $("#customerId").val(customerIDValue);
    $("#customerName").val(customerNameValue);
    $("#customerAddress").val(customerAddressValue);
    $("#customerContact").val(customerContactValue);
    $("#customerNIC").val(customerNICValue);

    $("#searchCusContact").val(customerContactValue);

});


/*--- Customer Search  ---*/

$("#searchCusBtn").on('click', () => {

    let cusSearchContact = $("#searchCusContact").val();

    customerArray.map((item, index) => {
        if (item.cusContact === cusSearchContact ) {
            $("#modalCusId").val(item.cusId);
            $("#modalCusName").val(item.cusName);
            $("#modalCusAddress").val(item.cusAddress);
            $("#modalCusContact").val(item.cusContact);
            $("#modalCusNIC").val(item.cusNIC);
        }

        searchCustomerIndex = index;
    });

    $("#cusBtnReset").click();
});


/*--- Update Customer Details ---*/

$("#cusBtnUpdate").on('click', () => {

    let customerId = $("#modalCusId").val();
    let customerName = $("#modalCusName").val();
    let customerAddress = $("#modalCusAddress").val();
    let customerContact = $("#modalCusContact").val();
    let customerNIC = $("#modalCusNIC").val();

    let customerObj = customerArray[searchCustomerIndex];

    customerObj.cusId = customerId;
    customerObj.cusName = customerName;
    customerObj.cusAddress = customerAddress;
    customerObj.cusContact = customerContact;
    customerObj.cusNIC = customerNIC;

    loadCusTable();

});


/*--- Delete Customer Details ---*/

$("#cusBtnDelete").on('click', () => {

    customerArray.splice(searchCustomerIndex, 1);

    loadCusTable();

    $('#cusRefreshBtn').click();
});



/*--- Refresh input fields ---*/

$("#cusBtnReset").on('click', () => {

    $('#searchResetBtn').click();

});






