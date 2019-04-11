export class CouponSysConfig{
    static apiUrl = "http://localhost:8080/CouponSystemDavidManto/rest/";

    static emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
    static positiveIntegerRegex = /^[1-9]+[0-9]*$/g;
    static positiveDoubleRegex = /^[1-9]+[0-9]*[.]?[1-9]+[0-9]*$/g;
}