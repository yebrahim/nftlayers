import React, { useCallback } from 'react';
import ReactDom from 'react-dom';

import { Strings } from '../strings';
import { colors, spacing } from '../theme';
import { Box } from './Box';
import { Button } from './Button';
import { Text } from './Text';

export enum ModalButtonSet {
  CLOSE,
  YES_CANCEL,
}

export enum ModalCloseOption {
  CONFIRM,
  CANCEL,
}

export interface ModalProps {
  open: boolean;
  onClose: (option: ModalCloseOption) => void;
  title?: string;
  buttons: ModalButtonSet;
  big?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ onClose, open, title, buttons, big, children }) => {
  const confirmCb = useCallback(() => onClose(ModalCloseOption.CONFIRM), [onClose]);
  const cancelCb = useCallback(() => onClose(ModalCloseOption.CANCEL), [onClose]);
  const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <Box
      position="absolute"
      left="0"
      right="0"
      top="0"
      bottom="0"
      backgroundColor="#0d1624aa"
      onClick={cancelCb}
      zIndex={999}
    >
      <Box
        position="absolute"
        backgroundColor={colors.ACCENT_DARK}
        borderRadius="5px"
        padding={spacing.$5}
        boxShadow="rgb(23 32 48) 0px 0px 50px 0"
        gap={spacing.$3}
        flexDirection="column"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        minWidth={big ? '80%' : undefined}
        onClick={stopPropagation}
      >
        {!!title && (
          <Box padding={spacing.$3}>
            <Text text={title} />
          </Box>
        )}
        <Box>{children}</Box>
        <Box gap={spacing.$6}>
          {buttons === ModalButtonSet.YES_CANCEL ? (
            <>
              <Button title={Strings.cancel} onClick={cancelCb} />
              <Button title={Strings.confirm} onClick={confirmCb} />
            </>
          ) : (
            <Button title={Strings.close} onClick={cancelCb} />
          )}
        </Box>
      </Box>
    </Box>,
    document.querySelector('#modalRoot')!
  );
};
