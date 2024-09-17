/** Supported locales */
type Locale = "en" | "es";

/** CMS object from the server after locale extraction */
type CMS = Record<string | number, unknown>;

declare namespace NodeJS {
  interface ProcessEnv {
    /** Base url to use when fetching the API */
    NEXT_PUBLIC_BASE_URL: string;
    /** The default language to fetch data */
    NEXT_PUBLIC_DEFAULT_LOCALE: Locale;
    /** The default user SVg filename */
    NEXT_PUBLIC_USER_ICON: string;
    /** The header to be used to recover the local */
    NEXT_PUBLIC_HTTP_HEADER_ACCEPT_LANGUAGE: string;
  }
}
