import http from '@/utils/http';

export type IInstArr = { id: string; name: string }[];
export class OpinionService {
  static async instList() {
    return http.get('/opinion/monitor/inst/list');
  }

  /**
   * 机构分析报告
   * @param taskId 任务id
   * @returns
   */
  static async searchAnalysisReport(taskId: string) {
    return http.get<any>(`/opinion/monitor/inst/searchAnalysisReport`, {
      params: {
        taskId,
      },
    });
  }

  /**
   * 新增搜索任务
   * @param params
   * @returns
   */
  static async addTask(params: { instId: string; keyword: string; days: number }) {
    return http.post('/opinion/monitor/inst/addSearchTask', params);
  }

  /**
   * 获取搜索任务的列表
   * @returns
   */
  static async searchTaskList() {
    return http.get('/opinion/monitor/inst/searchTaskList');
  }

  /**
   * 未读消息
   * @returns
   */
  static async unViewNum() {
    return http.post('/opinion/monitor/inst/unViewNum', undefined, { hiddenErrMsg: true });
  }
}
