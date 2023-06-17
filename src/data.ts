
export enum ReportType{
    INCOME="income",
    EXPENSE="expense"
}

export const data:Data={
    report: [
        
    ]
}

// Interface is used to define the data type
interface Data {
    report:{
        id:string;
        source:string;
        amount:number;
        created_at:Date;
        updated_at:Date;
        type:ReportType
    }[]
}

