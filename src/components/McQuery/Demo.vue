<template>
  <div>
    <mc-query ref="test1" v-model="query1" v-bind="queryConfig1"></mc-query>
    <mc-query ref="test2" v-model="query1" v-bind="queryConfig2"></mc-query>
  </div>
</template>

<script>
  import McQuery from '@/components/McQuery';
  export default {
    name: 'Demo',
    components: { McQuery },
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        query1: {},
        query2: {},
        queryConfig1: {
          items: [
            {
              type: 'el-input',
              prop: 'xxx1',
              width: '200px',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            }
          ],
        },
        queryConfig2: {
          showButton: false,
          labelWidth: '50px',
          labelPosition: 'left',
          items: [
            {
              type: 'el-input',
              prop: 'xxx1',
              width: '200px',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              prop: 'xxx2',
              width: '200px',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              width: '200px',
              prop: 'xxx3',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              prop: 'xxx',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              prop: 'xxx',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              prop: 'xxx',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'date-range',
              labelWidth: '80px',
              // width: '600px',
              prop: ['aaaa', 'bbbbb'],
              label: '时间范围',
              aaaa: {
                placeholder: 'aaaa',
              },
              bbbbb: {
                placeholder: 'bbbbb',
              },
            },
            // 单个时间选择器
            {
              type: 'el-date-picker',
              prop: 'brand',
              // 时间选择器的type，避免和搜索项的属性名冲突
              dateType: 'datetime',
              label: '领取时间',
              defaultTime: '00:00:00',
              placeholder: '请选择领取时间',
            },
            {
              type: 'el-input',
              prop: 'xxx',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              prop: 'xxx',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
            {
              type: 'el-input',
              prop: 'xxx',
              placeholder: 'xxxxxxx',
              label: 'aaa',
            },
          ],
        },
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
    },
  };
</script>

<style scoped>
  
</style>