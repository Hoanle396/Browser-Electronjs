import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import ShortcutKeys from 'renderer/hooks/shortcut/ShortcutKeys';
import useHotkeys from 'renderer/hooks/shortcut/useHotkeys';
import { SearchContext } from '../../context/SearchContext';

type SearchEngineModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchEngineModal = () => {
  const { setSearchEngine, searchEngine } = useContext(SearchContext);

  const [isOpen, setOpen] = useState<boolean>(false);

  const onChangeSelect = (event: React.FormEvent<HTMLElement>) =>
    setSearchEngine?.((event.target as HTMLFormElement).value);

  useHotkeys(`${ShortcutKeys.CTRL}+${ShortcutKeys.E}`, () => {
    setOpen(!isOpen);
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay backgroundColor="transparent" />
        <ModalContent
          backgroundColor="#32363e"
          onChange={(e: React.FormEvent<HTMLElement>) => onChangeSelect(e)}
        >
          <ModalHeader>Search Engine Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom="20px">
            <Select
              value={searchEngine}
              backgroundColor={{ backgroundColor: '#32363e' }}
            >
              <option
                value="https://www.google.com/search?q="
                style={{ backgroundColor: '#32363e' }}
              >
                {' '}
                Google
              </option>
              <option
                value="https://duckduckgo.com/?q="
                style={{ backgroundColor: '#32363e' }}
              >
                DucDuckGo
              </option>
              <option
                value="https://yandex.com.tr/search/?text="
                style={{ backgroundColor: '#32363e' }}
              >
                Yandex
              </option>
            </Select>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchEngineModal;
