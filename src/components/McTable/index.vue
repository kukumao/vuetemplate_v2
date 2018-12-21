<template>
  <!-- 对表格进行简单封装 -->
  <el-table
    ref="table"
    class="gc-wp100"
    v-bind="$props"
    @select="(selection, row) => emitHandler(['select', selection, row])"
    @select-all="(selection) => emitHandler(['select-all', selection])"
    @selection-change="(selection) => emitHandler(['selection-change', selection])"
    @cell-mouse-enter="(row, column, cell, event) => emitHandler(['cell-mouse-enter', row, column, cell, event])"
    @cell-mouse-leave="(row, column, cell, event) => emitHandler(['cell-mouse-leave', row, column, cell, event])"
    @cell-click="(row, column, cell, event) => emitHandler(['cell-click', row, column, cell, event])"
    @cell-dblclick="(row, column, cell, event) => emitHandler(['cell-dblclick', row, column, cell, event])"
    @row-click="(row, event, column) => emitHandler(['row-click', row, event, column])"
    @row-contextmenu="(row, event) => emitHandler(['row-contextmenu', row, event])"
    @row-dblclick="(row, event) => emitHandler(['row-dblclick', row, event])"
    @header-click="(column, event) => emitHandler(['header-click', column, event])"
    @header-contextmenu="(column, event) => emitHandler(['header-contextmenu', column, event])"
    @sort-change="({ column, prop, order }) => emitHandler(['sort-change', { column, prop, order }])"
    @filter-change="(filters) => emitHandler(['filter-change', filters])"
    @current-change="(currentRow, oldCurrentRow) => emitHandler(['current-change', currentRow, oldCurrentRow])"
    @header-dragend="(newWidth, oldWidth, column, event) => emitHandler(['header-dragend', newWidth, oldWidth, column, event])"
    @expand-change="(row, expandedRows) => emitHandler(['expand-change', row, expandedRows])"
  >
    <template v-for="(item, index) in columns">
      <el-table-column
        :key="index"
        v-if="item.type"
        v-bind="item"
        :align="item.align || 'center'"
      >
      </el-table-column>
      <el-table-column
        v-else
        :key="index"
        v-bind="item"
        :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
      >
        <template slot-scope="scope">
          <slot :name="item.name || item.prop" v-bind="scope">{{ scope.row[item.prop]}}</slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'McTable',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {
    // 自定义的列配置项
    columns: Array,

    // 以下为 el-table 原本支持的props
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

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

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    /** --------------- 方法 -------------  */
    /**
     * 作为桥梁作用，给外部调用el-table原本提供的方法
     */
    triggerMethod(methodName, args) {
      this.$refs.table[methodName].apply(this, args);
    },
    /** --------------- 事件 -------------  */
    /**
     * 作为桥梁作用，将el-table原本冒泡上来的事件接着往上冒
     */
    emitHandler(args) {
      this.$emit.apply(this, args);
    },
  }
};
</script>

<style scoped>
</style>