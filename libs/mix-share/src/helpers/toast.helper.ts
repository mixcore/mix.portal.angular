import { HotToastService } from '@ngneat/hot-toast';

export function toastObserverProcessing(toast: HotToastService) {
  return toast.observe({
    loading: 'Processing',
    success: 'Success',
    error: 'Something error, please try again',
  });
}
