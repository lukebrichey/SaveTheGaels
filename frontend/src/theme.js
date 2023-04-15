// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
      transparent: 'transparent',
      gray: '#E2E8F0',
      green: '#22543D',
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: 'normal',
        }
      }
    },
  });

export default theme;
