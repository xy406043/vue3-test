import http from '@/utils/http';

export class UserService {
  static async login(params: { phone: string; password: string }) {
    return http.post<any>(`/opinion/monitor/common/login`, params);
  }
}
