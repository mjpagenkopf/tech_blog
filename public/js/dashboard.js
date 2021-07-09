//CREATE NEW BLOG FROM DASHBOARD
const newFormHandler = async (event) => { 
  event.preventDefault();

const name = document.querySelector('#blog-name').value.trim();
const description = document.querySelector('#blog-desc').value.trim();

if (name && description) {
  // Send fetch request to add
  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({ 
      name, 
      description 
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  //if the blog is added, the 'dashboard' template will be rerendered
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert("failed to create");
  }
}
}
var el = document.querySelector('.new-blog-form');
if (el) {
  el.addEventListener('submit', newFormHandler);
}

//DELETE BLOG FROM DASHBOARD
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  };
};

var del = document.querySelector('.blog-list');
if (del) {
  del.addEventListener('click', delButtonHandler);
}
