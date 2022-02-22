import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, { db, prisma }, info){
    const emailExists = await prisma.exists.User({ email: args.data.email});

    if(emailExists){
      throw new Error("Email already exists");
    }

    return prisma.mutation.createUser({data: args.data}, info)
  },
  deleteUser(parent, args, { prisma }, info){
    return prisma.mutation.deleteUser({where: {
      id: args.id
    }}, info)
  },
  updateUser(parent, args, { prisma }, info){
    return prisma.mutation.updateUser({
      where: {id: args.id},
      data: {
        name: args.data.name
      }
    }, info)
  },
async createPost(parent, args, { prisma, pubsub }, info){  
  const newPost = await prisma.mutation.createPost({data: {
    ...args.data,
    author: {
      connect: {
        id: args.data.author
      }
    }
  }}, info)
  
  return newPost
},

deletePost(parent, args, { prisma }, info){
  return prisma.mutation.deletePost({where: {
    id: args.id
  }}, info)
},

updatePost(parent, args, { prisma }, info){
  return prisma.mutation.updatePost({
    where: {id: args.id},
    data: {  ...args.data }
  }, info)
},
async createComment(parent, args, { prisma, pubsub }, info){  
  const newComment = await prisma.mutation.createComment({data: {
    ...args.data,
    author: {
      connect: {
        id: args.data.author
      }},
      post: {
        connect: {
          id: args.data.post
        }      
    }
  }}, info)
  
  return newComment
},

deleteComment(parent, args, { prisma }, info){
  return prisma.mutation.deleteComment({where: {
    id: args.id
  }}, info)
},

updateComment(parent, args, { prisma }, info){
  return prisma.mutation.updateComment({
    where: {id: args.id},
    data: {  ...args.data }
  }, info)
},
}

export { Mutation as default }