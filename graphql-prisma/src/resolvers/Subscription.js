const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info){
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish('count', { count })
      }, 1000);

      return pubsub.asyncIterator('count')
    }
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info){

      const post = db.posts.some(p => p.id === postId);

      if(!post){
        throw new Error("Post not found");
      }

      return pubsub.asyncIterator(`post-${postId}`)
    }
  },
  post: {
    subscribe(parent, args, {pubsub}, info){
      return pubsub.asyncIterator('posts');
    }
  }
}

export { Subscription as default }