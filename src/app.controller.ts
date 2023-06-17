import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { data,ReportType } from "./data";

import { v4 as uuid } from "uuid";
import { AppService } from "./app.service";

@Controller('report/:type') // You can define the prefix of the urls here
export class AppController {

  constructor(
    private readonly appService:AppService
  ){}

  @Get() // Accepts the other segments of the url => Multiple Get requests can be ddefined on the same controller 
  getAllReports(@Param('type') type: string) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.getAllReports(reportType);
  }

  // Accepting Id parameters from Endpoint
  @Get(':id') // http://localhost:3000/report/income/hdaskhdkaskdksahdkhasd
  getReportById(
    @Param('type') type:string,
    @Param('id') id:string
  ) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.getReportById(id,reportType);
  }

  @Post()
  createReport(
    @Body() body:{amount:number,source:string},
    @Param('type') type:string
  ) {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.createReport(body,reportType)
  }

  @Put(':id')
  updateReport(@Body() body:{amount:number,source:string},@Param('id') id:string,@Param('type') type:string) {
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(id,body,reportType);
  }

  @Delete(':id')
  deleteReport(@Param('type') type:string,@Param('id') id:string) {
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.deleteReport(id,reportType);

  }

}

// http://localhost:3000