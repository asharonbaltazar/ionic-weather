import { FunctionsResponse } from '@functions/types';

export const hasError = <T>(
  data: FunctionsResponse<T>
): data is { error: string } => 'error' in data;
