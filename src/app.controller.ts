import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { data,ReportType } from "./data";

import { AppService } from "./app.service";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "./dtos/report.dto";

@Controller('report/:type') // You can define the prefix of the urls here
export class AppController {

  constructor(
    private readonly appService:AppService
  ){}

  @Get() // Accepts the other segments of the url => Multiple Get requests can be ddefined on the same controller 
  getAllReports(@Param('type') type: string) : ReportResponseDto[] {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.getAllReports(reportType);
  }

  // Accepting Id parameters from Endpoint
  @Get(':id') // http://localhost:3000/report/income/hdaskhdkaskdksahdkhasd
  getReportById(
    @Param('type',new ParseEnumPipe(ReportType)) type:string,
    @Param('id',ParseUUIDPipe) id:string
  ):ReportResponseDto {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.getReportById(id,reportType);
  }

  @Post()
  createReport(
    @Body() body:CreateReportDto,
    @Param('type',new ParseEnumPipe(ReportType)) type:string
  ):ReportResponseDto {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.appService.createReport(body,reportType)
  }

  @Put(':id')
  updateReport(@Body() body:UpdateReportDto,@Param('id',ParseUUIDPipe) id:string,@Param('type',new ParseEnumPipe(ReportType)) type:string) :ReportResponseDto{
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(id,body,reportType);
  }

  @Delete(':id')
  deleteReport(@Param('type',new ParseEnumPipe(ReportType)) type:string,@Param('id',ParseUUIDPipe) id:string) {
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.deleteReport(id,reportType);

  }

}

// http://localhost:3000