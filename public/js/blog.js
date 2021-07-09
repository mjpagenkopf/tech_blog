//CREATE COMMENT MODAL
const newCommentHandler = async (event) => { 
    event.preventDefault();
  
    const user_post = document.querySelector(`input[name="comment-desc"]`).value.trim();
    const blog_id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    if (user_post) {
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            user_post,
            blog_id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
        document.querySelector('#myModal')
        .style.display = 'block';
    }
}}
document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);

//DELETE COMMENT BUTTON
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    };
  };
  
  var del = document.querySelector('.comment-list');
  if (del) {
    del.addEventListener('click', delButtonHandler);
  }