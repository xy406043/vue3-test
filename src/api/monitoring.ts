import { HeatLevelType } from '../types/monitoring';
import http from '@/utils/http';

export class MonitoringService {
  /**
   * 机构分析报告
   * @param instId 机构id
   * @returns
   */
  static async instAnalysisReport(instId: string) {
    return http.get<any>(`/opinion/monitor/inst/instAnalysisReport`, {
      params: {
        instId,
      },
    });
  }

  static async instOverview(params: { days: number; heatType: HeatLevelType }) {
    return http.post('/opinion/monitor/inst/instOverview', params);
  }
}
