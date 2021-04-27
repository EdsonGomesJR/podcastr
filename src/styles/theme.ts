import { extendTheme } from '@chakra-ui/react';

//Reaproveita o tema padrão do chakra e substitui o que lhe for de agrado
export const theme = extendTheme({
   components: {
        Heading: {
          baseStyle: {
            fontWeight: 600,
            color: 'gray.800',
          }
         
        }
      },
  colors: {
 gray: { //substituindo os tons de cinza utilizados
      "800": "#494D4B",
      "500": "#808080",
      "200": "#AFB2B1",
      "100": "#E6E8EB",
      "50":  "#F7F8FA",
    },
    green: {
      "500": '#04D361',
    },
    purple: {
      "800": '#6F48C9',
      "500": "#8257E5",
      '400': '#9164FA',
      '300': '#9F75FF',
    },
  


  },
  fonts: {
    body: 'Inter',
    a: 'Lexend',

  },

  styles: {
    global: {
     
      body: {
        bg: 'gray.50',
        color: 'gray.500',
        fontSize: ['sm', 'md', '1rem'],
        fontWeight: 500,
      
      },
      h1: {
        fontSize: ['sm','md','2rem'],
        
      },

      h2: {
        fontSize: ['sm','md','1.5rem']
      },

     
     
  
      
    }
  }
})