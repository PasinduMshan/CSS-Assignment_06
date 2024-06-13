export default class ItemModel {

    constructor(itemId, itemName, itemUnitPrice, itemQTY) {
        this._itemId = itemId;
        this._itemName = itemName;
        this._itemUnitPrice = itemUnitPrice;
        this._itemQTY = itemQTY;
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

    set itemUnitPrice(itemUnitPrice) {
        this._itemUnitPrice = itemUnitPrice;
    }

    get itemUnitPrice() {
        return this._itemUnitPrice;
    }

    set itemQTY(itemQTY) {
        this._itemQTY = itemQTY;
    }

    get itemQTY() {
        return this._itemQTY;
    }

}
