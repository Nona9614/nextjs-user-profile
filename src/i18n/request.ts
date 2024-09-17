import { getRequestConfig } from "next-intl/server";
import { headers as _headers, cookies as _cookies } from "next/headers";

const HTTP_HEADER_ACCEPT_LANGUAGE =
  process.env.NEXT_PUBLIC_HTTP_HEADER_ACCEPT_LANGUAGE;
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

const resolve = async (locale: string) => {
  return {
    locale,
    messages: (await import(`../../public/messages/${locale}.json`)).default,
  };
};

export default getRequestConfig(async () => {
  const cookies = _cookies();
  const cookie = cookies.get(HTTP_HEADER_ACCEPT_LANGUAGE);

  if (cookie) {
    return await resolve(cookie.value);
  }

  const headers = _headers();
  const header = headers.get(HTTP_HEADER_ACCEPT_LANGUAGE);

  if (header) {
    const locale =
      header === "*"
        ? DEFAULT_LOCALE
        : header.substring(0, header.indexOf("-"));
    return await resolve(locale);
  }

  return await resolve(DEFAULT_LOCALE);
});
