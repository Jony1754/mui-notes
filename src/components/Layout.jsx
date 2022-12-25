import React from 'react';
import { format } from 'date-fns';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { useHistory, useLocation } from 'react-router-dom';
import { AddCircleOutline } from '@material-ui/icons';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },

    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
      fontWeight: 700,
    },
  };
});

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: 'My notes',
      icon: <InboxIcon color='secondary' />,
      path: '/',
    },
    {
      text: 'Create notes',
      icon: <AddCircleOutline color='secondary' />,
      path: '/create',
    },
  ];
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appbar} color='secondary'>
        <Toolbar>
          <Typography className={classes.date}>
            {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>My notes </Typography>
          <Avatar
            src={'https://picsum.photos/200/300'}
            className={classes.avatar}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <Typography variant='h5' align='center' className={classes.title}>
            My notes
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              className={
                location.pathname === item.path ? classes.active : null
              }
              onClick={() => {
                history.push(item.path);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
