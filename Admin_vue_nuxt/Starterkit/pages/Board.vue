<script>
import { getBoard } from "../api/board";

export default {
  data() {
    return {
      fields: [
        { key: 'SEQ', label: '번호' },
        { key: 'TITLE', label: '제목' },
        { key: 'CREATED_BY', label: '작성자' },
        { key: 'CREATED_AT', label: '날짜' },
        { key: 'ANSWER_YN', label: '상태' },
      ],
      items: [],
      perPage: 15,
      currentPage: 1,
      pageOptions: [10, 25, 50, 100],
    }
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  async mounted() {
    await getBoard()
      .then(res => {
        this.items = res.data.list;
        console.log(this.items);
      })
      .catch(err =>{
        console.error(err);
      })
  },
  methods: {
    clickEventHandler(item) {
      const seq = item.SEQ;
      this.$router.push(`/BoardDetail?seq=${seq}`)
    }
  },
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">이용상담</h4>
          <div class="table-responsive mb-0 ">
            <div class="table-responsive-sm mt-4">
              <b-table
                :items="items"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                @row-clicked="clickEventHandler"
              >
                <template v-slot:cell(ANSWER_YN)="{ item }">
                  <span class="badge rounded-pill bg-primary ml-1" v-if="item.ANSWER_YN === 'Y'">답변 완료</span>
                  <span class="badge rounded-pill bg-light ml-1" v-else>답변대기중</span>
                </template>
              </b-table>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="float-end mb-3">
                <b-button @click="$router.push('/BoardWrite')" variant="primary">글쓰기</b-button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-end">
                <ul class="pagination pagination-rounded mb-0">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                  ></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
