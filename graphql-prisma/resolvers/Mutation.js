import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info){
    const emailExists = db.users.some(user => user.email === args.data.email);
    if(emailExists){
      throw new Error("Email already exists");
    }

    const newUser = {
      id: uuidv4(),
      ...args.data
    }

    db.users.push(newUser);
    return newUser
  },
  deleteUser(parent, args, { db }, info){
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if(userIndex === -1){
      throw new Error("User not found")
    }

    const deletedUser = db.users.splice(userIndex, 1)
    return deletedUser[0]
  },
  updateUser(parent, args, { db }, info){
    const user = db.users.find(user => user.id === args.id)

    if(typeof args.data.email === 'string'){
      const emailExists = db.users.some(user => user.email === args.data.email);
      if(emailExists){
        throw new Error('Email already taken');
      }

      user.email = args.data.email
    }

    if(typeof args.data.name === 'string'){
      user.name = args.data.name
    }

    if(args.data.age !== 'undefined'){
      user.age = args.data.age
    }    

    return user
  },
createPost(parent, args, { db, pubsub }, info){
  const userExists = db.users.some(user => user.id === args.data.author);
  if(!userExists){
    throw new Error("User does not exists");
  }

  const newPost = {
    id: uuidv4(),
    ...args.data
  }

  db.posts.push(newPost);
  if(args.data.published){
    pubsub.publish('posts', { post: {
        mutation: 'CREATED',
        data: newPost
      } 
    })
  }
  
  return newPost
},

deletePost(parent, args, { db }, info){
  const postIndex = db.posts.findIndex(post => post.id === args.id)
  if(postIndex === -1){
    throw new Error("post not found")
  }

  const deletedPost = db.posts.splice(postIndex, 1)
  return deletedPost[0]
},

updatePost(parent, args, { db }, info){
  const post = db.posts.find(post => post.id === args.id)

  if(typeof args.data.title === 'string'){
    post.title = args.data.title
  }

  if(typeof args.data.body === 'string'){
    post.body = args.data.body
  }

  if(typeof args.data.published === 'boolean'){
    post.published = args.data.published
  }    

  return post
},
createComment(parent, args, { db, pubsub }, info){
  const userExists = db.users.some(user => user.id === args.data.author);
  if(!userExists){
    throw new Error("User does not exists");
  }

  const postExists = db.posts.some(post => post.id === args.data.post);
  if(!postExists){
    throw new Error("post does not exists");
  }

  const newComment = {
    id: uuidv4(),
    ...args.data
  }
  
  pubsub.publish(`post-${args.data.post}`, { comment: newComment })
  db.comments.push(newComment);
  return newComment
},

deleteComment(parent, args, { db }, info){
  const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
  if(commentIndex === -1){
    throw new Error("comment not found")
  }

  const deletedComment = db.comments.splice(commentIndex, 1)
  return deletedComment[0]
},

updateComment(parent, args, { db }, info){
  const comment = db.comments.find(comment => comment.id === args.id)

  if(typeof args.data.text === 'string'){
    comment.title = args.data.title
  }

  return comment
},
}

export { Mutation as default }