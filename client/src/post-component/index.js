// Post Creation Component
import React, { useState } from 'react';
import Modal from 'react-modal';
import Feed from '../feed-component/index';
import data from '../feed-component/data';

Modal.setAppElement('#root');

function Posts() {
  // setup consts and vars
  const [modalOpen, setModal] = useState(false);
  const [posts, setPosts] = useState(data);
  // instead, use state to hold form values, like this
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  // var name = 'Mohamed';
  // var post = 'Today';

  // when submitting a form, use this name
  const handleSubmit = (e) => {
    e.preventDefault();
    // assemble your new post from hook state holding input values
    const newPost = { name, text };
    // check...
    console.log([...posts, newPost]);
    // add to post array
    setPosts([...posts, newPost]);
    // cleanup...
    setName('');
    setText('');
    setModal(false);
  };

  return (
    <div>
      <button className='create_post_button' onClick={() => setModal(true)}>
        Create Post
      </button>
      <Feed posts={posts}></Feed>
      <Modal
        isOpen={modalOpen}
        shouldCloseOnEsc={true}
        className='create_post_modal'
      >
        <h2>Create Post</h2>
        {/*     Avoid creating a component inside another     component.       
        It becomes difficult to manage scope.  
        This was causing major errors.      
        <PostForm></PostForm> */}
        <article>
          <form>
            <input
              placeholder='Name'
              type='text'
              id='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            <input
              type='text'
              placeholder='Your Post'
              id='comment'
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></input>
            <button className='create_post_button' onClick={handleSubmit}>
              Post
            </button>
          </form>
        </article>

        <button className='create_post_button' onClick={() => setModal(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Posts;
