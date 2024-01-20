import React from "react";
import styles from "./attachments.module.scss";
import Icon from "@app/[lng]/components/icon";
import Link from "next/link";
import {
  AttachmentData,
  AttachmentsAttributes,
} from "@app/[lng]/blog/[id]/index";
import { getIcon, getTranslations } from "@app/[lng]/blog/[id]/blog.utilities";

/**
 * Render a list of attachments with their names and URLs.
 *
 * @param {object} options - The options for rendering the attachments list.
 * @param {string} options.lng - The language code used for translation.
 * @param {AttachmentData[]} options.attachments - An array of attachment data.
 * @returns {React.JSX.Element} The rendered attachments list.
 */
async function AttachmentsList({
  lng,
  attachments,
}: Readonly<{
  lng: string;
  attachments: AttachmentData[];
}>): Promise<React.JSX.Element> {
  const { commonTranslation, iconTranslation } = await getTranslations(lng);

  return (
    <>
      <h2>{commonTranslation.t("attachments-headline")}</h2>
      {attachments?.map((attachment: AttachmentData, index: number) => {
        const attachmentData: AttachmentsAttributes = attachment.attributes;
        return (
          <Link
            key={`attachment-${index}`}
            href={attachmentData.url}
            target={"_blank"}
            className={styles.attachments_wrapper}
          >
            <Icon params={getIcon(iconTranslation, "save")} />
            <div className={styles.attachments_list_item}>
              {attachmentData.name}
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default AttachmentsList;
