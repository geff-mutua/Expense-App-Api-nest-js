import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "src/dtos/report.dto";
import { ReportType } from "src/data";

@Controller('report/:type') // You can define the prefix of the urls here
export class ReportController {

  constructor(
    private readonly reportService:ReportService
  ){}

  @Get() // Accepts the other segments of the url => Multiple Get requests can be ddefined on the same controller 
  getAllReports(@Param('type') type: string) : ReportResponseDto[] {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.reportService.getAllReports(reportType);
  }

  // Accepting Id parameters from Endpoint
  @Get(':id') // http://localhost:3000/report/income/hdaskhdkaskdksahdkhasd
  getReportById(
    @Param('type',new ParseEnumPipe(ReportType)) type:string,
    @Param('id',ParseUUIDPipe) id:string
  ):ReportResponseDto {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.reportService.getReportById(id,reportType);
  }

  @Post()
  createReport(
    @Body() body:CreateReportDto,
    @Param('type',new ParseEnumPipe(ReportType)) type:string
  ):ReportResponseDto {
    const reportType=type=="income"?ReportType.INCOME:ReportType.EXPENSE
    return this.reportService.createReport(body,reportType)
  }

  @Put(':id')
  updateReport(@Body() body:UpdateReportDto,@Param('id',ParseUUIDPipe) id:string,@Param('type',new ParseEnumPipe(ReportType)) type:string) :ReportResponseDto{
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(id,body,reportType);
  }

  @Delete(':id')
  deleteReport(@Param('type',new ParseEnumPipe(ReportType)) type:string,@Param('id',ParseUUIDPipe) id:string) {
    const reportType=type==="income" ?ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.deleteReport(id,reportType);

  }

}

// http://localhost:3000