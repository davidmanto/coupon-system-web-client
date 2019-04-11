import { CouponType } from "./enums/couponType";

export class Coupon {
	public id: number = 0;
	public companyId: number = 0;
	public title: string = "";
	public startDate: number = 0;
	public endDate: number = 0;
	public amount: number = 0;
	public type: CouponType = null;
	public message: string = "";
	public price: number = 0;
	public image: string = "";

	constructor(obj?) {
		if(obj){
			Object.keys(obj).forEach((key) => {
				if (key in this) {
					this[key] = obj[key];
				}
			});
		}
	}
}
