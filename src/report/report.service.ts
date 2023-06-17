import { Injectable } from "@nestjs/common";
import { ReportType, data } from "src/data";
import { ReportResponseDto } from "src/dtos/report.dto";
import {v4 as uuid} from "uuid"


interface Report{
  amount:number,
  source:string
}

interface UpdateReport{
  amount?:number,
  source?:string
}

@Injectable()
export class ReportService{

  getAllReports(type:ReportType):ReportResponseDto[]{
    return data.report.filter((report)=>report.type===type).map((report)=>new ReportResponseDto(report));
  }

  getReportById(id:string,type:ReportType):ReportResponseDto{
    const report = data.report.filter((report)=>report.type===type).find((report)=>report.id===id);

    return new ReportResponseDto(report);
  }

  createReport(body:Report,type:ReportType):ReportResponseDto{
    const report={
      id:uuid(),
      source:body.source,
      amount:body.amount,
      created_at:new Date(),
      updated_at:new Date(),
      type:type
    }
    data.report.push(report);
    return new ReportResponseDto(report);
  }

  updateReport(id:string,body:UpdateReport,type:string):ReportResponseDto{

    // Find the report with the Id and the type
    const reportToUpdate= data.report.filter((report)=>report.type===type).find((report)=>report.id===id);

    if(!reportToUpdate) return;

    // find the report index
    const reportIndex=data.report.findIndex((report)=>report.id===reportToUpdate.id);

    data.report[reportIndex]={...data.report[reportIndex],...body,updated_at:new Date()};

    return new ReportResponseDto(data.report[reportIndex]);

  }

  deleteReport(id:string,type:ReportType){
    //ind the data to be deleted
    const reportToDelete= data.report.filter((report)=>report.type===type).find((report)=>report.id===id);

    //  if the report not found
    if(!reportToDelete) return "No report found with that Id";

     // find the report index
    const reportIndex=data.report.findIndex((report)=>report.id===reportToDelete.id);

    // Delete the report from the data
    data.report.splice(reportIndex,1);

  }

}