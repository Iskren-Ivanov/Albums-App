import React from 'react';
import { Nav } from 'react-bootstrap';
import albums from '../../../PngImages/albumsImg/albumsImg';

import './Albums.css';

const Albums = () => (
  <Nav className='albums-container'>
    {albums.map((album) => (
      <Nav.Item key={album.id} className='navbar albums-container__nav-item'>
        <Nav.Link
          className='nav-link albums-container__nav-link'
          eventKey={album.id}
          href={`#/albums/${album.id}/photos`}
        >
          {album.title}
        </Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
);

export default Albums;
