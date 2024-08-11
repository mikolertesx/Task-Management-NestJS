import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import Task from './models/task.model';
import TaskStatus from './models/taskStatus.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    let tasks = this.getAllTasks();
    const { search, status } = filterDto;

    if (search) {
      const fixedSearch = search.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(fixedSearch) ||
          task.description
            .toLocaleLowerCase()
            .includes(fixedSearch.toLowerCase()),
      );
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return found;
  }

  deleteTaskById(id: string): void {
    const oldLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);

    if (this.tasks.length === oldLength) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
