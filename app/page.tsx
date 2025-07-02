'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import styled, { StyleSheetManager } from 'styled-components';
// import isPropValid from '@emotion/is-prop-valid';



const FilerobotImageEditor = dynamic(
  () => import('react-filerobot-image-editor'),
  { ssr: false }
);

export default function FilerobotImageEditorPage() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>();

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        openImgEditor();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='h-screen flex flex-col gap-2'>

      <button onClick={openImgEditor}>Open Filerobot image editor</button>
      {
        !isImgEditorShown ?
          <>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {
              image &&
              <img src={image} className='h-80 w-80 object-center object-contain' />
            }
          </>
          :

          imageSrc &&
          (
            // <StyleSheetManager shouldForwardProp={propName => isPropValid(propName)}>
            //   <SafeWrapper
            //   $showTabsDrawer
            //   $isPhoneScreen
            //   $noMargin
            //   $active
            // > 
            <FilerobotImageEditor
              source={imageSrc}
              onSave={(editedImageObject) => setImage(editedImageObject.imageBase64)}
              onClose={closeImgEditor}
              annotationsCommon={{
                fill: '#000000',
              }}
              avoidChangesNotSavedAlertOnLeave={true}
              Text={{ text: 'KUMBA...' }}
              Rotate={{ angle: 90, componentType: 'slider' }}
              Crop={{
                presetsItems: [
                  {
                    titleKey: 'classicTv',
                    descriptionKey: '4:3',
                    ratio: 4 / 3,
                    // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                  },
                  {
                    titleKey: 'cinemascope',
                    descriptionKey: '21:9',
                    ratio: 21 / 9,
                    // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                  },
                ],
                presetsFolders: [
                  {
                    titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key

                    // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                    groups: [
                      {
                        titleKey: 'facebook',
                        items: [
                          {
                            titleKey: 'profile',
                            width: 180,
                            height: 180,
                            descriptionKey: 'fbProfileSize',
                          },
                          {
                            titleKey: 'coverPhoto',
                            width: 820,
                            height: 312,
                            descriptionKey: 'fbCoverPhotoSize',
                          },
                        ],
                      },
                    ],
                  },
                ],
              }}
              tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]} // or {['Adjust', 'Annotate', 'Watermark']}
              defaultTabId={TABS.ANNOTATE} // or 'Annotate'
              defaultToolId={TOOLS.TEXT} // or 'Text'
              savingPixelRatio={4}
              previewPixelRatio={window.devicePixelRatio}
              disableSaveIfNoChanges={true} />
            // </SafeWrapper>
            // </StyleSheetManager>
          )}
    </div>

  );
}

// const SafeWrapper = styled.div<{
//   $showTabsDrawer?: boolean;
//   $isPhoneScreen?: boolean;
//   $noMargin?: boolean;
//   $active?: boolean;
// }>`
//   margin: ${({ $noMargin }) => ($noMargin ? '0' : '1rem')};
//   display: ${({ $showTabsDrawer }) => ($showTabsDrawer ? 'block' : 'none')};
//   /* add other styles using transient props */
// `;

export const TABS = {
  FINETUNE: 'Finetune',
  FILTERS: 'Filters',
  ADJUST: 'Adjust',
  WATERMARK: 'Watermark',
  ANNOTATE: 'Annotate',
  RESIZE: 'Resize',
} as const;

export const TOOLS = {
  CROP: 'Crop',
  ROTATE: 'Rotate',
  FLIP_X: 'Flip_X',
  FLIP_Y: 'Flip_Y',
  BRIGHTNESS: 'Brightness',
  CONTRAST: 'Contrast',
  HSV: 'HueSaturationValue',
  WARMTH: 'Warmth',
  BLUR: 'Blur',
  THRESHOLD: 'Threshold',
  POSTERIZE: 'Posterize',
  PIXELATE: 'Pixelate',
  NOISE: 'Noise',
  FILTERS: 'Filters',
  RECT: 'Rect',
  ELLIPSE: 'Ellipse',
  POLYGON: 'Polygon',
  TEXT: 'Text',
  LINE: 'Line',
  IMAGE: 'Image',
  ARROW: 'Arrow',
  WATERMARK: 'Watermark',
  PEN: 'Pen',
  RESIZE: 'Resize',
} as const;
