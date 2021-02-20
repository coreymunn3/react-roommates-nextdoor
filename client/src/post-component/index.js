// Post Creation Component
import React, { useState } from "react";
import Modal from "react-modal";
import Feed from '../feed-component/index';
import data from '../feed-component/data';

Modal.setAppElement('#root')

function PostCreateButton() {
    // setup consts and vars
  const [modalOpen, setModal] = useState(false);
  const [posts, setPosts] = useState(data);
  var name = 'Mohamed';
  var post = 'Today';

  const addNewPost = () => {
      posts.push({post, name});
      setPosts(posts);
  }

  /**
   * Post form
   */
  const Post = () => {
      return(<>
      <article>
          <form onSubmit={() => addNewPost()}>
                <input 
                placeholder="Name" 
                type="text" 
                value={name}
                id="name"> 
                </input>
            </form>
            <form>
                <input 
                type="text" 
                placeholder="Your Post" 
                value={post}
                id="comment"> 
                </input>
            <button 
                className="create_post_button"
                onClick={() => setModal(false)}
                type="submit"
                >
                Post
            </button>
          </form>
      </article>
      </>);
  };
 
  return (
    <div> 
      <button
        className="create_post_button"
        onClick={() => setModal(true)}
      >
        Create Post
      </button>
      <Feed input={ posts }>

      </Feed>
      <Modal 
        isOpen={modalOpen}
        shouldCloseOnEsc={true}
        className="create_post_modal"
        >
            <h2>Create Post</h2>
            <Post>

            </Post>
            <button 
                className="create_post_button"
                onClick={() => setModal(false)}>
                Close
            </button>
      </Modal>
    </div>
  );
}

export default PostCreateButton;
