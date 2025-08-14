import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),

  // Blog Categories
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  // Blog Authors/Users
  authors: defineTable({
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("author"), v.literal("user")),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  // Blog Posts
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    authorId: v.id("authors"),
    categoryId: v.id("categories"),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    tags: v.array(v.string()),
    viewCount: v.number(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_author", ["authorId"])
    .index("by_category", ["categoryId"])
    .index("by_status", ["status"])
    .index("by_published_date", ["publishedAt"]),

  // Comments
  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.optional(v.id("authors")),
    authorName: v.string(),
    authorEmail: v.string(),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_status", ["status"])
    .index("by_parent", ["parentId"]),

  // Blog Settings
  settings: defineTable({
    key: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
