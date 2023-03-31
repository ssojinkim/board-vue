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
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">{{ item.TITLE }}</h4>
          <div class="row">
            <div class="col-md-auto">작성자: {{ item.CREATED_BY }}</div>
            <div class="col-md-auto">날짜: {{ item.CREATED_AT }}</div>
            <div class="col-md-auto d-flex align-items-center">상태
              <span class="badge rounded-pill bg-primary ml-1" v-if="item.ANSWER_YN === 'Y'">답변 완료</span>
              <span class="badge rounded-pill bg-light ml-1" v-else>답변대기중</span>
            </div>
          </div>
          <div class="row border-top mt-5">
              <div class="text-center pt-5" v-html="item.CONTENT"></div>
          </div>
          <div class="row border-top border-bottom mt-5">
            <div v-if="item.ANSWER_YN === 'Y'" class="text-center pt-5 pb-5">{{ item.ANSWER }} </div>
            <div v-else class="text-center pt-5 pb-5">관리자가 답변을 준비중입니다.</div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <b-button @click="$router.push(`/BoardUpdate?seq=${item.SEQ}`)" variant="primary">수정</b-button>
              <b-button @click="deleteItem" variant="dark">삭제</b-button>
              <div class="float-end">
                <b-button @click="$router.push('/Board')" variant="light">목록</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
figure.image img { max-width: 70%; }
</style>
