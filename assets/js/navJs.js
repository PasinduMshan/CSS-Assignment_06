$("#header-navBar").css({display: 'none'});
$("#dashBoardPage").css({display: 'none'});
$("#customerPage").css({display: 'none'});
$("#itemPage").css({display: 'none'});
$("#placeOrderPage").css({display: 'none'});

$("#btn-logOut").on('click', () => {
    $("#header-navBar").css({display: 'none'});
    $("#dashBoardPage").css({display: 'none'});
    $("#customerPage").css({display: 'none'});
    $("#itemPage").css({display: 'none'});
    $("#placeOrderPage").css({display: 'none'});

    $("#loginPage").css({display: 'block'});
});

$("#btn-Login").on('click', () => {
    $("#loginPage").css({display: 'none'});
    $("#customerPage").css({display: 'none'});
    $("#itemPage").css({display: 'none'});
    $("#placeOrderPage").css({display: 'none'});

    $("#header-navBar").css({display: 'block'});
    $("#dashBoardPage").css({display: 'block'});
});

$("#navHome").on('click', () => {
    $("#loginPage").css({display: 'none'});
    $("#customerPage").css({display: 'none'});
    $("#itemPage").css({display: 'none'});
    $("#placeOrderPage").css({display: 'none'});

    $("#header-navBar").css({display: 'block'});
    $("#dashBoardPage").css({display: 'block'});
});

$("#navCustomer").on('click', () => {
    $("#loginPage").css({display: 'none'});
    $("#dashBoardPage").css({display: 'none'});
    $("#itemPage").css({display: 'none'});
    $("#placeOrderPage").css({display: 'none'});

    $("#header-navBar").css({display: 'block'});
    $("#customerPage").css({display: 'block'});
});

$("#navItem").on('click', () => {
    $("#loginPage").css({display: 'none'});
    $("#dashBoardPage").css({display: 'none'});
    $("#customerPage").css({display: 'none'});
    $("#placeOrderPage").css({display: 'none'});

    $("#header-navBar").css({display: 'block'});
    $("#itemPage").css({display: 'block'});
});

$("#navOrder").on('click', () => {
    $("#loginPage").css({display: 'none'});
    $("#dashBoardPage").css({display: 'none'});
    $("#customerPage").css({display: 'none'});
    $("#itemPage").css({display: 'none'});

    $("#header-navBar").css({display: 'block'});
    $("#placeOrderPage").css({display: 'block'});

});
