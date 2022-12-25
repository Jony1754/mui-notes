import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { yellow } from '@material-ui/core/colors';
import { Avatar } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { pink } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  CardHeader,
  Button,
} from '@material-ui/core';
const useStyles = makeStyles({
  test: {
    border: (note) => {
      if (note.category === 'work') {
        return '1px solid red';
      }
    },
  },
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[700];
      }
      if (note.category === 'todos') {
        return pink[700];
      }
      return blue[700];
    },
  },
});

const NotesCard = ({ note, handleDelete }) => {
  const classes = useStyles(note); // pass note as a
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Container>
        <Card elevation={0}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {note.category[0].toUpperCase()}
              </Avatar>
            }
            title={note.title}
            subheader={note.category}
            action={
              <IconButton
                onClick={() => {
                  console.log('Delete note: ', note.title);
                  handleDelete(note.id);
                }}
              >
                <DeleteOutlined />
              </IconButton>
            }
          ></CardHeader>
          <CardContent>
            <Typography variant='body2' color='textSecondary'>
              {note.details}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default NotesCard;
