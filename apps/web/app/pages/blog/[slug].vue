<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useConvexQuery, useConvexMutation } from "convex-vue";

// Get route params
const route = useRoute()
const slug = route.params.slug as string

// Queries
const { data: post, isPending: isLoadingPost } = useConvexQuery(
  api.posts.getBySlug, 
  { slug }
)
const { data: comments, isPending: isLoadingComments } = useConvexQuery(
  api.comments.getByPost,
  post ? { postId: post._id, status: "approved" } : "skip"
)
const { data: relatedPosts } = useConvexQuery(
  api.posts.getByCategory,
  post ? { categoryId: post.categoryId, limit: 3 } : "skip"
)

// Mutations
const { mutate: incrementViewCount } = useConvexMutation(api.posts.incrementViewCount)
const { mutate: createComment, isPending: isSubmittingComment } = useConvexMutation(api.comments.create)

// Comment form state
const commentForm = ref({
  authorName: '',
  authorEmail: '',
  content: '',
  parentId: null as string | null
})
const showCommentForm = ref(false)
const replyingTo = ref<any>(null)

// Meta tags
watchEffect(() => {
  if (post) {
    useHead({
      title: `${post.title} - Blog SIJA`,
      meta: [
        { name: 'description', content: post.excerpt || post.content.substring(0, 160) },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.excerpt || post.content.substring(0, 160) },
        { property: 'og:image', content: post.featuredImage || '' },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ]
    })
  }
})

// Functions
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatContent(content: string) {
  // Simple markdown-like formatting
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

async function submitComment() {
  if (!post || !commentForm.value.authorName || !commentForm.value.authorEmail || !commentForm.value.content) {
    return
  }

  try {
    await createComment({
      postId: post._id,
      authorName: commentForm.value.authorName,
      authorEmail: commentForm.value.authorEmail,
      content: commentForm.value.content,
      parentId: commentForm.value.parentId
    })

    // Reset form
    commentForm.value = {
      authorName: '',
      authorEmail: '',
      content: '',
      parentId: null
    }
    showCommentForm.value = false
    replyingTo.value = null

    // Show success message
    // You can add a toast notification here
  } catch (error) {
    console.error('Error submitting comment:', error)
    // Show error message
  }
}

function replyToComment(comment: any) {
  replyingTo.value = comment
  commentForm.value.parentId = comment._id
  showCommentForm.value = true
}

function cancelReply() {
  replyingTo.value = null
  commentForm.value.parentId = null
  showCommentForm.value = false
}

// Increment view count when post loads
onMounted(() => {
  if (post) {
    incrementViewCount({ id: post._id })
  }
})

// 404 handling
if (!isLoadingPost && !post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Artikel tidak ditemukan'
  })
}
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <!-- Loading State -->
    <div v-if="isLoadingPost" class="space-y-6">
      <USkeleton class="h-8 w-3/4" />
      <USkeleton class="h-4 w-1/2" />
      <USkeleton class="h-64 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-3/4" />
    </div>

    <!-- Article Content -->
    <article v-else-if="post" class="prose prose-lg dark:prose-invert max-w-none">
      <!-- Breadcrumb -->
      <nav class="not-prose mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-500">
          <li><NuxtLink to="/blog" class="hover:text-primary-600">Blog</NuxtLink></li>
          <li><Icon name="i-lucide-chevron-right" class="w-4 h-4" /></li>
          <li><NuxtLink :to="`/blog/category/${post.category?.slug}`" class="hover:text-primary-600">{{ post.category?.name }}</NuxtLink></li>
          <li><Icon name="i-lucide-chevron-right" class="w-4 h-4" /></li>
          <li class="text-gray-900 dark:text-white truncate">{{ post.title }}</li>
        </ol>
      </nav>

      <!-- Article Header -->
      <header class="not-prose mb-8">
        <!-- Category Badge -->
        <div class="mb-4">
          <UBadge
            :label="post.category?.name"
            :color="post.category?.color || 'primary'"
            variant="subtle"
          />
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ post.title }}
        </h1>

        <!-- Meta Info -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
          <div class="flex items-center">
            <Icon name="i-lucide-user" class="w-4 h-4 mr-2" />
            <span>{{ post.author?.name }}</span>
          </div>
          <div class="flex items-center">
            <Icon name="i-lucide-calendar" class="w-4 h-4 mr-2" />
            <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
          </div>
          <div class="flex items-center">
            <Icon name="i-lucide-eye" class="w-4 h-4 mr-2" />
            <span>{{ post.viewCount }} views</span>
          </div>
        </div>

        <!-- Featured Image -->
        <div v-if="post.featuredImage" class="mb-8">
          <img
            :src="post.featuredImage"
            :alt="post.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        <!-- Excerpt -->
        <div v-if="post.excerpt" class="text-xl text-gray-600 dark:text-gray-300 mb-8 not-prose">
          {{ post.excerpt }}
        </div>
      </header>

      <!-- Article Content -->
      <div class="prose-content" v-html="formatContent(post.content)"></div>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="not-prose mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags:</h3>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            variant="outline"
          />
        </div>
      </div>

      <!-- Author Info -->
      <div class="not-prose mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-start space-x-4">
          <div v-if="post.author?.avatar" class="flex-shrink-0">
            <img
              :src="post.author.avatar"
              :alt="post.author.name"
              class="w-16 h-16 rounded-full"
            />
          </div>
          <div v-else class="flex-shrink-0">
            <div class="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <Icon name="i-lucide-user" class="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ post.author?.name }}</h3>
            <p v-if="post.author?.bio" class="text-gray-600 dark:text-gray-300 mt-1">{{ post.author.bio }}</p>
          </div>
        </div>
      </div>
    </article>

    <!-- Comments Section -->
    <section v-if="post" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Komentar ({{ comments?.length || 0 }})
        </h2>
        <UButton
          @click="showCommentForm = !showCommentForm"
          variant="outline"
          icon="i-lucide-message-circle"
        >
          Tulis Komentar
        </UButton>
      </div>

      <!-- Comment Form -->
      <UCard v-if="showCommentForm" class="mb-8">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ replyingTo ? `Balas komentar ${replyingTo.authorName}` : 'Tulis Komentar' }}
            </h3>
            <UButton
              @click="cancelReply"
              variant="ghost"
              icon="i-lucide-x"
              size="sm"
            />
          </div>
        </template>

        <form @submit.prevent="submitComment" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Nama" required>
              <UInput
                v-model="commentForm.authorName"
                placeholder="Nama Anda"
                required
              />
            </UFormGroup>
            <UFormGroup label="Email" required>
              <UInput
                v-model="commentForm.authorEmail"
                type="email"
                placeholder="email@example.com"
                required
              />
            </UFormGroup>
          </div>
          <UFormGroup label="Komentar" required>
            <UTextarea
              v-model="commentForm.content"
              placeholder="Tulis komentar Anda..."
              rows="4"
              required
            />
          </UFormGroup>
          <div class="flex justify-end space-x-3">
            <UButton
              @click="cancelReply"
              variant="ghost"
              type="button"
            >
              Batal
            </UButton>
            <UButton
              type="submit"
              :loading="isSubmittingComment"
              icon="i-lucide-send"
            >
              Kirim Komentar
            </UButton>
          </div>
        </form>
      </UCard>

      <!-- Comments List -->
      <div v-if="isLoadingComments" class="space-y-4">
        <USkeleton v-for="i in 3" :key="i" class="h-24 w-full" />
      </div>

      <div v-else-if="comments?.length" class="space-y-6">
        <div
          v-for="comment in comments"
          :key="comment._id"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
        >
          <!-- Comment Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <Icon name="i-lucide-user" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ comment.authorName }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(comment.createdAt) }}</p>
              </div>
            </div>
            <UButton
              @click="replyToComment(comment)"
              variant="ghost"
              size="sm"
              icon="i-lucide-reply"
            >
              Balas
            </UButton>
          </div>

          <!-- Comment Content -->
          <div class="text-gray-700 dark:text-gray-300 mb-4">
            {{ comment.content }}
          </div>

          <!-- Replies -->
          <div v-if="comment.replies?.length" class="ml-6 space-y-4 border-l-2 border-gray-200 dark:border-gray-600 pl-6">
            <div
              v-for="reply in comment.replies"
              :key="reply._id"
              class="bg-white dark:bg-gray-700 rounded-lg p-4"
            >
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Icon name="i-lucide-user" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h5 class="font-medium text-gray-900 dark:text-white">{{ reply.authorName }}</h5>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(reply.createdAt) }}</p>
                </div>
              </div>
              <div class="text-gray-700 dark:text-gray-300">
                {{ reply.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <Icon name="i-lucide-message-circle" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p class="text-gray-500 dark:text-gray-400">Belum ada komentar. Jadilah yang pertama!</p>
      </div>
    </section>

    <!-- Related Posts -->
    <section v-if="relatedPosts?.posts?.length" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Artikel Terkait</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard
          v-for="relatedPost in relatedPosts.posts.filter(p => p._id !== post._id).slice(0, 3)"
          :key="relatedPost._id"
          class="hover:shadow-lg transition-shadow duration-300"
        >
          <div v-if="relatedPost.featuredImage" class="mb-4">
            <img
              :src="relatedPost.featuredImage"
              :alt="relatedPost.title"
              class="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <h3 class="font-semibold mb-2 line-clamp-2">
            <NuxtLink
              :to="`/blog/${relatedPost.slug}`"
              class="hover:text-primary-600 transition-colors"
            >
              {{ relatedPost.title }}
            </NuxtLink>
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(relatedPost.publishedAt || relatedPost.createdAt) }}
          </p>
        </UCard>
      </div>
    </section>
  </div>
</template>

<style scoped>
.prose-content {
  color: rgb(55 65 81);
  line-height: 1.625;
}

.dark .prose-content {
  color: rgb(209 213 219);
}

.prose-content p {
  margin-bottom: 1rem;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
