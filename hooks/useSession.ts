import useSWR from 'swr';

import http, { Routes } from '@/lib/http';

export default function useSession() {
  const { data: user, mutate: setUser } = useSWR(Routes.Sessions, () =>
    http.get(Routes.Sessions).then((res) => res.user)
  );

  return {
    isLoggedIn: !!user,
    setUser,
    user,
  };
}
