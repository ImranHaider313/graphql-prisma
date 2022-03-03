import bcrypt from 'bcrypt';
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
  deleteUser(parent, args, { prisma, request }, info){
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({where: {
      id: userId
    }}, info)
  },
  updateUser(parent, args, { prisma, request }, info){
    const userId = getUserId(request)

    return prisma.mutation.updateUser({
      where: {id: userId},
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

async deletePost(parent, args, { prisma, request }, info){
  const userId = getUserId(request)
  
  const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
    }
  })

  if(!postExists){
    throw new Error("Post does not exists");
  }

  return prisma.mutation.deletePost({where: {
    id: args.id
  }}, info)
},

async updatePost(parent, args, { prisma, request }, info){
  const userId = getUserId(request)
  
  const postExists = await prisma.exists.Post({
 
      id: args.id,
      author: {
        id: userId
      }
    
  })

  if(!postExists){
    throw new Error("Post does not exists");
  }

  return prisma.mutation.updatePost({
    where: {id: args.id},
    data: {  ...args.data }
  }, info)
},
async createComment(parent, args, { prisma, request }, info){  
  const userId = getUserId(request)
  
  const postExists = await prisma.exists.Post({
      id: args.data.post,
      author: {
        id: userId
    }
  })

  if(!postExists){
    throw new Error("Post does not exists");
  }
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

async deleteComment(parent, args, { prisma, request }, info){
  const userId = getUserId(request)
  
  const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
    }
  })

  if(!commentExists){
    throw new Error("comment does not exists");
  }

  return prisma.mutation.deleteComment({where: {
    id: args.id
  }}, info)
},

async updateComment(parent, args, { prisma, request }, info){
  const userId = getUserId(request)

  const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
    }
  })

  if(!commentExists){
    throw new Error("comment does not exists");
  }

  return prisma.mutation.updateComment({
    where: {id: args.id},
    data: {  ...args.data }
  }, info)
},
}

export { Mutation as default }