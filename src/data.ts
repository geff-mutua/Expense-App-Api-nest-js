
export enum ReportType{
    INCOME="income",
    EXPENSE="expense"
}

export const data:Data={
    report: [
        {
            id:"uuid1",
            source:"Salary",
            amount:7500,
            created_at:new Date(),
            updated_at:new Date(),
            type:ReportType.EXPENSE
        },
        {
            id:"uuid2",
            source:"Qxp",
            amount:250,
            created_at:new Date(),
            updated_at:new Date(),
            type:ReportType.INCOME
        },
        {
            id:"uuid3",
            source:"Youtube",
            amount:100,
            created_at:new Date(),
            updated_at:new Date(),
            type:ReportType.EXPENSE
        },
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

