export enum MixContentStatus {
  All = 'All',
  Deleted = 'Deleted',
  Preview = 'Preview',
  Published = 'Published',
  Draft = 'Draft',
  Schedule = 'Schedule',
}

export enum MixOrderBy {
  Priority = 'priority',
  CreatedDateTime = 'createdDateTime',
}

export const OrderDisplay: Record<MixOrderBy, string> = {
  createdDateTime: 'Created Date & Time',
  priority: 'Priority',
};
