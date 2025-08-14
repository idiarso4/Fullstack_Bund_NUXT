import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all authors
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("authors")
      .order("desc")
      .collect();
  },
});

// Get active authors only
export const getActive = query({
  handler: async (ctx) => {
    return await ctx.db.query("authors")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();
  },
});

// Get author by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("authors")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get author by ID
export const getById = query({
  args: { id: v.id("authors") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create new author
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("author"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existingAuthor = await ctx.db
      .query("authors")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingAuthor) {
      throw new Error("Author with this email already exists");
    }

    const now = Date.now();
    const authorId = await ctx.db.insert("authors", {
      name: args.name,
      email: args.email,
      avatar: args.avatar,
      bio: args.bio,
      role: args.role,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(authorId);
  },
});

// Update author
export const update = mutation({
  args: {
    id: v.id("authors"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("author"), v.literal("user"))),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // If email is being updated, check if it already exists
    if (updates.email) {
      const existingAuthor = await ctx.db
        .query("authors")
        .withIndex("by_email", (q) => q.eq("email", updates.email))
        .first();

      if (existingAuthor && existingAuthor._id !== id) {
        throw new Error("Author with this email already exists");
      }
    }

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

// Delete author
export const remove = mutation({
  args: { id: v.id("authors") },
  handler: async (ctx, args) => {
    // Check if author has posts
    const postsWithAuthor = await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", args.id))
      .first();

    if (postsWithAuthor) {
      throw new Error("Cannot delete author who has posts. Please reassign posts first.");
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Get authors with post count
export const getWithPostCount = query({
  handler: async (ctx) => {
    const authors = await ctx.db.query("authors").collect();
    
    const authorsWithCount = await Promise.all(
      authors.map(async (author) => {
        const postCount = await ctx.db
          .query("posts")
          .withIndex("by_author", (q) => q.eq("authorId", author._id))
          .collect()
          .then(posts => posts.length);
        
        return {
          ...author,
          postCount,
        };
      })
    );

    return authorsWithCount;
  },
});

// Toggle author active status
export const toggleActive = mutation({
  args: { id: v.id("authors") },
  handler: async (ctx, args) => {
    const author = await ctx.db.get(args.id);
    if (!author) {
      throw new Error("Author not found");
    }

    await ctx.db.patch(args.id, {
      isActive: !author.isActive,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.id);
  },
});
