import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() data: TaskDTO) {
    return this.taskService.create(data);
  }

  @Get()
  async findAllTasks() {
    return this.taskService.findAllTasks();
  }

  @Get(':id')
  async findTaskById(@Param() id: string) {
    return this.taskService.findTaskById(id);
  }
  
  @Patch(':id')
  async updateTaskById(@Param() id: string, @Body() data: TaskDTO) {
    return this.taskService.updateTaskById(id, data);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteTaskById(@Param() id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
