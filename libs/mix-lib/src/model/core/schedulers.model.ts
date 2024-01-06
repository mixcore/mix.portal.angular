export interface MixScheduler {
  cronExpression: string;
  name: string;
  groupName: string;
  jobName: string;
  description: string;
  startAt: any;
  isStartNow: boolean;
  interval: any;
  intervalType: string;
  repeatCount: number;
}
