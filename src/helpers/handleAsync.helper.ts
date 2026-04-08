import { useQuasar } from 'quasar';

export function useHandleAsync() {
  const $q = useQuasar();

  async function handle<T>(
    fn: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> {
    try {
      const result = await fn();

      if (successMessage) {
        $q.notify({
          type: 'positive',
          message: successMessage,
        });
      }

      return result;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      $q.notify({
        type: 'negative',
        message: err.message || 'Erro inesperado',
      });

      return null;
    }
  }

  return { handle };
}