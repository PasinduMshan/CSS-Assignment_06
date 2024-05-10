export default class CustomerModel {

    constructor(cusId, cusName, cusAddress, cusContact, cusNIC) {
        this._cusId = cusId;
        this._cusName = cusName;
        this._cusAddress = cusAddress;
        this._cusContact = cusContact;
        this._cusNIC = cusNIC;
    }

    set cusId(cusId) {
        this._cusId = cusId;
    }

    get cusId() {
        return this._cusId;
    }

    set cusName(cusName) {
        this._cusName = cusName;
    }

    get cusName() {
        return this._cusName;
    }

    set cusAddress(cusAddress) {
        this._cusAddress = cusAddress;
    }

    get cusAddress() {
        return this._cusAddress;
    }

    set cusContact(cusContact) {
        this._cusContact = cusContact;
    }

    get cusContact() {
        return this._cusContact;
    }

    set cusNIC(cusNIC) {
        this._cusNIC = cusNIC;
    }

    get cusNIC() {
        return this._cusNIC;
    }
}