import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e7f2ff',
      100: '#cfe6ff',
      200: '#9ed0ff',
      300: '#6fb9ff',
      400: '#3f9fff',
      500: '#1f7acc',
      600: '#175fa0',
      700: '#114675',
      800: '#082e4d',
      900: '#021827',
    }
  },
  fonts: {
    heading: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    body: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
});

export default theme;
