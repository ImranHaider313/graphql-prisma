const Query = {
  users(parent, args, { db, prisma }, info){
      let query = {
        orderBy: args.orderBy
      };

      if(args.query){
        query.where = {
            OR: [
              { name: args.query },
            ]
          }
        }
      
      return prisma.query.users(query, info)
  },
  posts(parent, args, { db, prisma }, info){
    let query = { orderBy: args.orderBy };
   
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
    let query = { orderBy: args.orderBy };
     return prisma.query.comments(query, info)
  },    
};

export { Query as default}