import { useTranslation as serverSideTranslation } from "@app/i18n";
import {
  IconProps,
  LanguageProps,
  TranslationResponse,
} from "@app/[lng]/blog/[id]/index";
import icon, { IconType } from "@app/[lng]/components/icon";

/**
 * Retrieves translations for a specific language.
 *
 * @param {string} lng - The language code for the desired translations.
 * @return {Promise<TranslationResponse>} - A promise that resolves with an object containing the requested translations.
 */
async function getTranslations(lng: string): Promise<TranslationResponse> {
  const commonTranslation = await serverSideTranslation(lng, "common");
  const iconTranslation = await serverSideTranslation(lng, "icons");

  return { commonTranslation, iconTranslation };
}

/**
 * Retrieves the icon properties for a given icon translation and type.
 *
 * @param {LanguageProps} iconTranslation - The object containing translations for the icon
 * @param {IconType} iconType - The type of icon
 * @return {IconProps} - The icon properties
 */
function getIcon(
  iconTranslation: LanguageProps,
  iconType: IconType,
): IconProps {
  return {
    type: iconType,
    icon_text: iconTranslation.t(`${iconType}`),
    aria_role: "img",
  };
}

export { getTranslations, getIcon };
