import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faUser } from '@fortawesome/fontawesome-free-regular';

const UserComments = () => {
  return (
    <>
      <div className="user-comments-img">
        <FontAwesomeIcon style={{ color: 'grey' }} icon={faUser}></FontAwesomeIcon>
      </div>
      <textarea name="userComment" id="userComment" className="user-comments-area"></textarea>
      <input className='comment-button' type="submit" value="Submit"></input>
    </>

  )
};

export default UserComments;