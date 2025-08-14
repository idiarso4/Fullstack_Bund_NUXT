import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get comments for a specific post
export const getByPost = query({
  args: { 
    postId: v.id("posts"),
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId));
    
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }
    
    const comments = await query
      .order("asc")
      .collect();

    // Get author details for each comment (if authorId exists)
    const commentsWithDetails = await Promise.all(
      comments.map(async (comment) => {
        let author = null;
        if (comment.authorId) {
          author = await ctx.db.get(comment.authorId);
        }
        
        return {
          ...comment,
          author,
        };
      })
    );

    // Organize comments in a tree structure (parent-child)
    const commentMap = new Map();
    const rootComments = [];

    // First pass: create map of all comments
    commentsWithDetails.forEach(comment => {
      commentMap.set(comment._id, { ...comment, replies: [] });
    });

    // Second pass: organize into tree structure
    commentsWithDetails.forEach(comment => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentMap.get(comment._id));
        }
      } else {
        rootComments.push(commentMap.get(comment._id));
      }
    });

    return rootComments;
  },
});

// Get all comments (for admin)
export const getAll = query({
  args: {
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    const offset = args.offset || 0;
    
    let query = ctx.db.query("comments");
    
    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status));
    }
    
    const comments = await query
      .order("desc")
      .collect();
    
    // Get paginated results
    const paginatedComments = comments.slice(offset, offset + limit);
    
    // Get author and post details for each comment
    const commentsWithDetails = await Promise.all(
      paginatedComments.map(async (comment) => {
        let author = null;
        if (comment.authorId) {
          author = await ctx.db.get(comment.authorId);
        }
        
        const post = await ctx.db.get(comment.postId);
        
        return {
          ...comment,
          author,
          post,
        };
      })
    );

    return {
      comments: commentsWithDetails,
      total: comments.length,
      hasMore: offset + limit < comments.length,
    };
  },
});

// Create new comment
export const create = mutation({
  args: {
    postId: v.id("posts"),
    authorId: v.optional(v.id("authors")),
    authorName: v.string(),
    authorEmail: v.string(),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    // Verify post exists
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    // If parentId is provided, verify parent comment exists
    if (args.parentId) {
      const parentComment = await ctx.db.get(args.parentId);
      if (!parentComment) {
        throw new Error("Parent comment not found");
      }
    }

    const now = Date.now();
    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      authorId: args.authorId,
      authorName: args.authorName,
      authorEmail: args.authorEmail,
      content: args.content,
      parentId: args.parentId,
      status: "pending", // All comments start as pending
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(commentId);
  },
});

// Update comment
export const update = mutation({
  args: {
    id: v.id("comments"),
    content: v.optional(v.string()),
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(id, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(id);
  },
});

// Delete comment and all its replies
export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    // Get all replies to this comment
    const replies = await ctx.db
      .query("comments")
      .withIndex("by_parent", (q) => q.eq("parentId", args.id))
      .collect();

    // Recursively delete all replies
    for (const reply of replies) {
      await ctx.db.delete(reply._id);
    }

    // Delete the comment itself
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Approve comment
export const approve = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "approved",
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.id);
  },
});

// Reject comment
export const reject = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "rejected",
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.id);
  },
});

// Get comment statistics
export const getStats = query({
  handler: async (ctx) => {
    const allComments = await ctx.db.query("comments").collect();
    
    const stats = {
      total: allComments.length,
      pending: allComments.filter(c => c.status === "pending").length,
      approved: allComments.filter(c => c.status === "approved").length,
      rejected: allComments.filter(c => c.status === "rejected").length,
    };

    return stats;
  },
});

// Get recent comments
export const getRecent = query({
  args: { 
    limit: v.optional(v.number()),
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 5;
    
    let query = ctx.db.query("comments");
    
    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status));
    }
    
    const comments = await query
      .order("desc")
      .take(limit);
    
    // Get author and post details for each comment
    const commentsWithDetails = await Promise.all(
      comments.map(async (comment) => {
        let author = null;
        if (comment.authorId) {
          author = await ctx.db.get(comment.authorId);
        }
        
        const post = await ctx.db.get(comment.postId);
        
        return {
          ...comment,
          author,
          post,
        };
      })
    );

    return commentsWithDetails;
  },
});
