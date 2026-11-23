import { Injectable, NotFoundException, ConflictExeption } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLoanRequestDto } from "./dto/create-loan-request.dto";
import { LoanRequestEntity } from "./loan-request.entity";
import { ToolEntity } from "./tool.entity";

@Injectable()
export class LoanRequestsService {
  constructor(
    @InjectRepository(LoanRequestEntity) private readonly requests: Repository<LoanRequestEntity>,
    @InjectRepository(ToolEntity) private readonly tools: Repository<ToolEntity>,
  ) {}

  findAll(toolId?:number) {
    return this.requests.find({
      where: toolId ? { tool: { id: toolId }} : {},
      relations: { tool:true },
      order: { id: "ASC"},
    });
  }

  async findOne(id: number) {
    const request = await this.requests.findOne({ where: { id }, relations: { tool: true } });
    if (!request) throw new NotFoundException("Loan request not found.");
    return request;
  }

  async create(dto: CreateLoanRequestDto) {
    const tool = await this.tools.findOneBy({ id: dto.toolId });
    if (!tool) throw new NotFoundException("Tool not found.");

    if (dto.days > tool.maxLoanDays) {
      throw new ConflictExeption(`This tool can be borrowed for at most ${tool.maxLoanDays} days.`);
    }

    const request = this.requests.create({ purpose: dto.purpose, days: dto.days, tool });
    return this.requests.save(request);
  }
}

