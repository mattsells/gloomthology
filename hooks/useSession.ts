import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import http, { Routes } from '@/lib/http';
import { Pages } from '@/lib/pages';

import { usePrevious } from './usePrevious';

export default function useSession() {
  const router = useRouter();

  const { data: user, mutate: setUser } = useSWR(Routes.Sessions, () =>
    http.get(Routes.Sessions).then((res) => res.user)
  );

  const prevUser = usePrevious(user);

  useEffect(() => {
    if (user && !prevUser) {
      router.push(Pages.Campaigns);
    } else if (!user && prevUser) {
      router.push(Pages.Login);
    }
  }, [user, prevUser, router]);

  return {
    isLoggedIn: !!user,
    setUser,
    user,
  };
}
