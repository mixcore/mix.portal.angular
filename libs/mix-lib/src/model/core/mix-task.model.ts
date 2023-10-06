export interface MixTask {
  title: string;
  id: number;
  createdDateTime: Date;
  description?: string;
  taskStatus: 'New' | 'ReadyForTest' | 'InProgress' | 'Done';
  assignee: string;
}

export enum TaskType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug',
}

export enum TaskStatus {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

export const TaskStatusDisplay = {
  [TaskStatus.BACKLOG]: 'Backlog',
  [TaskStatus.SELECTED]: 'Selected for Development',
  [TaskStatus.IN_PROGRESS]: 'In progress',
  [TaskStatus.DONE]: 'Done',
};

export enum TaskPriority {
  LOWEST = 'Lowest',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  HIGHEST = 'Highest',
}

export const TaskPriorityColors = {
  [TaskPriority.HIGHEST]: '#CD1317',
  [TaskPriority.HIGH]: '#E9494A',
  [TaskPriority.MEDIUM]: '#E97F33',
  [TaskPriority.LOW]: '#2D8738',
  [TaskPriority.LOWEST]: '#57A55A',
};

export const TaskPriorityIcon = {
  [TaskPriority.HIGHEST]: 'arrow_upward',
  [TaskPriority.HIGH]: 'arrow_upward',
  [TaskPriority.MEDIUM]: 'arrow_upward',
  [TaskPriority.LOW]: 'arrow_downward',
  [TaskPriority.LOWEST]: 'arrow_downward',
};

export const TaskTypeIcons = {
  [TaskType.BUG]: 'assets/images/tasks/bug.svg',
  [TaskType.TASK]: 'assets/images/tasks/task.svg',
  [TaskType.STORY]: 'assets/images/tasks/story.svg',
};

export interface MixTaskNew {
  id: number;
  title: string;
  type: TaskType;
  taskStatus: TaskStatus;
  taskPriority: TaskPriority;
  listPosition: number;
  description?: string;
  estimate?: number;
  timeSpent?: number;
  timeRemaining?: number;
  createdDateTime: string;
  lastModified: string;
  reporter?: string;
  userIds: string[];
  projectId?: string;
  priority: number;
}
