<script>
import { getBoardDetail, deleteInquiry } from "../api/board";

export default {
  data() {
    return {
      item: {},
    }
  },
  async mounted() {
    const seq = this.$route.query.seq;
    await getBoardDetail(seq)
      .then(res => {
        // console.log(res.data.list.detail);
        this.item = res.data.list.detail;
      })
  },
  methods: {
    deleteItem() {
      deleteInquiry(this.$route.query.seq)
        .then(res => {
          if (res.data.code === 200) {
            this.$router.push(`/Board`);
          } else {
            alert('삭제 중 오류가 발생했습니다.')
          }
        })
        .catch(err => {
          console.error(err);
          alert('삭제 중 오류가 발생했습니다.')
        })
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ item.TITLE }}</h1>
    <div class="inquiryInfo">
      <div>작성자: {{ item.CREATED_BY }}</div>
      <div>날짜: {{ item.CREATED_AT }}</div>
      <div>상태 {{ item.ANSWER_YN }}</div>
    </div>
    <div class="inquiryContent">
      <pre>{{ item.CONTENT }}</pre>
      <div v-if="item.ANSWER_YN === 'Y'">{{ item.ANSWER }} </div>
      <div v-else>관리자가 답변을 준비중입니다.</div>
    </div>
    <b-button @click="$router.push(`/BoardUpdate?seq=${item.SEQ}`)" variant="primary">수정</b-button>
    <b-button @click="deleteItem" variant="danger">삭제</b-button>
    <b-button @click="$router.push('/Board')">목록</b-button>
  </div>
</template>

<style>
  .inquiryInfo {
    display: flex;
    gap: 2rem;
  }

  .inquiryContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin: 3rem 0;
  }
 </style>
