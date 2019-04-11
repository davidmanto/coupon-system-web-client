export class NotificationQuery {
    private variables = []
    private resultData = []

    constructor(private title: String) { }

    addQuery(variable: String, message: String, options?: { type?: String, oldValue?: any, minDate?: Date, maxDate?: Date }) {
        if(!options){
            options = {};
        }
        if (!options.type) {
            options.type = "text";
        }
        this.variables.push({
            "message": message,
            "var": variable,
            "type": options.type,
            "oldValue": options.oldValue,
            "minDate" : options.minDate,
            "maxDate" : options.maxDate
        })
    }

    getResultData() {
        for (let i = 0; i < this.variables.length; i++) {
            if(!this.resultData[this.variables[i].var] && this.variables[i].oldValue){
                this.resultData[this.variables[i].var] = this.variables[i].oldValue;
            }
        }
        return this.resultData;
    }
}