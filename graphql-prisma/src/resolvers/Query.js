const Query = {
  users(parent, args, { db, prisma }, info){
      let query = {};

      if(args.query){
        query.where = {
            OR: [
              { name: args.query },
              { email: args.query }
            ]
          }
        }
      
      return prisma.query.users(query, info)
  },
  posts(parent, args, { db, prisma }, info){
    let query = {};

    if(args.query){
      query.where = {
          OR: [
            { title: args.query },
            { body: args.query }
          ]
        }
      }
    
    return prisma.query.posts(query, info)
  },
  comments(parent, args, { db, prisma }, info){
     return prisma.query.posts(null, info)
    // if(args.query){
    //   return db.comments.filter(comment => comment.text.toLowerCase().includes(args.query))
    // } else {
    //   return db.comments
    // }
  },    
};

export { Query as default}