const users = [
  {id: 'user-1', name: 'imran', email: 'imran@gmail.com', age: 23},
  {id: 'user-2', name: 'nadir', email: 'nadir@gmail.com', age: 34}
]

const posts = [
  {id: 'post-1', title: 'post-1 title', body: 'post-1 body', author: 'user-1'},
  {id: 'post-2', title: 'post-2 title', body: 'post-2 body', author: 'user-2'},
]

const comments = [
  {id: 'comment-1', text: 'comment-1 body', author: 'user-1', post: 'post-1'},
  {id: 'comment-2', text: 'comment-2 body', author: 'user-2', post: 'post-2'},
  {id: 'comment-3', text: 'comment-3 body', author: 'user-1', post: 'post-2'},
]

const db = {
  users,
  posts,
  comments
}

export default db;