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
console.log('args', args);
   
      query.where = {
          published: true
        }
        if(args.query){
          query.where.OR = [
            { title: args.query },
            { body: args.query }
          ]
        }

    
    return prisma.query.posts(query, info)
  },
  comments(parent, args, { db, prisma }, info){
     return prisma.query.posts(null, info)
  },    
};

export { Query as default}