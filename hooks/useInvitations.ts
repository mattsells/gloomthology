import useSWR, { KeyedMutator } from 'swr';

import http from '@/lib/http';
import { Invitation } from '@/types/invitation';

type UseInvitations = {
  invitations: Invitation[];
  isLoading: boolean;
  isError: boolean;
  setInvitations: KeyedMutator<any>;
};

export default function useInvitations(): UseInvitations {
  let url = '/invitations';

  const {
    data,
    error,
    mutate: setInvitations,
  } = useSWR(url, () => http.get(url).then((res) => res.data.invitations));

  return {
    invitations: data,
    isLoading: !error && !data,
    isError: error,
    setInvitations,
  };
}
