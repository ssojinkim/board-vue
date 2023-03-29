<script>
import { postInquiry } from "../api/board";

export default {
  data() {
    return {
      title: null,
      content: null,
      secret_yn: null,
      alert: null,
    }
  },
  methods: {
    onSubmit() {
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
  }
}
</script>

<template>
  <div>
    <h1>이용 문의하기</h1>
    <div class="d-flex">
      <input
        type="text"
        v-model="title"
        placeholder="제목을 입력해주세요"
        class="flex-grow-1"
      >
      <div>
        <input
          type="checkbox"
          id="secret_yn"
          v-model="secret_yn"
        >
        <label for="secret_yn">비밀글로 작성</label>
      </div>
    </div>
    <textarea
      style="width: 100%; min-height: 500px"
      type="text"
      v-model="content"
    ></textarea>
    <b-button @click="onSubmit" variant="primary">등록</b-button>
  </div>
</template>
