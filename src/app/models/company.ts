export class Company {
	public id: number = 0;
	public name: string = "";
	public password: string = "";
	public email: string = "";

	constructor(obj?) {
		if (obj) {
			Object.keys(obj).forEach((key) => {
				if (key in this) {
					this[key] = obj[key];
				}
			});
		}
	}
}
