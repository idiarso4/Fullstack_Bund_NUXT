import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all posts with pagination
export const getAll = query({
  args: {
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    const offset = args.offset || 0;
    
    let query = ctx.db.query("posts");
    
    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status));
    }
    
    const posts = await query
      .order("desc")
      .collect();
    
    // Get paginated results
    const paginatedPosts = posts.slice(offset, offset + limit);
    
    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);
        
        return {
          ...post,
          author,
          category,
        };
      })
    );

    return {
      posts: postsWithDetails,
      total: posts.length,
      hasMore: offset + limit < posts.length,
    };
  },
});

// Get published posts only
export const getPublished = query({
  args: {
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    const offset = args.offset || 0;
    
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
    
    // Get paginated results
    const paginatedPosts = posts.slice(offset, offset + limit);
    
    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);
        
        return {
          ...post,
          author,
          category,
        };
      })
    );

    return {
      posts: postsWithDetails,
      total: posts.length,
      hasMore: offset + limit < posts.length,
    };
  },
});

// Get post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!post) {
      return null;
    }

    const author = await ctx.db.get(post.authorId);
    const category = await ctx.db.get(post.categoryId);

    return {
      ...post,
      author,
      category,
    };
  },
});

// Get post by ID
export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    
    if (!post) {
      return null;
    }

    const author = await ctx.db.get(post.authorId);
    const category = await ctx.db.get(post.categoryId);

    return {
      ...post,
      author,
      category,
    };
  },
});

// Get posts by category
export const getByCategory = query({
  args: {
    categoryId: v.id("categories"),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    const offset = args.offset || 0;
    
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .filter((q) => q.eq(q.field("status"), "published"))
      .order("desc")
      .collect();
    
    // Get paginated results
    const paginatedPosts = posts.slice(offset, offset + limit);
    
    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);
        
        return {
          ...post,
          author,
          category,
        };
      })
    );

    return {
      posts: postsWithDetails,
      total: posts.length,
      hasMore: offset + limit < posts.length,
    };
  },
});

// Get posts by author
export const getByAuthor = query({
  args: {
    authorId: v.id("authors"),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    const offset = args.offset || 0;
    
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", args.authorId))
      .filter((q) => q.eq(q.field("status"), "published"))
      .order("desc")
      .collect();
    
    // Get paginated results
    const paginatedPosts = posts.slice(offset, offset + limit);
    
    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);
        
        return {
          ...post,
          author,
          category,
        };
      })
    );

    return {
      posts: postsWithDetails,
      total: posts.length,
      hasMore: offset + limit < posts.length,
    };
  },
});

// Search posts
export const search = query({
  args: {
    searchTerm: v.string(),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    const offset = args.offset || 0;
    const searchTerm = args.searchTerm.toLowerCase();
    
    const allPosts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("status"), "published"))
      .collect();
    
    // Filter posts by search term in title, content, or tags
    const filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm))
    );
    
    // Get paginated results
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);
    
    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);
        
        return {
          ...post,
          author,
          category,
        };
      })
    );

    return {
      posts: postsWithDetails,
      total: filteredPosts.length,
      hasMore: offset + limit < filteredPosts.length,
    };
  },
});

// Create new post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    authorId: v.id("authors"),
    categoryId: v.id("categories"),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existingPost = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existingPost) {
      throw new Error("Post with this slug already exists");
    }

    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      slug: args.slug,
      content: args.content,
      excerpt: args.excerpt,
      featuredImage: args.featuredImage,
      authorId: args.authorId,
      categoryId: args.categoryId,
      status: args.status,
      tags: args.tags,
      viewCount: 0,
      publishedAt: args.status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(postId);
  },
});

// Update post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // If slug is being updated, check if it already exists
    if (updates.slug) {
      const existingPost = await ctx.db
        .query("posts")
        .withIndex("by_slug", (q) => q.eq("slug", updates.slug))
        .first();

      if (existingPost && existingPost._id !== id) {
        throw new Error("Post with this slug already exists");
      }
    }

    // Get current post to check status change
    const currentPost = await ctx.db.get(id);
    if (!currentPost) {
      throw new Error("Post not found");
    }

    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    // If status is changing to published and wasn't published before, set publishedAt
    if (updates.status === "published" && currentPost.status !== "published") {
      filteredUpdates.publishedAt = Date.now();
    }

    await ctx.db.patch(id, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(id);
  },
});

// Delete post
export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    // Delete all comments for this post first
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.id))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Increment view count
export const incrementViewCount = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Post not found");
    }

    await ctx.db.patch(args.id, {
      viewCount: post.viewCount + 1,
    });

    return { success: true };
  },
});

// Get popular posts (by view count)
export const getPopular = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;

    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("status"), "published"))
      .collect();

    // Sort by view count
    const sortedPosts = posts
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);

    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      sortedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);

        return {
          ...post,
          author,
          category,
        };
      })
    );

    return postsWithDetails;
  },
});

// Get recent posts
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_published_date")
      .filter((q) => q.eq(q.field("status"), "published"))
      .order("desc")
      .take(limit);

    // Get author and category details for each post
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const category = await ctx.db.get(post.categoryId);

        return {
          ...post,
          author,
          category,
        };
      })
    );

    return postsWithDetails;
  },
});
