<template>
  <!-- 集成搜索以及分页的简单表单组件 -->
  <!-- 使用card -->
  <div v-if="card">
    <el-card class="gc-mb20" v-if="queryItems">
      <!-- 搜索表单 -->
        <!-- labelWidth="85px" -->
      <mc-query
        ref="query"
        :items="queryItems"
        v-bind="queryConfig"
        v-model="query"
        @query="queryHandler"
        @reset="queryHandler"
      ></mc-query>
    </el-card>

    <el-card>
      <!-- 在表格上方的插槽 -->
      <slot name="tableTop"></slot>

      <!-- 对表格进行简单封装 -->
      <el-table
        ref="table"
        class="gc-wp100"
        v-bind="$attrs"
        v-on="$listeners"
        :stripe="stripe"
        :border="border"
      >
        <template v-for="(item, index) in tableColumns">
          <el-table-column
            :key="index"
            v-if="item.type"
            v-bind="item"
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
          >
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            v-bind="item"
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
          >
            <template slot-scope="scope">
              <slot :name="item.name || item.prop" v-bind="scope">{{ scope.row[item.prop]}}</slot>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <!-- 分页数据 -->
      <mc-pagination
        ref="pagination"
        v-if="isPagination"
        v-model="pagination"
        :total="total"
        @getData="getTableListHandler"
      ></mc-pagination>
    </el-card>
  </div>

  <!-- 不使用card -->
  <div v-else>
    <!-- 搜索表单 -->
    <mc-query
      ref="query"
      class="gc-mb20"
      v-if="queryItems"
      :items="queryItems"
      v-model="query"
      @query="queryHandler"
      @reset="queryHandler"
    ></mc-query>

      <!-- 在表格上方的插槽 -->
      <slot name="tableTop"></slot>

      <!-- 对表格进行简单封装 -->
      <el-table
        ref="table"
        class="gc-wp100"
        v-bind="$attrs"
        v-on="$listeners"
        :stripe="stripe"
        :border="border"
      >
        <template v-for="(item, index) in tableColumns">
          <el-table-column
            :key="index"
            v-if="item.type"
            v-bind="item"
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
          >
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            v-bind="item"
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
          >
            <template slot-scope="scope">
              <slot :name="item.name || item.prop" v-bind="scope">{{ scope.row[item.prop]}}</slot>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <!-- 分页数据 -->
      <mc-pagination
        ref="pagination"
        v-if="isPagination"
        v-model="pagination"
        :total="total"
        @getData="getTableListHandler"
      ></mc-pagination>
  </div>
</template>

<script>
  const jsonClone = val => JSON.parse(JSON.stringify(val));

  export default {
    name: 'McSimpleTable',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    // 没有在props中定义的属性均会绑定到列表组件
    props: {

      // 是否使用卡片
      card: {
        default: true,
      },

      // 列表配置
      tableColumns: {
        required: true,
        type: Array,
      },

      // 搜索组件的其他配置
      queryConfig: {},

      // 是否使用分页组件
      isPagination: {
        default: true,
      },

      // 搜索组件配置，如果不传则没有搜索组件
      queryItems: {
        type: Array,
      },

      // 其他固定的搜索条件，例如带 id 的列表请求
      fixedParams: {
        type: Object,
      },

      // 传给分页组件的列表总条数
      total: {
        default: 0,
      },

      // 下方为绑定到列表组件的属性
      // 将默认值修改为true
      stripe: {
        type: Boolean,
        default: true,
      },

      // 将默认值修改为true
      border: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        /** ------------------------- 搜索 ---------------------- */
        query: {},
        /** ------------------------- 搜索 ---------------------- */
        /** ------------------------- 分页 ---------------------- */
        pagination: {},
        /** ------------------------- 分页 ---------------------- */
      };
    },
    computed: {
      params() {
        return { ...this.fixedParams, ...this.query, ...this.pagination };
      },
    },
    watch: {
      params: {
        handler(val) {
          // 组件的值是搜索的条件
          this.$emit('input', jsonClone(val));
        },
        immediate: true,
        deep: true,
      }
    },
    created() {},
    mounted() {
      this.$nextTick(function() {
      });
    },
    methods: {
      /** ------------------------- 搜索 ---------------------- */
      queryHandler(form) {
        this.$refs.pagination.reset();
        this.$nextTick(function() {
          this.$emit('getList', this.params);
        });
      },
      /** ------------------------- 搜索 ---------------------- */
      /** ------------------------- 分页 ---------------------- */
      getTableListHandler(form) {
        this.$nextTick(function() {
          this.$emit('getList', this.params);
        });
      },
      /** ------------------------- 分页 ---------------------- */
    },
  };
</script>

<style scoped>
</style>