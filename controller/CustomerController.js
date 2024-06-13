
import CustomerModel from "../model/CustomerModel.js";

import {customerArray} from "../db/DB.js";


var recodeIndex = undefined;

var searchCustomerIndex = undefined;

validation();

/*--- Save Customer Details ---*/

$("#cusBtnSubmit").on('click', () => {
    var cusId = $("#customerId").val();
    var cusName = $("#customerName").val();
    var cusAddress = $("#customerAddress").val();
    var cusContact = $("#customerContact").val();
    var cusNIC = $("#customerNIC").val();

    if (!validation()) {
        alert("Fill the Detail Correctly..");
        return;
    }


    let customer = new CustomerModel(cusId, cusName, cusAddress, cusContact, cusNIC);

    customerArray.push(customer);

    loadCusTable();

    alert("Customer Save Successful!!!");

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

    alert("Customer Update Successful!!!");

});


/*--- Delete Customer Details ---*/

$("#cusBtnDelete").on('click', () => {

    customerArray.splice(searchCustomerIndex, 1);

    loadCusTable();

    $('#cusRefreshBtn').click();

    alert("Customer Delete Successful!!!");
});



/*--- Refresh input fields ---*/

$("#cusBtnReset").on('click', () => {

    $('#searchResetBtn').click();

});


/*--- Validation Part ---*/


function validation(){


    //customer ID

    $('.ValidateCusID').on('propertychange input', function (e) {

        var cusId = $(".ValidateCusID").val();

        let index = customerArray.findIndex(item => item.cusId === cusId);

        if (index === 0) {
            $('.ValidateCusID').css("border","2px solid #FF00FF");
            return;
        }

        if(!cusId.match("[C]\\d{3,}")){
            $('.ValidateCusID').css("border","2px solid red");
        }else{
            $('.ValidateCusID').css("border","2px solid #92F646");
        }

    });


    //customer Name

    $('.ValidateCusName').on('propertychange input', function (e) {

        var cusName = $(".ValidateCusName").val();

        if(!cusName.match( "^[A-Z][a-zA-Z]{2,}$")){
            $('.ValidateCusName').css("border","2px solid red");
        }else{
            $('.ValidateCusName').css({"border":"2px solid #92F646"});
        }

    });

    //customer Address

    $('.ValidateCusAdd').on('propertychange input', function (e) {

        var cusAddress = $(".ValidateCusAdd").val();


        if(!cusAddress.match("^[A-Z][a-zA-Z]{2,}$")){
            $('.ValidateCusAdd').css("border","2px solid red");
        }else{
            $('.ValidateCusAdd').css("border","2px solid #92F646");
        }

    });


    //customer Contact

    $('.ValidateCusTel').on('propertychange input', function (e) {

        var cusTel = $(".ValidateCusTel").val();

        if(!cusTel.match( "^([+]94{1,3}|[0])([1-9]{2})([0-9]){7}$")){
            $('.ValidateCusTel').css("border","2px solid red");
        }else{
            $('.ValidateCusTel').css("border","2px solid #92F646");
        }

    });


    //customer NIC

    $('.ValidateCusNIC').on('propertychange input', function (e) {

        var cusNIC = $(".ValidateCusNIC").val();

        if(!cusNIC.match( "^([0-9]{9}[x|X|v|V]|[0-9]{12})$")){
            $('.ValidateCusNIC').css("border","2px solid red");
        }else{
            $('.ValidateCusNIC').css("border","2px solid #92F646");
        }

    });

    var cusId = $(".ValidateCusID").val();
    var cusName = $(".ValidateCusName").val();
    var cusTel = $(".ValidateCusTel").val();
    var cusAddress = $(".ValidateCusAdd").val();
    var cusNIC = $(".ValidateCusNIC").val();

    if(cusId.length === 0 || cusName.length === 0 || cusTel.length === 0 || cusAddress.length === 0 || cusNIC.length === 0){
        return false;
    }else {
        return true;
    }
}







