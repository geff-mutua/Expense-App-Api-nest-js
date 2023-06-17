import { Injectable } from "@nestjs/common";
import { ReportType, data } from "./data";
import {v4 as uuid} from "uuid"

@Injectable()
export class AppService{

  getAllReports(type:ReportType){
    return data.report.filter((report)=>report.type===type);
  }

  getReportById(id:string,type:ReportType){
    return data.report.filter((report)=>report.type===type).find((report)=>report.id===id);
  }

  createReport(body:{source:string,amount:number},type:ReportType){
    const report={
      id:uuid(),
      source:body.source,
      amount:body.amount,
      created_at:new Date(),
      updated_at:new Date(),
      type:type
    }
    data.report.push(report);
    return report;
  }

  updateReport(id:string,body:{source:string,amount:number},type:string){

    // Find the report with the Id and the type
    const reportToUpdate= data.report.filter((report)=>report.type===type).find((report)=>report.id===id);

    if(!reportToUpdate) return;

    // find the report index
    const reportIndex=data.report.findIndex((report)=>report.id===reportToUpdate.id);

    data.report[reportIndex]={...data.report[reportIndex],...body,updated_at:new Date()};

    return data.report[reportIndex];

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