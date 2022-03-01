import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId  from '../utils/getUserId';

const Mutation = {
  async createUser(parent, args, { db, prisma }, info){
    if(args.data.password.length < 8) {
      throw new Error("Password must be 8 characters or longer")
    }
    const emailExists = await prisma.exists.User({ email: args.data.email});

    if(emailExists){
      throw new Error("Email already exists");
    }
    
    const password = await bcrypt.hash(args.data.password, 10);
    const user = prisma.mutation.createUser({
        data: {
        ...args.data,
        password
      }
    })

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisissecret')
    }
  },
  async login(parent, args, {prisma}, info){
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })

    if (!user) {
      throw new Error('Unable to find user')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password)
    if (!isMatch) {
      throw new Error('Password doesnot match')
    }

    return{
      user,
      token: jwt.sign({userId: user.id}, 'thisissecret')
    }

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
async createPost(parent, args, { prisma, request }, info){  
  const userId = getUserId(request)
  const newPost = await prisma.mutation.createPost({data: {
    ...args.data,
    author: {
      connect: {
        id: userId
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