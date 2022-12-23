import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect } from 'react';
import { FaYandexInternational } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiDuckduckgo } from 'react-icons/si';
import '../App.css';
import { SearchContext } from '../context/SearchContext';
import { TabContext } from '../context/TabContext';

const Searchbar = () => {
  const { onChange, search, searchEngine } = useContext(SearchContext);

  const { nextTab } = useContext(TabContext);

  const handleSetSearchEngineShortcut = useCallback(
    (event: KeyboardEvent) => {
      nextTab?.(event);
    },
    [nextTab]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleSetSearchEngineShortcut);

    return () => {
      document.removeEventListener('keydown', handleSetSearchEngineShortcut);
    };
  }, [handleSetSearchEngineShortcut]);

  const getEngineIcon = () => {
    switch (searchEngine) {
      case 'https://www.google.com/search?q=':
        return <FcGoogle />;
      case 'https://yandex.com.tr/search/?text=':
        return <FaYandexInternational />;
      case 'https://duckduckgo.com/?q=':
        return <SiDuckduckgo />;
      default:
        return <FcGoogle />;
    }
  };

  return (
    <>
      <HStack w="95vw">
        <InputGroup size="md" h="40px" id="search-bar-container">
          <InputLeftAddon
            h="40px"
            color="white"
            backgroundColor="#32363e"
            border="none"
            // onClick={() => setModal(!isModalOpen)}
          >
            {getEngineIcon()}
          </InputLeftAddon>
          <Input
            variant="filled"
            placeholder="Search"
            autoFocus
            onKeyDown={(e: React.KeyboardEvent) =>
              e.key === 'Enter' && search?.()
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e)}
            backgroundColor="#32363e"
            _focus={{ backgroundColor: '#32363e' }}
            _hover={{ backgroundColor: '#32363e' }}
          />

          <InputRightElement>
            <Button
              h="40px"
              w="40px"
              size="sm"
              leftIcon={<SearchIcon />}
              backgroundColor="#32363e"
              variant="solid"
              onClick={search}
              _hover={{
                backgroundColor: '#32363e',
              }}
              _focus={{
                backgroundColor: '#32363e',
                outline: 'none',
              }}
            />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </>
  );
};

export default Searchbar;
