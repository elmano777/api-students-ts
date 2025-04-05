import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async findAll() {
    return this.studentsService.getAll();
  }

  @Post()
  async create(@Body() createStudent: CreateStudentDto) {
    const id = await this.studentsService.create(createStudent);
    return { message: `Student with id: ${id} created successfully` };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const student = await this.studentsService.getOne(id);
    if (!student) {
      return { message: 'Student not found' };
    }
    return student;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateStudentDto) {
    await this.studentsService.update(id, updateDto);
    return { id, ...updateDto };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.studentsService.delete(id);
    return { message: `Student with id: ${id} deleted.` };
  }
}
