<!-- ckeditor-nuxt usage -->
<template>
  <client-only placeholder="loading...">
    <ckeditor-nuxt v-model="contentHolder" :config="editorConfig"  />
  </client-only>
</template>

<script>
export default {
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  data() {
    return {
      editorConfig: {
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: 'http://api-imate.wtest.biz/api/imageUpload/imageUpload.php?cate_id=borad',
        }
      },
      contentHolder: ""
    }
  }
}
</script>
