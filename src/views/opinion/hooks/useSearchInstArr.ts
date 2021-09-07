import { ref, onMounted } from 'vue';
import { IInstArr, OpinionService } from '@/api/opinion';

/**
 * 获取医疗机构
 * @returns
 */
export default function useSearchInstArr(instId: string) {
  const choseInst = ref<string | null>(instId);
  let instArr = ref<IInstArr>([]);
  const loading = ref<boolean>(false);

  const request = () => {
    loading.value = true;
    OpinionService.instList()
      .then((arr) => {
        instArr.value = arr;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  onMounted(request);

  return {
    loading,
    instArr,
    request,
    choseInst,
  };
}
