import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber ,IsOptional,IsPositive, IsString} from "class-validator";
import { ReportType } from "src/data";

export class CreateReportDto{
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsString()
    @IsNotEmpty()
    source:string;
}

export class UpdateReportDto{
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount:number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source:string
}

// This is used to determine the reponse that the user will get at the end once the data has been proce🏅 

export class ReportResponseDto{
    constructor(partial:Partial<ReportResponseDto>){
        Object.assign(this,partial);
    }
    amount:number;
    source:string;
    type:ReportType;

    @Exclude()
    created_at:Date;

    @Exclude()
    updated_at:Date;

    // Transform the object to something different
    @Expose({name:"createdAt"})
    transformCreatedAt(){
        return this.created_at;
    }

}