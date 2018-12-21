<template>
  <mc-table :listConfig="listConfig" :data="data">
    <!-- 需要特殊处理的使用这种模式处理 -->
    <!-- slot可以是配置项中的name，或者默认使用prop字段 -->
    <template slot-scope="scope" slot="aaa">
        {{ scope.row.xxxx }}
    </template>
    <template slot-scope="scope" slot="aa2a">
        {{ scope.row.xxxx }}
    </template>
  </mc-table>
</template>

<script>
  import McTable from '@/components/McTable';
  export default {
    components: { McTable },
    mixins: [],
    data() {
      return {
        // 配置列
        columns: [
          {
            type: 'selection',
            width: 50,
          },
          {
            prop: 'xxxx',
            label: 'ceshi',
            sortable: true,
            showOverflowTooltip: false,
            width: 50,
          },
          {
            prop: 'aaa',
            label: 'ceshi1',
            minWidth: 20
          },
          {
            prop: 'aa2a',
            label: 'ceshi1',
            minWidth: 20
          },
        ],
        // 数据源
        data: [
          {
            xxxx: 'xxx2x',
            aaa: 'ceshi',
          },
          {
            xxxx: 'xxxx',
            aaa: 'cesh2i',
          },
          {
            xxxx: 'xx2xx',
            aaa: 'ces2hi',
          },
          {
            xxxx: 'xxxx',
            aaa: 'ces2hi',
          },
        ],
      };
    },
    methods: {
    }
  };
</script>

<style >

</style>
