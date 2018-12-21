<template>
  <!-- 分页组件封装 -->
  <div
    :class="[positionClass, {'mt20': !noMT}]"
  >
    <!-- 只有上一页，下一页 -->
    <div v-if="pageSimple">
      <div class="text-right">
        <el-select style="width:120px;" size="small" v-model="pagination.pageSize" @change="simpleSizeChange">
          <el-option v-for="(item, index) in pagination.pageSizes" :key="index" :label="'每页'+item+'条'" :value="item"></el-option>
        </el-select>
        共{{ total }}条记录
        <span class="ml10" v-show="total>0">{{pagination.currentPage}} / {{total/pagination.pageSize | floor}}
          <el-button type="text" @click="pageChange(-1)" :disabled="pagination.currentPage === 1">上一页</el-button>
          <el-button type="text" @click="pageChange(1)" :disabled="pagination.currentPage * pagination.pageSize >= total">下一页</el-button>
        </span>
      </div>
    </div>
    <!-- 完整功能 -->
    <div v-else>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="currentChangeHandler"
        background
        border
        small
        :current-page="pagination.currentPage"
        :page-sizes='pagination.pageSizes'
        :page-size='pagination.pageSize'
        layout="total, sizes, prev, pager, next, jumper"
        :total='total'>
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
  const DEFAULT_PAGINATION = {
    pageSizes: [10, 20, 50, 100],
    pageSize: 10,
    currentPage: 1,
  };
  const jsonClone = val => JSON.parse(JSON.stringify(val));

  export default {
    name: 'McPagination',
    components: {},
    directives: {},
    filters: {
      floor: function(val) {
        return Math.ceil(val);
      }
    },
    mixins: [],
    model: {
      prop: 'setPagination',
      event: 'input'
    },
    props: {
      // 页码字段名
      indexLabel: {
        default: 'pageIndex',
        type: String,
      },
      // 分页大小字段名
      sizeLabel: {
        default: 'pageSize',
        type: String,
      },
      // 总页数，必须传入
      total: {
        type: Number,
        required: true,
      },
      // 是否是简易版分页
      pageSimple: {
        type: Boolean,
        default: false
      },
      // 分页器的位置
      position: {
        type: String,
        default: 'right',
      },

      // 是否在页面加载的时候发起一次获取列表请求
      immediate: {
        type: Boolean,
        default: false,
      },

      // 取消分页组件的上边距
      noMT: {},
      // 用户设置的初始化分页
      setPagination: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        // 用户列表分页信息
        pagination: jsonClone(DEFAULT_PAGINATION),
      };
    },
    computed: {
      // 分页请求参数
      params() {
        const pagination = this.pagination;
        const params = {
          [ this.indexLabel ]: pagination.currentPage,
          [ this.sizeLabel ]: pagination.pageSize,
        };

        return params;
      },
      // 表示分页器位置的类名
      positionClass() {
        return `pagination-${this.position}`;
      }
    },
    watch: {
      // 将分页数据传给父组件
      pagination: {
        handler(val) {
          const params = {
            [ this.indexLabel ]: val.currentPage,
            [ this.sizeLabel ]: val.pageSize,
          };
          this.$emit('input', params);
        },
        deep: true,
        immediate: true,
      },
      // 父组件修改，这里也要修改
      setPagination: {
        handler: function(val) {
          if (val && val.pageIndex) {
            this.pagination.currentPage = val.pageIndex;
          };
          if (val && val.pageSize) {
            this.pagination.pageSize = val.pageSize;
          }
        },
        deep: true,
        immediate: true
      }
    },
    created() {},
    mounted() {
      this.$nextTick(function() {
        if (this.immediate) {
          this.getData();
        }
      });
    },
    methods: {
      /**
       * 分页栏分页大小改变处理程序
       * @param  {Number} val 新的分页大小
       * @return {undefined}     暂时没有返回值
       */
      handleSizeChange(val) {
        const oldSize = this.pagination.pageSize;
        const oldIndex = this.pagination.currentPage;
        const oldMinRecordIndex = oldSize * (oldIndex - 1) + 1;
        const minIndex = (oldMinRecordIndex < this.total) ? oldMinRecordIndex : this.total;
        // 改变分页大小后的预期页码，此处应该根据实际业务逻辑做设置
        const newIndex = Math.ceil(minIndex / val);

        this.pagination.pageSize = val;

        // 分开写有助于后续在父组件对页码改变和分页大小挂不同的事件处理钩子
        if (newIndex === oldIndex) {
          this.getData();
        } else {
          this.currentChangeHandler(newIndex);
        }
      },
      /**
       * 分页栏当前页码改变处理程序
       * @param  {Number} val 改变后的页码值
       * @return {undefined}     暂时没有返回值
       */
      currentChangeHandler(val) {
        // console.log(val, 'currentChangeHandler ---');
        this.pagination.currentPage = val;
        this.getData();
      },
      getData() {
        this.$nextTick(function() {
          this.$emit('getData', this.params);
        });
      },
      /**
       * 重置分页组件
       */
      reset() {
        this.pagination = jsonClone(DEFAULT_PAGINATION);
      },
      // 分页更改(简易版)
      pageChange(page) {
        this.pagination.currentPage += page;
        this.currentChangeHandler(this.pagination.currentPage);
      },
      // 每页条数更改（简易版）
      simpleSizeChange(val) {
        this.pagination.pageSize = val;
        this.currentChangeHandler(1);
      }
  
    },
  };
</script>

<style lang="scss" scoped>
  // 配置文本居中模式
  $position: "right", "left", "center";  //注意数组list的写法
  @each $p in $position {
      .pagination-#{$p} {
          text-align: #{$p};
      }
  }

  .mt20 {
    margin-top: 20px;
  }
</style>