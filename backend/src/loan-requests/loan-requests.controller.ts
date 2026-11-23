import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { requestValidationPipe } from "../common/request-validation.pipe";
import { CreateLoanRequestDto } from "./dto/create-loan-request.dto";
import { ListLoanRequestsDto } from "./dto/list-loan-requests.dto";   
import { LoanRequestsService } from "./loan-requests.service";

@UseGuards(AuthGuard("jwt"))
@Controller("loan-requests")
export class LoanRequestsController {
  constructor(private readonly service: LoanRequestsService) {}

  @Get()
  findAll(@Query(requestValidationPipe)query:ListLoanRequestsDto) {
    return this.service.findAll(query.toolId);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body(requestValidationPipe) dto: CreateLoanRequestDto) {
    return this.service.create(dto);
  }
}

