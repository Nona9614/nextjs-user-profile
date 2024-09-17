"use client";

// Next JS
import { useRouter } from "next/navigation";
// Styles
import { ChangeEventHandler } from "react";
import styles from "./LanguagePicker.module.css";
// Utils
import unfold from "@/utils/unfold";

type Locales = { country: string; language: string };

type LangaugePickerOptionProps = {
  locale: Locale;
  text: string;
};
function LangaugePickerOption({ locale, text }: LangaugePickerOptionProps) {
  return <option value={locale}>{text}</option>;
}

export type LangaugePickerProps = {
  locales: Record<Locale, Locales>;
  locale: Locale;
};
export default function LangaugePicker({
  locales,
  locale,
}: LangaugePickerProps) {
  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    const name = process.env.NEXT_PUBLIC_HTTP_HEADER_ACCEPT_LANGUAGE;
    const value = ev.target.value;
    document.cookie = name + "=" + value;
    router.refresh();
  };

  return (
    <select
      className={styles["langauge-picker"]}
      name="language"
      id="language-support"
      onChange={onChange}
      value={locale}
    >
      {unfold(locales).map(([locale, { country, language }], index) => (
        <LangaugePickerOption
          key={index}
          locale={locale}
          text={`${language} (${country})`}
        />
      ))}
    </select>
  );
}
