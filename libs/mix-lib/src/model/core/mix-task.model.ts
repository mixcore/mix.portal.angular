export enum TaskStatus {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
}

export const TaskStatusDisplay = {
  [TaskStatus.BACKLOG]: 'Backlog',
  [TaskStatus.SELECTED]: 'Ready for Dev',
  [TaskStatus.IN_PROGRESS]: 'In progress',
  [TaskStatus.DONE]: 'Done',
};

export const TaskStatusColors = {
  [TaskStatus.BACKLOG]: 'rgb(112, 114, 143)',
  [TaskStatus.SELECTED]: 'rgb(228, 64, 87)',
  [TaskStatus.IN_PROGRESS]: 'rgb(228, 124, 64)',
  [TaskStatus.DONE]: 'rgb(168, 228, 64)',
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

export enum TaskType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug',
  SWIMLANE = 'Swimlane',
}

export const TaskTypeIcons = {
  [TaskType.BUG]: 'assets/images/tasks/bug.svg',
  [TaskType.TASK]: 'assets/images/tasks/task.svg',
  [TaskType.STORY]: 'assets/images/tasks/story.svg',
  [TaskType.SWIMLANE]: 'assets/images/tasks/story.svg',
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
  parentTaskId?: number;
}
