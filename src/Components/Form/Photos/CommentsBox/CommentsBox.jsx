import React, { Fragment, useEffect, useState, useRef, useMemo } from 'react';
import {
  Toast,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from 'react-bootstrap';
import Loader from '../../../../shared/loader/loader';

import axios from 'axios';
import './CommentsBox.css';

const urlFirebase =
  'https://project-albums-photos-comment.firebaseio.com/comments.json?';
const urlForDeleting =
  'https://project-albums-photos-comment.firebaseio.com/comments/';

const CommentsBox = () => {
  const authData = JSON.parse(localStorage.getItem('userData'));
  const idToken = authData.idToken;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const usernameInputRef = useRef();

  const getAlbumId = () => {
    const strLocation = window.location.hash.trim();
    const locationToArr = strLocation.split('/').filter(function (str) {
      return /\S/.test(str);
    });
    const numberOfPhoto = locationToArr[2];
    return parseInt(numberOfPhoto);
  };

  const albumId = getAlbumId();

  useEffect(() => {
    getComments();
  }, [albumId]);

  const getComments = async () => {
    setLoading(true);

    let data = await axios.get(urlFirebase + idToken).then((response) => {
      return response.data;
    });

    if (data) {
      const sortDataWhithCurrentId = [];
      for (const [key, value] of Object.entries(data)) {
        if (value.albumId === albumId) {
          sortDataWhithCurrentId.push({
            albumId: value.albumId,
            body: value.body,
            date: value.date,
            email: value.email,
            id: key,
          });
        }
      }
      setComments(sortDataWhithCurrentId);
    }
    setLoading(false);
  };

  const postNewComment = async (email, body, albumId) => {
    const date = new Date();
    const dateFormating = formatDate(date);
    const postObject = {
      email,
      body,
      albumId,
      date: dateFormating,
    };
    await axios.post(urlFirebase, postObject).then((response) => {
      postObject.id = response.data.name;
      setComments([...comments, postObject]);
    });
  };

  const onSubmitComment = (event) => {
    event.preventDefault();
    // yes I know that I am manipulating the DOM
    usernameInputRef.current.value = '';

    if (comment?.length >= 1) {
      postNewComment(authData.email, comment, albumId);
    }
  };

  const deleteComment = (deleteId) => {
    const filteredComments = comments.filter((x) => x.id !== deleteId);
    setComments(filteredComments);
    const deleteUrl = `${urlForDeleting}${deleteId}.json`;
    axios.delete(deleteUrl);
  };

  const formatDate = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  };

  let scrollingCommentsClass = '';

  if (comments.length > 0) {
    scrollingCommentsClass = 'overflow-scroll';
  }

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className={`comments-container ${scrollingCommentsClass}`}>
        {comments
          .sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
          .map((c) => {
            return (
              <Toast className='custom-toast' key={c.id}>
                <Toast.Header closeButton={false}>
                  <strong className='mr-auto'>{c.email}</strong>
                  <small>{c.date}</small>
                  <button
                    type='button'
                    className='ml-2 mb-1 close'
                    data-dismiss='toast'
                    aria-label='Close'
                  >
                    <span
                      onClick={() => deleteComment(c.id)}
                      aria-hidden='true'
                    >
                      &times;
                    </span>
                  </button>
                </Toast.Header>
                <Toast.Body>{c.body}</Toast.Body>
              </Toast>
            );
          })}
      </div>
      <br />
      <Form onSubmit={onSubmitComment}>
        <FormGroup role='form'>
          <FormLabel>
            <b>Add your comment:</b>
          </FormLabel>
          <FormControl
            ref={usernameInputRef}
            onBlur={(event) => setComment(event.target.value)}
            as='textarea'
            className='form-control'
          />
          <Button className='btn btn-primary btn-large btn-send' type='submit'>
            Send
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default CommentsBox;
