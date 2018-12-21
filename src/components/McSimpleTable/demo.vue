<template>
  <!-- 成长值规则列表 -->
  <div>
    <mc-simple-table
      :tableColumns="tableColumns"
      :queryItems="queryItems"
      :data="tableData"
      :total="total"
      v-model="params"
      @getList="getList"
    >
      <!-- 其他按钮 -->
      <div slot="tableTop" class="gc-mb20 gc-text-right">
        <el-button @click="addExchangePointRuleHandler">新建积分兑换</el-button>
        <el-button @click="addExchangedProductHandler">新建兑换商品</el-button>
      </div>

        <!-- 是否全额兑换 -->
        <template slot-scope="scope" slot="type">
          <span>{{ scope.row.type | type }}</span>
        </template>

        <!-- 状态 -->
        <template slot-scope="scope" slot="enable">
          <span>{{ scope.row.enable | enable }}</span>
        </template>

        <!-- 操作列 -->
        <template slot-scope="scope" slot="operation">
          <el-button type="text" @click="editHandler(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="deleteHandler(scope.row.id)">删除</el-button>
        </template>
    </mc-simple-table>
  </div>
</template>

<script>
  import McSimpleTable from '@/components/McSimpleTable';
  import { memberService } from '@/api';

  export default {
    name: 'McSimpleTableDemo',
    components: { McSimpleTable },
    directives: {},
    filters: {
      enable(val) {
        return val ? '启用' : '停用';
      },
      type(val) {
        const mapList = ['加价兑换', '全额兑换'];
        return mapList[val];
      },
    },
    mixins: [],
    props: {},
    data() {
      return {
        // 列表配置
        tableColumns: [
          {
            type: 'index',
            label: '序号',
            align: 'center',
            width: '45px',
          },
          {
            prop: 'channelName',
            label: '渠道名称',
            width: '100px',
            align: 'center'
          },
          {
            prop: 'productName',
            label: '商品名称',
            minWidth: '200px',
            align: 'center'
          },
          {
            prop: 'productCode',
            label: '商品编码',
            align: 'center',
            width: '120px',
          },
          {
            prop: 'num',
            label: '可兑换总量',
            width: '110px',
            align: 'center'
          },
          {
            prop: 'type',
            label: '兑换类型',
            width: '110px',
            align: 'center'
          },
          {
            prop: 'point',
            label: '消耗积分',
            width: '110px',
            align: 'center'
          },
          {
            prop: 'additionalPrice',
            label: '需加价',
            align: 'center',
            width: '120px',
          },
          {
            prop: 'enable',
            label: '状态',
            width: '80px',
            align: 'center'
          },
          {
            prop: 'operation',
            label: '操作',
            align: 'center',
            width: '150px',
            fixed: 'right',
          },
        ],
        // 搜索条件配置
        queryItems: [
          {
            type: 'el-select',
            prop: 'channelId',
            label: '渠道名称',
            placeholder: '请选择渠道名称',
            options: [],
          },
          {
            type: 'el-select',
            prop: 'type',
            label: '兑换类型',
            placeholder: '请选择兑换类型',
            options: [
              { value: 0, label: '加价兑换' },
              { value: 1, label: '全额兑换' },
            ],
          },
          {
            type: 'el-select',
            prop: 'enable',
            label: '状态',
            labelWidth: '50px',
            placeholder: '请选择状态',
            options: [
              { value: true, label: '启用' },
              { value: false, label: '停用' },
            ],
          },
        ],
        // 列表搜索条件
        params: {},
        tableData: [],
        total: 0,
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
        this.channelListGet();
        this.getList(this.params);
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      getList() {
        memberService.mallExchangeRuleList(this.params).then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          }
        });
      },
      // 获取渠道列表
      channelListGet() {
        memberService.channelListGet().then(res => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.queryItems[0].options = list.map((item) => ({
              label: item.name,
              value: item.id,
            }));
          }
        });
      },
      // 删除按钮处理程序
      deleteHandler(id) {
        this.$confirm('确定将该条记录删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = { id };
          memberService.mallExchangeRuleDelete(data).then(res => {
            if (res.data.code === 0) {
              this.$message.success('规则删除成功！');
              this.getList(this.params);
            }
          });
        }).catch(() => {
          this.$message.info('已取消删除！');
        });
      },
      // 编辑按钮处理程序
      editHandler(id) {
        this.$router.push({ name: 'exchangedMgr', params: { id } });
      },

      // 新建兑换商品 按钮处理程序
      addExchangedProductHandler() {
        this.$router.push({ name: 'exchangedProductMgr' });
      },
      // 新建积分兑换 按钮处理程序
      addExchangePointRuleHandler() {
        this.$router.push({ name: 'exchangedMgr' });
      },
    },
  };
</script>

<style scoped>
  
</style>