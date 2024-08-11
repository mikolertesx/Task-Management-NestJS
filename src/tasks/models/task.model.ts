import TaskStatus from './taskStatus.model';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export default Task;
