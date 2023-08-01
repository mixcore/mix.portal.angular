export interface PortalHubModel {
  action: string;
  type: 'Success' | 'Error' | 'Info';
  title: string;
  message: string;
  createdDateTime: string;
}
