export function urlSearchParams(url: string | undefined): URLSearchParams {
  if (!url) {
    throw new TypeError('URL is not defined');
  }

  return new URL(url).searchParams;
}

export function paginate(url: string | undefined) {
  const params = urlSearchParams(url);

  const skip = Number(params.get('skip') || 0);
  const take = Number(params.get('take') || 20);

  return { skip, take };
}
