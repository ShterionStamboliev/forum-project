import React, { useState, useEffect } from 'react';

const UserComments = () => {
  return (
    <>
      <textarea name="userComment" id="userComment" className="user-comments-area"></textarea>
      <input className='comment-button' type="submit" value="Submit"></input>
    </>

  )
};

export default UserComments;