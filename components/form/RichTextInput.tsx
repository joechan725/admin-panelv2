'use client';

import { Control, Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import '@blocknote/core/fonts/inter.css';
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { addImage } from '@/firebase/api/image/addImage';
import { BlockNoteEditor, filterSuggestionItems, PartialBlock } from '@blocknote/core';
import ErrorTranslation from './ErrorTranslation';
import clsx from 'clsx/lite';
import LoadingShimmer from '../loading/LoadingShimmer';

export interface RichTextInputProps<T extends FieldValues, TKey extends Path<T>> {
  disabled: boolean;
  title?: string;
  description?: string;
  control: Control<T>;
  registerName: TKey;
  noAudio?: boolean;
  noTable?: boolean;
  noVideo?: boolean;
  noFile?: boolean;
  noImage?: boolean;
  noLoadingShimmer?: boolean;
  noTextAlgin?: boolean;
  noNested?: boolean;
  noCode?: boolean;
  noCheckList?: boolean;
  filePath: string;
  initialContent?: PartialBlock[];
}

const RichTextInput = <T extends FieldValues, TKey extends Path<T>>({
  disabled,
  title,
  description,
  control,
  registerName,
  noAudio = true,
  noFile = true,
  noImage = true,
  noTable = true,
  noVideo = true,
  noTextAlgin = true,
  noNested = true,
  noCode = true,
  noCheckList = true,
  noLoadingShimmer = false,
  filePath,
  initialContent,
}: RichTextInputProps<T, TKey> & (T[TKey] extends string ? { registerName: TKey } : never)) => {
  const getCustomSlashMenuItems = (editor: BlockNoteEditor): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor).filter(
      (item) =>
        (noAudio ? item.title !== 'Audio' : true) &&
        (noTable ? item.title !== 'Table' : true) &&
        (noVideo ? item.title !== 'Video' : true) &&
        (noFile ? item.title !== 'File' : true) &&
        (noImage ? item.title !== 'Image' : true) &&
        (noCheckList ? item.title !== 'Check List' : true)
    ),
  ];

  const editor = useCreateBlockNote({
    initialContent,
    uploadFile: async (file) => {
      const { imageURL } = await addImage(filePath, file);
      return imageURL;
    },
  });

  const handleChange = async (field: ControllerRenderProps<T, TKey>) => {
    if (disabled) {
      return;
    }
    const markdown = await editor.blocksToMarkdownLossy();
    if (markdown === '') {
      field.onChange('');
    }
    if (markdown !== '') {
      const html = await editor.blocksToHTMLLossy();
      field.onChange(html);
    }
  };

  return (
    <Controller
      name={registerName}
      control={control}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          {title !== undefined && <div className="text-sm text-primary-text font-semibold block mb-2">{title}</div>}
          <div
            className={clsx(
              'relative max-w-full w-full min-h-96 py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1',
              error ? 'border-danger' : 'border-gray-300'
            )}
          >
            {disabled && !noLoadingShimmer && <LoadingShimmer gradient="stone" roundedClassName="rounded-md" />}
            <BlockNoteView
              editor={editor}
              editable={!disabled}
              theme="light"
              onChange={() => handleChange(field)}
              slashMenu={false}
              formattingToolbar={false}
            >
              <SuggestionMenuController
                triggerCharacter={'/'}
                getItems={async (query) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)}
              />
              <FormattingToolbarController
                formattingToolbar={() => (
                  <FormattingToolbar>
                    <BlockTypeSelect key="blockTypeSelect" />

                    <FileCaptionButton key="fileCaptionButton" />
                    <FileReplaceButton key="replaceFileButton" />

                    <BasicTextStyleButton basicTextStyle="bold" key="boldStyleButton" />
                    <BasicTextStyleButton basicTextStyle="italic" key="italicStyleButton" />
                    <BasicTextStyleButton basicTextStyle="underline" key="underlineStyleButton" />
                    <BasicTextStyleButton basicTextStyle="strike" key="strikeStyleButton" />
                    {!noCode && <BasicTextStyleButton key="codeStyleButton" basicTextStyle="code" />}

                    {!noTextAlgin && (
                      <>
                        <TextAlignButton textAlignment="left" key="textAlignLeftButton" />
                        <TextAlignButton textAlignment="center" key="textAlignCenterButton" />
                        <TextAlignButton textAlignment="right" key="textAlignRightButton" />
                      </>
                    )}

                    <ColorStyleButton key="colorStyleButton" />

                    {!noNested && (
                      <>
                        <NestBlockButton key="nestBlockButton" />
                        <UnnestBlockButton key="unnestBlockButton" />
                      </>
                    )}

                    <CreateLinkButton key="createLinkButton" />
                  </FormattingToolbar>
                )}
              />
            </BlockNoteView>
          </div>
          {description && <div className="mb-2 text-xs mt-1 font-medium text-tertiary-text">{description}</div>}
          <ErrorTranslation error={error?.message} />
        </div>
      )}
    />
  );
};

export default RichTextInput;
