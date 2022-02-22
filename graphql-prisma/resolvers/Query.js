const Query = {
  users(parent, args, { db }, info){
    if(args.query){
      return db.users.filter(user => user.name.toLowerCase().includes(args.query) ||  user.email.toLowerCase().includes(args.query))
    } else {
      return db.users
    }
  },
  posts(parent, args, { db }, info){
    if(args.query){
      return db.posts.filter(post => post.title.toLowerCase().includes(args.query))
    } else {
      return db.posts
    }
  },
  comments(parent, args, { db }, info){
    if(args.query){
      return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query))
    } else {
      return db.comments
    }
  },    
};

export { Query as default}