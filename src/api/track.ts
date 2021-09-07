import { HeatLevelType } from '../types/monitoring';
import http from '@/utils/http';

export enum TrackType {
  Part = 1,
  Project,
}
export class TrackingService {
  /**
   * 线索-关键词
   * @param type 1-部位 2-项目
   * @returns
   */
  static async keywords(type: TrackType) {
    return http.get<any>(`/opinion/monitor/clue/list`, {
      params: {
        type,
      },
    });
  }

  static async noteList(params: any) {
    return http.post('/opinion/monitor/clue/contentList', params);
  }
}
