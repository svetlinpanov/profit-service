import React from 'react';
import { useResolvedPath, useMatch, NavLink } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Paid as PaidIcon } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QuizIcon from '@mui/icons-material/Quiz';

interface NavigationCategory {
  name: string;
  links: Array<{
    name: string;
    icon: React.ReactNode;
    to: string;
  }>;
}

const navigationCategories: NavigationCategory[] = [
  {
    name: 'General',
    links: [
      {
        name: 'Profit Calculator',
        icon: <PaidIcon />,
        to: 'profit',
      },
    ],
  },
];

export default function Navigation(props: DrawerProps) {
  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Profit Tool
        </ListItem>
        <ListItemHomeNavLink />
        {navigationCategories.map(({ name: id, links }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {links.map(({ name, icon, to }) => (
              <ListItemNavLink key={name} name={name} icon={icon} to={to} />
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

interface ListItemNavLinkProps {
  to: string;
  icon: React.ReactNode;
  name: string;
}

const ListItemNavLink: React.FC<ListItemNavLinkProps> = ({ to, icon, name }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = Boolean(useMatch({ path: resolvedPath.pathname, end: false }));

  return (
    <ListItem disablePadding key={name}>
      <ListItemButton selected={isActive} sx={item} component={NavLink} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

const ListItemHomeNavLink: React.FC = () => {
  const resolvedPath = useResolvedPath('.');
  const isActive = Boolean(useMatch({ path: resolvedPath.pathname }));

  return (
    <ListItem
      disablePadding
      component={NavLink}
      to="."
      sx={{ ...item, ...itemCategory, ...(isActive ? { color: 'primary.light' } : {}) }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText>Home</ListItemText>
    </ListItem>
  );
};

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};
