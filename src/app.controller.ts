import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { data,ReportType } from "./data";

import { v4 as uuid } from "uuid";

@Controller('report/:type') // You can define the prefix of the urls here
export class AppController {

  @Get() // Accepts the other segments of the url => Multiple Get requests can be ddefined on the same controller 
  getAllReports(@Param('type') type: string) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return data.report.filter((report)=>report.type===reportType);
  }

  // Accepting Id parameters from Endpoint
  @Get(':id') // http://localhost:3000/report/income/hdaskhdkaskdksahdkhasd
  getReportById(
    @Param('type') type:string,
    @Param('id') id:string
  ) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return data.report.filter((report)=>report.type===reportType).find((report)=>report.id===id);
  }

  @Post()
  createReport(
    @Body() body:{amount:number,source:string},
    @Param('type') type:string
  ) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    const report={
      id:uuid(),
      source:body.source,
      amount:body.amount,
      created_at:new Date(),
      updated_at:new Date(),
      type:reportType
    }
    data.report.push(report);
    return report;
  }

  @Put(':id')
  updateReport(@Body() body:{amount:number,source:string},@Param('id') id:string,@Param('type') type:string) {
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;

    // Find the report with the Id and the type
    const reportToUpdate= data.report.filter((report)=>report.type===reportType).find((report)=>report.id===id);

    if(!reportToUpdate) return;

    // find the report index
    const reportIndex=data.report.findIndex((report)=>report.id===reportToUpdate.id);

    data.report[reportIndex]={...data.report[reportIndex],...body};

    return data.report[reportIndex];

  }

  @Delete(':id')
  deleteReport(@Param('type') type:string,@Param('id') id:string) {
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;

    //ind the data to be deleted
    const reportToDelete= data.report.filter((report)=>report.type===reportType).find((report)=>report.id===id);

    //  if the report not found
    if(!reportToDelete) return "No report found with that Id";

     // find the report index
    const reportIndex=data.report.findIndex((report)=>report.id===reportToDelete.id);

    // Delete the report from the data
  data.report.splice(reportIndex,1);

  return "Report has been deleted Successfully"

  }


}

// http://localhost:3000