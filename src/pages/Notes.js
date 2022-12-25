import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper } from '@material-ui/core';
import NotesCard from '../components/NotesCard';
export default function Notes() {
  const [notes, setNotes] = React.useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);
  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    });
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <NotesCard note={note} handleDelete={handleDelete} />
          // <Grid item md={6} xs={12} key={note.id} lg={4}>
          //   <Paper>{note.title}</Paper>
          // </Grid>
          // <p key={note.id}>{note.title}</p>
        ))}
      </Grid>
    </Container>
  );
}
