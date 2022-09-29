import '../styles/globals.css'
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import { ColorScheme, ColorSchemeProvider, MantineProvider, useMantineColorScheme } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';  
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async() => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`, {withCredentials:true}
      )
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
      axios.defaults.withCredentials = true;
    }
    getCsrfToken()
  },[])
  return (
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{            
            colorScheme,
            fontFamily: 'Verdana, sans-serif'
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        </ColorSchemeProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default MyApp
