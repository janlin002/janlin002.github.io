import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Typography, Paper,
} from '@material-ui/core';
import FileBase from 'react-file-base64';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import {
  createPost,
  updatePost,
} from '../../redux/actions';

function Form({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const posts = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  useEffect(() => {
    if (posts) {
      setPostData(posts);
    }
  }, [posts]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  // 把新增跟修改邏輯寫在一起
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      // create
      dispatch(createPost(postData));
      clear();
    } else {
      // update
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? `Editing "${posts.title}"` : 'Creating a Memory'}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;

Form.propTypes = {
  currentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setCurrentId: PropTypes.func.isRequired,
};

// 表單
