import useSWR, { KeyedMutator } from 'swr';

import http from '@/lib/http';
import { CampaignWithRelations } from '@/types/campaign';

type UseCampaign = {
  campaign: CampaignWithRelations;
  isLoading: boolean;
  isError: boolean;
  setCampaign: KeyedMutator<any>;
};

export default function useCampaign(id: string): UseCampaign {
  const url = `/campaigns/${id}`;

  const {
    data,
    error,
    mutate: setCampaign,
  } = useSWR(url, () => http.get(url).then((res) => res.data.campaign));

  return {
    campaign: data,
    isLoading: !error && !data,
    isError: error,
    setCampaign,
  };
}
