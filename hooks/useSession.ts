import useSWR from 'swr';

import http, { Routes } from '@/lib/http';

export default function useSession() {
  const { data: user, mutate: mutateUser } = useSWR(Routes.Sessions, () =>
    http.get(Routes.Sessions)
  );

  return {
    user,
    mutateUser,
  };
}
