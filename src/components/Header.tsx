import { Box } from '@mui/material'
import { useLocation } from '@tanstack/react-router'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from "react";
import { CustomLink } from '~/components/CustomLink';

interface StyledCustomLinkProps {
    selected?: boolean;
    label?: string;
    to: string;
}

function StyledCustomLink (props: StyledCustomLinkProps) {
    return (
        <Tab label={props.label} component={CustomLink} aria-current={props.selected && 'page'} {...props} sx={{ textTransform: 'capitalize' }} />
    )
}

export function Header() {
    const location = useLocation();
    const [_, setValue] = React.useState<number>(0);

   const getTabValue = () => {
       switch (location.pathname) {
           case '/favorite-products':
               return 1;
           case '/about':
               return 2;
           case '/weather':
               return 3;
           default:
               return 0;
       }
   }

    const handleChange = (event:  React.SyntheticEvent, newValue: number) => {
        // todo implement logic to handle tab changes
        setValue(newValue);
    };
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'static', backgroundColor: 'white', zIndex: '99' }}>
      <Tabs value={getTabValue()}
      onChange={handleChange}>
          <StyledCustomLink label="Index" to="/" />
          <StyledCustomLink label="Favorites" to="/favorite-products" />
          <StyledCustomLink label="About" to="/about" />
          <StyledCustomLink label="Weather" to="/weather" />
      </Tabs>
    </Box>
  )
}
