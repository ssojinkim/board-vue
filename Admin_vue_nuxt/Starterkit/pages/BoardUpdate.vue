<script>
import { getBoardDetail, updateInquiry } from "../api/board";
export default {
  data() {
    return {
      seq: null,
      title: null,
      content: null,
      secret_yn: null,
    }
  },
  // computed: {
  //   name() {
  //     return !!(this.seq && this.title && this.content)
  //   }
  // },
  async mounted() {
    this.seq = this.$route.query.seq;
    await getBoardDetail(this.seq)
      .then(res => {
        // console.log(res.data.list.detail);
        this.title = res.data.list.detail.TITLE;
        this.secret_yn = res.data.list.detail.SECRET_YN === 'Y' ? true : false;
        this.content = res.data.list.detail.CONTENT;
      })
  },
  methods: {
    onSubmit() {
      const params = {
        seq: this.seq,
        title: this.title,
        content: this.content,
        secret_yn: this.secret_yn ? 'Y' : 'N'
      }
      updateInquiry(params)
        .then(res => {
          if (res.data.code === 200) {
            this.$router.push(`/BoardDetail?seq=${this.seq}`);
          } else {
            alert('수정 중 오류가 발생했습니다.');
          }
        })
        .catch(err => {
          console.error(err);
          alert('수정 중 오류가 발생했습니다.');
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
    <b-button @click="onSubmit" variant="primary">수정</b-button>
  </div>
</template>
