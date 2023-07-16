import React, { useState } from 'react';
import {
  NavLink,
  useOutletContext,
  useResolvedPath,
  useMatch,
} from 'react-router-dom';

import {
  Menu,
  Tab,
  Tabs,
  Typography,
  Toolbar,
  IconButton,
  Grid,
  Avatar,
  AppBar,
  MenuProps,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
} from '@mui/icons-material';
import { DashPageOutletContext } from './DashPage';

interface DashPageHeaderProps {
  pageTitle: string;
  tabs?: NavigationTab[];
}

interface NavigationTab {
  name: string;
  to: string;
}

export const DashPageHeader: React.FC<DashPageHeaderProps> = ({ pageTitle, tabs }) => {
  const { handleDrawerToggle } = useOutletContext<DashPageOutletContext>();

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement>();
  const handleClickUserMenu: React.MouseEventHandler<HTMLButtonElement> = e => {
    setMenuAnchorEl(e.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setMenuAnchorEl(undefined);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleClickUserMenu}>
                <Avatar alt="My Avatar" sx={{ bgcolor: 'white', color: 'text.secondary' }}>
                  U1
                </Avatar>
              </IconButton>
              <UserMenu
                open={!!menuAnchorEl}
                anchorEl={menuAnchorEl}
                onClick={handleCloseUserMenu}
                onClose={handleCloseUserMenu}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" color="primary" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {pageTitle}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        {tabs ? <NavigationTabs tabs={tabs} /> : <Box sx={{ height: 24 }} />}
      </AppBar>
    </React.Fragment>
  );
};

const NavigationTabs = ({ tabs }: { tabs: NavigationTab[] }) => {
  const activeIndex = tabs
    // Order of tabs won't change so we can disable the rule.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    .map(t => useMatch({ path: useResolvedPath(t.to).pathname, end: false }))
    .findIndex(match => Boolean(match));

  return (
    <Tabs value={activeIndex} textColor="inherit">
      {tabs.map(({ name, to }) => (
        <Tab label={name} key={name} component={NavLink} to={to} />
      ))}
    </Tabs>
  );
};

interface UserMenuProps {
  open: boolean;
  onClose(): void;
  onClick(): void;
  anchorEl: MenuProps['anchorEl'];
}

const UserMenu: React.FC<UserMenuProps> = ({ open, onClose, onClick, anchorEl }) => {

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClick}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
    </Menu>
  );
};
