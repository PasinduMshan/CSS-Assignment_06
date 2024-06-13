export default class PlaceOrderModel {

    constructor(orderId, customerId, date, itemId, itemName, price, qty, orderTotal) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._date = date;
        this._itemId = itemId;
        this._itemName = itemName;
        this._price = price;
        this._qty = qty;
        this._orderTotal = orderTotal;
    }

    set orderId(orderId) {
        this._orderId = orderId;
    }

    get orderId() {
        return this._orderId;
    }

    set customerId(customerId) {
        this._customerId = customerId;
    }

    get customerId() {
        return this._customerId;
    }

    set date(date) {
        this._date = date;
    }

    get date() {
        return this._date;
    }

    set itemId(itemId) {
        this._itemId = itemId;
    }

    get itemId() {
        return this._itemId;
    }

    set itemName(itemName) {
        this._itemName = itemName;
    }

    get itemName() {
        return this._itemName;
    }

    set price(price) {
        this._price = price;
    }

    get price() {
        return this._price;
    }

    set qty(qty) {
        this._qty = qty;
    }

    get qty() {
        return this._qty;
    }

    set orderTotal(total) {
        this._orderTotal = total;
    }

    get orderTotal() {
        return this._orderTotal;
    }
}

