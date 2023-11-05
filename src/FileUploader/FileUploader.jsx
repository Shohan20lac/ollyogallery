import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';

import st from './FileUploader.module.css';
import cssOverrides from './FileUploader.overrides.css?inline';

/*
  Note: File Uploader styles are scoped due to ShadowDOM usage.
  There are two ways to override them. One way is used on the line below,
  another one is to set a custom class to File Uploader,
  and use CSS variables to update styles.

  See more: https://uploadcare.com/docs/file-uploader/styling/
 */
LR.FileUploaderRegular.shadowStyles = cssOverrides;

LR.registerBlocks(LR);

export default function FileUploader({ files, uploaderClassName, onChange, theme }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const ctxProviderRef = useRef();

  const handleRemoveClick = useCallback(
    (uuid) => onChange(files.filter(f => f.uuid !== uuid)),
    [files, onChange],
  );

  useEffect(() => {
    const handleUploadEvent = (e) => {
      if (e.detail?.data) {
        setUploadedFiles([...e.detail.data]);
      }
    };

    /*
      Note: Event binding is the main way to get data and other info from File Uploader.
      There plenty of events you may use.

      See more: https://uploadcare.com/docs/file-uploader/data-and-events/#events
     */
    window.addEventListener('LR_DATA_OUTPUT', handleUploadEvent);

    return () => {
      window.removeEventListener('LR_DATA_OUTPUT', handleUploadEvent);
    };
  }, [setUploadedFiles]);

  useEffect(() => {
    /*
      Note: Here we use provider's API to reset File Uploader state.
      It's not necessary though. We use it here to show users
      a fresh version of File Uploader every time they open it.

      Another way is to sync File Uploader state with an external store.
      You can manipulate File Uploader using API calls like `addFileFromObject`, etc.

      See more: https://uploadcare.com/docs/file-uploader/api/
     */
    const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

    const handleDoneFlow = () => {
      resetUploaderState();

      onChange([...files, ...uploadedFiles]);
      setUploadedFiles([]);
    };

    window.addEventListener('LR_DONE_FLOW', handleDoneFlow);

    return () => {
      window.removeEventListener('LR_DONE_FLOW', handleDoneFlow);
    };
  }, [files, onChange, uploadedFiles, setUploadedFiles]);

  return (
    <div className={st.root}>
      {/*
         Note: `lr-config` is the main block we use to configure File Uploader.
         It's important to all the context-related blocks to have the same `ctx-name` attribute.

         See more: https://uploadcare.com/docs/file-uploader/configuration/
         Available options: https://uploadcare.com/docs/file-uploader/options/

         Also note: Some options currently are not available via `lr-config`,
         but may be set via CSS properties. E.g. `darkmode`.

         Here they are: https://github.com/uploadcare/blocks/blob/main/blocks/themes/lr-basic/config.css
      */}
      <lr-config
        ctx-name="my-uploader"
        pubkey="demopublickey"
        multiple={true}
        sourceList="local, url, camera, dropbox, gdrive"
        confirmUpload={false}
        removeCopyright={true}
        imgOnly={true}
      ></lr-config>

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={blocksStyles}
      ></lr-file-uploader-regular>

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />

      <div className={st.previews}>
        {files.map((file) => (
          <div key={file.uuid} className={st.preview}>
            <img
              className={st.previewImage}
              key={file.uuid}
              src={`${file.cdnUrl}/-/preview/-/resize/x200/`}
              width="100"
              alt={file.originalFilename || ''}
              title={file.originalFilename || ''}
            />

            <button
              className={st.previewRemoveButton}
              type="button"
              onClick={() => handleRemoveClick(file.uuid)}
            >×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
