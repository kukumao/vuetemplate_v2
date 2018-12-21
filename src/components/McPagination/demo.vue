<template>
  <mc-pagination v-model="pagination" :immediate="true" :total="total" @getData="getTableListHandler"></mc-pagination>
</template>

<script>
  export default {
    components: {},
    mixins: [],
    data() {
      return {
        // 数据总条数
        total: 0,
        // 请求列表数据的请求参数
        params: {},
        // 将分页数据传递给父组件
        pagination: {},
      };
    },
    methods: {
      // /** 修改按钮操作程序 */
      getTableListHandler(form) {
        const params = { ...this.params, ...form };

        // 假代码
        const api = () => {};
        api.getData(params).then(res => {
          if (res.data.code === 0) {
            // 必须对total进行赋值，否则无法正常分页
            this.total = res.data.data.total;
            // 其他操作
          }
        });
      },
    }
  };
</script>

<style >

</style>
