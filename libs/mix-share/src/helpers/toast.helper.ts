import { HotToastService } from '@ngneat/hot-toast';

export function toastObserverProcessing(toast: HotToastService) {
  return toast.observe({
    loading: 'Processing',
    success: 'Successfully applied change',
    error: 'Something error, please try again',
  });
}
