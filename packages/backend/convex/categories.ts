import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all categories
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("categories")
      .order("desc")
      .collect();
  },
});

// Get category by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get category by ID
export const getById = query({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create new category
export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slug already exists
    const existingCategory = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existingCategory) {
      throw new Error("Category with this slug already exists");
    }

    const now = Date.now();
    const categoryId = await ctx.db.insert("categories", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      color: args.color,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(categoryId);
  },
});

// Update category
export const update = mutation({
  args: {
    id: v.id("categories"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // If slug is being updated, check if it already exists
    if (updates.slug) {
      const existingCategory = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", updates.slug))
        .first();

      if (existingCategory && existingCategory._id !== id) {
        throw new Error("Category with this slug already exists");
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

// Delete category
export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    // Check if category has posts
    const postsWithCategory = await ctx.db
      .query("posts")
      .withIndex("by_category", (q) => q.eq("categoryId", args.id))
      .first();

    if (postsWithCategory) {
      throw new Error("Cannot delete category that has posts. Please reassign posts first.");
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Get categories with post count
export const getWithPostCount = query({
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const postCount = await ctx.db
          .query("posts")
          .withIndex("by_category", (q) => q.eq("categoryId", category._id))
          .collect()
          .then(posts => posts.length);
        
        return {
          ...category,
          postCount,
        };
      })
    );

    return categoriesWithCount;
  },
});
