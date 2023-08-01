export interface MixTask {
  title: string;
  id: number;
  createdDateTime: Date;
  description?: string;
  taskStatus: 'New' | 'ReadyForTest' | 'InProgress' | 'Done';
  assignee: string;
}
