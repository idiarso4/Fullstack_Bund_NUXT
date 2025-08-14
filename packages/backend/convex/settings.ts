import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all settings
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("settings")
      .withIndex("by_key")
      .collect();
  },
});

// Get setting by key
export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
  },
});

// Get multiple settings by keys
export const getByKeys = query({
  args: { keys: v.array(v.string()) },
  handler: async (ctx, args) => {
    const settings = await Promise.all(
      args.keys.map(async (key) => {
        return await ctx.db
          .query("settings")
          .withIndex("by_key", (q) => q.eq("key", key))
          .first();
      })
    );

    // Convert to key-value object
    const settingsObject = {};
    settings.forEach((setting, index) => {
      if (setting) {
        settingsObject[args.keys[index]] = setting.value;
      }
    });

    return settingsObject;
  },
});

// Set or update setting
export const set = mutation({
  args: {
    key: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingSetting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    const now = Date.now();

    if (existingSetting) {
      // Update existing setting
      await ctx.db.patch(existingSetting._id, {
        value: args.value,
        description: args.description || existingSetting.description,
        updatedAt: now,
      });
      return await ctx.db.get(existingSetting._id);
    } else {
      // Create new setting
      const settingId = await ctx.db.insert("settings", {
        key: args.key,
        value: args.value,
        description: args.description,
        updatedAt: now,
      });
      return await ctx.db.get(settingId);
    }
  },
});

// Set multiple settings at once
export const setMultiple = mutation({
  args: {
    settings: v.array(v.object({
      key: v.string(),
      value: v.string(),
      description: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const results = [];
    
    for (const setting of args.settings) {
      const existingSetting = await ctx.db
        .query("settings")
        .withIndex("by_key", (q) => q.eq("key", setting.key))
        .first();

      const now = Date.now();

      if (existingSetting) {
        // Update existing setting
        await ctx.db.patch(existingSetting._id, {
          value: setting.value,
          description: setting.description || existingSetting.description,
          updatedAt: now,
        });
        results.push(await ctx.db.get(existingSetting._id));
      } else {
        // Create new setting
        const settingId = await ctx.db.insert("settings", {
          key: setting.key,
          value: setting.value,
          description: setting.description,
          updatedAt: now,
        });
        results.push(await ctx.db.get(settingId));
      }
    }

    return results;
  },
});

// Delete setting
export const remove = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (!setting) {
      throw new Error("Setting not found");
    }

    await ctx.db.delete(setting._id);
    return { success: true };
  },
});

// Initialize default blog settings
export const initializeDefaults = mutation({
  handler: async (ctx) => {
    const defaultSettings = [
      {
        key: "blog_title",
        value: "Blog Sistem Informasi Jaringan dan Aplikasi",
        description: "Judul utama blog"
      },
      {
        key: "blog_description",
        value: "Blog resmi jurusan Sistem Informasi Jaringan dan Aplikasi - berbagi pengetahuan teknologi, tutorial, dan berita terkini",
        description: "Deskripsi blog"
      },
      {
        key: "blog_logo",
        value: "",
        description: "URL logo blog"
      },
      {
        key: "posts_per_page",
        value: "10",
        description: "Jumlah post per halaman"
      },
      {
        key: "comments_enabled",
        value: "true",
        description: "Aktifkan sistem komentar"
      },
      {
        key: "comment_moderation",
        value: "true",
        description: "Moderasi komentar sebelum dipublikasi"
      },
      {
        key: "contact_email",
        value: "admin@sija.ac.id",
        description: "Email kontak"
      },
      {
        key: "social_facebook",
        value: "",
        description: "URL Facebook"
      },
      {
        key: "social_twitter",
        value: "",
        description: "URL Twitter"
      },
      {
        key: "social_instagram",
        value: "",
        description: "URL Instagram"
      },
      {
        key: "social_youtube",
        value: "",
        description: "URL YouTube"
      },
      {
        key: "footer_text",
        value: "© 2025 Sistem Informasi Jaringan dan Aplikasi. All rights reserved.",
        description: "Teks footer"
      }
    ];

    const results = [];
    
    for (const setting of defaultSettings) {
      // Check if setting already exists
      const existingSetting = await ctx.db
        .query("settings")
        .withIndex("by_key", (q) => q.eq("key", setting.key))
        .first();

      if (!existingSetting) {
        const settingId = await ctx.db.insert("settings", {
          ...setting,
          updatedAt: Date.now(),
        });
        results.push(await ctx.db.get(settingId));
      }
    }

    return results;
  },
});

// Get blog configuration (commonly used settings)
export const getBlogConfig = query({
  handler: async (ctx) => {
    const configKeys = [
      "blog_title",
      "blog_description", 
      "blog_logo",
      "posts_per_page",
      "comments_enabled",
      "comment_moderation",
      "contact_email",
      "social_facebook",
      "social_twitter",
      "social_instagram",
      "social_youtube",
      "footer_text"
    ];

    const settings = await Promise.all(
      configKeys.map(async (key) => {
        return await ctx.db
          .query("settings")
          .withIndex("by_key", (q) => q.eq("key", key))
          .first();
      })
    );

    // Convert to key-value object
    const config = {};
    settings.forEach((setting, index) => {
      if (setting) {
        config[configKeys[index]] = setting.value;
      }
    });

    return config;
  },
});
