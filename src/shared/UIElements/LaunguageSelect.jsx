
import Select from "react-dropdown-select"
import renderIcons from "../functions/renderIcons";

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Français', value: 'fr' },
  { label: 'Español', value: 'es' },
  { label: 'Deutsch', value: 'de' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'Português', value: 'pt' },
  { label: '中文 (简体)', value: 'zh' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
  { label: 'Русский', value: 'ru' },
  { label: 'Italiano', value: 'it' },
  { label: 'Nederlands', value: 'nl' },
  { label: 'Türkçe', value: 'tr' },
  { label: 'Polski', value: 'pl' },
  { label: 'Українська', value: 'uk' },
  { label: 'עברית', value: 'he' },
  { label: 'العربية', value: 'ar' },
  { label: 'ไทย', value: 'th' },
  { label: 'Tiếng Việt', value: 'vi' },
  { label: 'বাংলা', value: 'bn' },
  { label: 'தமிழ்', value: 'ta' },
  { label: 'తెలుగు', value: 'te' },
  { label: 'മലയാളം', value: 'ml' },
  { label: 'සිංහල', value: 'si' },
  { label: 'ქართული', value: 'ka' },
  { label: 'Čeština', value: 'cs' },
  { label: 'Română', value: 'ro' },
  { label: 'Svenska', value: 'sv' },
  { label: 'Suomi', value: 'fi' },
  { label: 'Norsk', value: 'no' },
  { label: 'Dansk', value: 'da' },
  { label: 'Slovenčina', value: 'sk' },
  { label: 'Ελληνικά', value: 'el' },
  { label: 'Bahasa Indonesia', value: 'id' },
  { label: 'Filipino', value: 'tl' },
];

export default function LanguageSelector({ currentLang, onChange }) {

  const handleChange = (selected) => {
    if (selected.length > 0) {
      // i18n.changeLanguage(selected[0].value);
      onChange(selected[0].value)
      localStorage.setItem('lan', selected[0].value)
    }
  };

  return (
    <div className="w-fit">
      <Select
        options={languageOptions}
        values={languageOptions.filter((opt) => opt.value === currentLang.value)}
        onChange={handleChange}
        labelField="label"
        valueField="value"
        color="#3b82f6"
        dropdownPosition="auto"
        arrowRenderer={() => null}
        placeholder="Select language"
        className="!w-fit !rounded-full"
        contentRenderer={() => (
          <div className="flex items-center gap-2">
            {renderIcons('IoGlobe')}
            <span className="!text-xs uppercase">
              {currentLang}
            </span>
          </div>
        )}
      />
    </div>
  )
}
