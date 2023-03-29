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
        // console.log(this.items);
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
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="clickEventHandler"
    ></b-table>
    <b-button @click="$router.push('/BoardWrite')" variant="primary">글쓰기</b-button>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>
