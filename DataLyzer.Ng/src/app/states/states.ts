import { AuthState } from './auth/auth.state';
import { DatasetState } from './dataset/dataset.state';
import { ReportState } from './report/report.state';

export function getStates() {
  return [
    AuthState,
    DatasetState,
    ReportState
 ]
}
