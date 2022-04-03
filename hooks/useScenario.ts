import useSWR, { KeyedMutator } from 'swr';

import http from '@/lib/http';
import { Scenario } from '@/types/scenario';

type UseScenario = {
  scenario: Scenario;
  isLoading: boolean;
  isError: boolean;
  setScenario: KeyedMutator<any>;
};

export default function useScenario(id: string): UseScenario {
  const url = `/scenarios/${id}`;

  const {
    data,
    error,
    mutate: setScenario,
  } = useSWR(url, () =>
    http.get(url).then((res) => {
      return res.data.scenario;
    })
  );

  return {
    scenario: data,
    isLoading: !error && !data,
    isError: error,
    setScenario,
  };
}
