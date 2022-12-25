import React from 'react';
import {
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import SendIcon from '@material-ui/icons/Send';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  field2: {
    marginRight: 20,
  },
  select: {
    width: '50%',
    marginBottom: 20,
  },
});
export default function Create() {
  const classes = useStyles(); // classes is an object
  const [category, setCategory] = React.useState('All');
  const history = useHistory();
  const [title, setTitle] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [detailsError, setDetailsError] = React.useState(false);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title && details) {
      console.log(title, details, category);
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push('/'));
    }
    if (!title) {
      setTitleError(true);
    }
    if (!details) {
      setDetailsError(true);
    }
  };

  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        gutterBottom
        color='textSecondary'
      >
        Create a new note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          label='Note Title'
          variant='outlined'
          color='secondary'
          onChange={(event) => setTitle(event.target.value)}
          className={classes.field2}
          required
          error={titleError}
        />
        <Select
          required
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={category}
          label='Category'
          onChange={handleChange}
          className={classes.select}
          variant='outlined'
        >
          <MenuItem value={'All'}>All</MenuItem>
          <MenuItem value={'College'}>College</MenuItem>
          <MenuItem value={'House'}>House</MenuItem>
        </Select>

        <TextField
          label='Note Details'
          onChange={(event) => setDetails(event.target.value)}
          multiline
          minRows={4}
          error={detailsError}
          className={classes.field}
          variant='outlined'
          fullWidth
          color='secondary'
        />
        <br />
        <FormControl className={classes.field}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            row
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <FormControlLabel
              control={<Radio />}
              label='College'
              value='college'
            />
            <FormControlLabel control={<Radio />} label='Todos' value='todos' />
            <FormControlLabel control={<Radio />} label='All' value='all' />
            <FormControlLabel control={<Radio />} label='House' value='house' />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          //startIcon={<AcUnitIcon />}
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>

      <br />
    </Container>
  );
}
