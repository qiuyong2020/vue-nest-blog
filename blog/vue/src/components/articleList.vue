<script setup lang="ts">
const { cid } = defineProps<{
  cid?: any
}>()
const { all, pageResult } = useArticle()
//拿到第一页里指定栏目下的博客文章
await all(1, cid)
</script>

<template>
  <!-- 渲染单页文章列表 -->
  <HdAnimateList tag="div" :duration="2" :delay="0.1">
    <section v-for="(article, index) in pageResult?.data" :key="article.id" :data-index="index">
      <!-- 博客标题 -->
      <router-link :to="{ name: 'article.show', params: { id: article.id } }">
        {{ article.title }}
      </router-link>
      <!-- 文章所属栏目 -->
      <aside @click="$router.push({ name: 'category.index', params: { cid: article.categoryId } })">
        {{ article.category.title }}
      </aside>
    </section>
  </HdAnimateList>
  <!-- 分页 -->
  <div class="mt-5 border-t border-gray-100 pt-3">
    <el-pagination
      @current-change="all"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="pageResult?.meta.page_row"
      :total="pageResult?.meta.total"
      background>
    </el-pagination>
  </div>
</template>

<style lang="scss" scoped>
section {
  @apply mt-2 flex justify-between items-center;
  a {
    @apply bg-slate-100 text-gray-600 py-2 px-3 mb-2;
  }
  //文章栏目在移动端下隐藏
  aside {
    @apply text-xs p-2 text-gray-500 font-bold cursor-pointer hidden md:flex;
  }
}
</style>
