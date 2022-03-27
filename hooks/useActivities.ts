import qs from 'qs';
import useSWR, { KeyedMutator } from 'swr';

import http from '@/lib/http';
import { ActivityWithData } from '@/types/activity';

type UseActivities = {
  activities: ActivityWithData[];
  isLoading: boolean;
  isError: boolean;
  setActivities: KeyedMutator<any>;
};

type Params = {
  skip?: number;
  take?: number;
};

export default function useActivities(
  campaignId: string,
  params: Params = {}
): UseActivities {
  let url = `/activities?campaignId=${campaignId}`;
  const query = qs.stringify(params);

  if (query) {
    url += `?${query}`;
  }

  const {
    data,
    error,
    mutate: setActivities,
  } = useSWR(url, () => http.get(url).then((res) => res.data.activities));

  return {
    activities: data,
    isLoading: !error && !data,
    isError: error,
    setActivities,
  };
}
