import { reactive, ref, onBeforeMount } from 'vue';
import { OpinionService } from '@/api/opinion';

export function useMessageList() {
  const loading = ref(false);
  const list = ref([]);
  async function request() {
    loading.value = true;
    const res = await OpinionService.searchTaskList().finally(() => {
      loading.value = false;
    });
    list.value = res;
  }
  onBeforeMount(request);
  return {
    loading,
    list,
    request,
  };
}
