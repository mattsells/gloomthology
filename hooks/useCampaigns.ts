import useSWR, { KeyedMutator } from 'swr';

import http from '@/lib/http';
import { CampaignWithRelations } from '@/types/campaign';

type UseCampaign = {
  campaigns: CampaignWithRelations[];
  isLoading: boolean;
  isError: boolean;
  setCampaigns: KeyedMutator<any>;
};

export default function useCampaigns(): UseCampaign {
  const url = '/campaigns';

  const {
    data,
    error,
    mutate: setCampaigns,
  } = useSWR(url, () => http.get(url).then((res) => res.data.campaigns));

  return {
    campaigns: data,
    isLoading: !error && !data,
    isError: error,
    setCampaigns,
  };
}
