<template>
  <div>
    <div class="gc-query-header">
      <query-bar
        :labelWidth='120'
        :query-list='queryList'
        @query='query'
        @reset='reset'
      ></query-bar>
    </div>
    <!-- 表格数据 -->
    <div class="gc-mt20">
      <el-table
        :data="searchResult.list"
        stripe
        size="small"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          align="center"
          width="50"
          type="index"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          min-width="100"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          min-width="100"
          prop="mobile"
        >
        </el-table-column>
        <el-table-column
          label="等级"
          align="center"
          min-width="100"
          prop="levelName"
        >
        </el-table-column>
        <el-table-column
          label="获取时间"
          align="center"
          min-width="160"
          prop="createTime"
        >
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="失效时间"
          align="center"
          min-width="160"
          prop="lostTime"
        >
          <template slot-scope="scope">
            {{scope.row.lostTime | formatTime}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页数据 -->
    <div>
      <mc-pagination
        ref="pagination"
        v-model="pagination"
        :page-simple="true"
        :total="searchResult.total"
        @getData="getList"
      ></mc-pagination>
    </div>
  </div>
</template>

<script>
import { activityCenter } from '@/api';
export default {
  name: 'GrowList',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {
      queryList: [
        {
          key: 'name',
          label: '姓名',
          queryType: 'input'
        },
        {
          key: 'mobile',
          label: '手机号',
          queryType: 'input'
        }
      ],
      // 搜索数据
      searchForm: {},
      // 分页数据
      pagination: {
        pageIndex: 1,
        pageSize: 10
      },
      searchResult: {
        list: [],
        total: 0
      }
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.$nextTick(function() {
      console.log(activityCenter);
      // this.getList();
    });
  },
  methods: {
    // 序号
    indexMethod(index) {
      return (
        index + 1 + this.pagination.pageSize * (this.pagination.pageIndex - 1)
      );
    },
    // 搜索
    query(val) {
      this.pagination.pageIndex = 1;
      this.searchForm = val;
      this.getList();
    },
    // 重置
    reset() {
      this.pagination.pageIndex = 1;
      this.searchForm = {};
      this.getList();
    },
    // 获取表格数据
    getList() {
      let pm = JSON.parse(JSON.stringify(this.searchForm));
      Object.assign(pm, this.pagination);
      activityCenter.getSignActivityList(pm).then(res => {
        if (res.code === 0) {
          this.searchResult.list = res.data.list;
          this.searchResult.total = res.data.total || 0;
        } else {
          this.$message.error(res.msg || '获取数据失败');
        }
      });
    }
  }
};
</script>

<style scoped>
.gc-query-header {
  /* border: 1px solid #e5e5e5; */
  background: #fff;
  border-radius: 3px;
  padding: 15px 15px 5px 15px;
}
</style>