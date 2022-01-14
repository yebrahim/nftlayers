import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { Strings } from '../strings';
import { colors, spacing } from '../theme';

const DropArea = styled.div<{ dragging: boolean }>`
  border: 1px dashed ${colors.LIGHT_GRAY};
  cursor: pointer;
  flex: 1;
  min-height: ${spacing.$25};
`;

const Prompt = styled.div`
  margin: ${spacing.$4};
  text-align: center;
`;

export interface FileSelectorProps {
  onDrop: (files: File[]) => void;
}

export const FileSelector: React.FC<FileSelectorProps> = ({ onDrop, children }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropArea {...getRootProps()}>
      <input {...getInputProps()} />
      <Prompt>{isDragActive ? Strings.drop_zone_prompt_dragging : Strings.drop_zone_prompt}</Prompt>
      {children}
    </DropArea>
  );
};
