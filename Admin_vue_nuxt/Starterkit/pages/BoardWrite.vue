<script>
import { postInquiry } from "../api/board";
// import UploadAdapter from "../UploadAdapter";

export default {
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  data() {
    return {
      title: null,
      content: null,
      secret_yn: null,
      editorConfig: {
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: 'http://192.168.1.43/api/imageUpload/imageUpload.php',
        }
      },
      contentHolder: "",
    }
  },
  methods: {
    onSubmit() {
      if (!this.title || !this.content) {
        alert("제목과 내용을 입력해주세요.")
      } else {
        const params = {
          title: this.title,
          content: this.content,
          secret_yn: this.secret_yn ? 'Y' : 'N'
        }
        postInquiry(params)
          .then(res => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$router.push('/Board');
            } else {
              alert('등록 중 오류가 발생했습니다.');
            }
          })
          .catch(err => {
            console.error(err);
            alert('등록 중 오류가 발생했습니다.');
          })
      }
    },
  }
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">이용 문의하기</h4>
          <div class="container mt-4">
            <div class="row align-items-center">
              <div class="col-10">
                <input
                  type="text"
                  id="title"
                  v-model="title"
                  placeholder="제목을 입력해주세요"
                  class="form-control"
                >
                <label for="title" class="visually-hidden">Title</label>
              </div>
              <div class="col-2">
                <input
                  type="checkbox"
                  id="secret_yn"
                  v-model="secret_yn"
                  class="form-check-input"
                >
                <label for="secret_yn" class="form-check-label">비밀글로 작성</label>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col">
                <ckeditor-nuxt v-model="content" :config="editorConfig" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="float-end mt-3">
                  <b-button @click="onSubmit" variant="primary">등록</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
