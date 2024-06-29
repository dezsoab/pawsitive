"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { locales } from "../../i18n";
import { useState } from "react";

export default function LanguagePicker() {
  const router = useRouter();
  const locale = useLocale();
  const [loc, setLoc] = useState(locale);

  const changeLanguage = (newLocale: string) => {
    const { pathname, search, hash } = window.location;
    const pathSegments = pathname.split("/");

    // The locale is assumed to be the second segment in the URL
    if (pathSegments[1]) {
      pathSegments[1] = newLocale;
    } else {
      // If there's no locale in the path, add the new locale
      pathSegments.splice(1, 0, newLocale);
    }

    const newPathname = pathSegments.join("/");
    const newUrl = `${newPathname}${search}${hash}`;

    router.push(newUrl);
  };

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    setLoc(newLocale);
    changeLanguage(newLocale);
  };

  return (
    <select name="Choose language" value={loc} onChange={handleLocaleChange}>
      {locales.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}
