import useSWR, { KeyedMutator } from 'swr';

import { Scenario } from '@/types/scenario';
import { fetcher } from '@/utils/api';
import { to } from '@/utils/url';

type UseScenario = {
  scenario: Scenario;
  isLoading: boolean;
  isError: boolean;
  setScenario: KeyedMutator<any>;
};

const getScenario = fetcher('scenario');

export default function useScenario(id: string | number): UseScenario {
  const url = to.scenario(id);

  const params = {
    include: {
      campaign: true,
      location: true,
    },
  };

  const {
    data,
    error,
    mutate: setScenario,
  } = useSWR([url, params], getScenario);

  return {
    scenario: data,
    isLoading: !error && !data,
    isError: error,
    setScenario,
  };
}
