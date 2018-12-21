<template>
  <div>
    <ul class="query-container">
      <li
        v-for="(item, index) in queryArr"
        @click="setCurrent(item)"
        :key="index"
        :class="column ? 'col-'+column :''"
        v-if="index < 6 || spread"
      >
        <label :style="{'width': labelWidth+'px'}"><span
            class="required-icon"
            v-if="item.required"
          >*&nbsp;&nbsp;</span>{{item.label}}&nbsp;&nbsp;</label>

        <div
          class="query-content"
          :style="{'width': item.labelWidth ? (+item.labelWidth) +'px': ((item.queryType === 'dateRange' || item.queryType === 'date' && item.type === 'datetimerange'|| item.queryType === 'minAndMax') ? (+labelWidth + 10 + 300) +'px':'200px') }"
        >
          <el-input
            v-model.trim="form[item.key]"
            v-if="item.queryType==='input'"
            v-bind="item"
            :maxlength="item.maxLength"
            placeholder="请输入"
            clearable
            size="small"
            @change="item.change"
            @blur="item.blur(form[item.key])"
            @focus="item.focus"
          ></el-input>
          <!-- 手机号 -->
          <input-phone
            v-if="item.queryType==='phone'"
            v-model="form[item.key]"
            clearable
            placeholder="请输入"
            className="gc-w200"
          ></input-phone>
          <!-- 最小值And最大值 -->
          <template v-if="item.queryType==='minAndMax'">
            <el-input
              v-model.trim="form[item.list[0].key]"
              v-bind="item.list[0]"
              placeholder="请输入"
              clearable
              size="small"
            >
            </el-input>
            <span class="pd10">至</span>
            <el-input
              v-model.trim="form[item.list[1].key]"
              v-bind="item.list[1]"
              placeholder="请输入"
              clearable
              size="small"
            >
            </el-input>
          </template>
          <el-select
            v-model="form[item.key]"
            v-else-if="item.queryType==='select'"
            v-bind="item"
            clearable
            size="small"
            @change="item.change"
            @blur="item.blur"
            @focus="item.focus"
            @clear="item.clear"
          >
            <el-option
              :label="i[item.labelKey||selectLabelKey]"
              :value="i[item.valueKey||selectValueKey]"
              v-for="(i, index) in item.list"
              :key="index || i[selectLabelKey]"
            >
            </el-option>
          </el-select>
          <template v-else-if="item.queryType==='dateRange'">
            <template v-if="item.type === 'dataTime'">
              <input-date-range
                :startTime.sync="form[item.list[0].key]"
                :endTime.sync="form[item.list[1].key]"
                :startTimeDefault="item.list[0].value || ''"
                :endTimeDefault="item.list[1].value || ''"
              ></input-date-range>
              <!-- <el-date-picker
                v-model="form[item.list[0].key]"
                v-bind="item.list[0]"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                type="datetime"
                size="small"
                placeholder="请选择">
              </el-date-picker>
              <span class="pd10">至</span>
              <el-date-picker
                v-model="form[item.list[1].key]"
                v-bind="item.list[1]"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="23:59:59"
                type="datetime"
                size="small"
                placeholder="请选择">
              </el-date-picker> -->
            </template>
            <template v-else-if="item.type === 'dataTimeRange'">
              <el-date-picker
                v-model="form[item.key]"
                v-bind="item"
                type="daterange"
                size="small"
                value-format="timestamp"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </template>
            <!-- 日期区间选择器 -->
            <template v-else>
              <el-date-picker
                v-model="form[item.list[0].key]"
                v-bind="item.list[0]"
                size="small"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
              >
              </el-date-picker>
              <span class="pd10">至</span>
              <el-date-picker
                v-model="form[item.list[1].key]"
                v-bind="item.list[1]"
                size="small"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
              >
              </el-date-picker>
            </template>

          </template>
          <yxy-dic-select
            v-model="form[item.key]"
            size="small"
            v-else-if="item.queryType==='dictSelect'"
            v-bind="item"
          ></yxy-dic-select>
          <template v-else-if="item.queryType==='numberRange'">
            <input-number
              v-model.trim="form[item.list[0].key]"
              v-bind="item.list[0]"
              size="small"
              :controls="false"
            >
            </input-number>
            <span class="pd10">至</span>
            <input-number
              v-model.trim="form[item.list[1].key]"
              v-bind="item.list[1]"
              size="small"
              :controls="false"
            >
            </input-number>
          </template>
          <template v-else-if="item.queryType==='tree'">
            <el-cascader
              placeholder="请选择"
              size="small"
              :options="item.list"
              :props="props"
              filterable
              change-on-select
              clearable
              :show-all-levels="false"
              @change="treeChangeHandler(item)"
              v-model="item.valueList"
            ></el-cascader>
          </template>
        </div>
      </li>
      <li
        :class="column ? 'col-'+column :''"
        v-if="queryArr.length < 4"
      >
        <el-row
          type="flex"
          justify="end"
          class="search-btn"
        >
          <el-button
            class="gc-mw82"
            type="primary"
            size="small"
            @click="query"
          >查询</el-button>
          <el-button
            class="gc-mw82"
            size="small"
            @click="reset"
          >重置</el-button>
        </el-row>
      </li>
    </ul>
    <div class="spread-btn" v-if="queryArr.length > 6">
      <div
        v-if="!spread"        
        @click="spread=true"
      >展开更多筛选条件</div>
      <div
        v-else
        @click="spread=false"
      >收起</div>
    </div>
    <div
      class="query-btn-container"
      v-if="queryArr.length >= 4"
    >
      <el-button
        class="gc-mw82"
        type="primary"
        size="small"
        @click="query"
      >查询</el-button>
      <el-button
        class="gc-mw82"
        size="small"
        @click="reset"
      >重置</el-button>
    </div>
  </div>

</template>
<script>
import { serialize } from '@/utils/serizlize';
import { deepClone } from '@/utils';
import InputNumber from '@/components/EditableItem/input-number';
import InputPhone from '@/components/InputPhone';
import InputDateRange from '@/components/InputDateRange';
export default {
  name: 'QueryBar',
  props: {
    queryList: {
      type: Array,
      required: true
    },
    // 默认值
    defaultValues: {
      type: Object,
      default: null
    },
    labelWidth: {
      type: [Number, String],
      default: 80
    },
    selectLabelKey: {
      type: String,
      default: 'name'
    },
    selectValueKey: {
      type: String,
      default: 'value'
    },
    value: {
      type: Object
    },
    column: {
      type: [Number, String],
      default: 4
    }
  },
  data() {
    return {
      form: {},
      noop: function() {},
      current: {},
      props: {
        value: 'id'
      },
      spread: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.defaultValues) {
        this.form = JSON.parse(JSON.stringify(this.defaultValues));
        this.$emit('query', serialize(this.form));
      }
    });
  },
  components: { InputNumber, InputPhone, InputDateRange },
  methods: {
    query() {
      this.$emit('query', serialize(this.form));
    },
    reset() {
      this.queryArr.forEach(item => {
        if (item.queryType === 'tree') {
          item.valueList = [];
        }
      });
      this.form = {};
      this.$emit('reset');
    },
    setCurrent(item) {
      this.current = item;
    },
    extend(target, source, extendKeyList = []) {
      extendKeyList.forEach(item => {
        target[item] = source[item];
      });
      return target;
    },
    treeChangeHandler(val) {
      this.form[val.key] = val.valueList[val.valueList.length - 1];
    }
  },
  computed: {
    queryArr() {
      let vm = this;
      let result = deepClone(this.queryList);
      const extendKeyList = ['change', 'blur', 'focus', 'clear'];
      const getFun = item => {
        let funObj = this.extend({}, item, extendKeyList);
        for (let key in funObj) {
          // 级联选择值变化处理
          if (
            item.queryType === 'select' &&
            key === 'change' &&
            item.cascadeName
          ) {
            let cascadeList = [];
            for (let query of this.queryList) {
              if (
                item.cascadeName === query.cascadeName &&
                item.level < query.level
              ) {
                cascadeList.push(query.key);
              }
            }
            item[key] = function(value) {
              if (value === '') {
                cascadeList.forEach(i => {
                  vm.form[i] = '';
                });
              }
              funObj[key] && funObj[key](value);
            };
          } else if (item.queryType === 'tree') {
            item[key] = [];
          } else {
            item[key] = function(value) {
              funObj[key] && funObj[key](value);
            };
          }
        }
      };
      for (let item of result) {
        if (!item.key) {
          if (item.list) {
            for (let li of item.list) {
              getFun(li);
            }
          }
        } else {
          getFun(item);
        }
      }
      return result;
    }
  },
  watch: {
    form: {
      handler(val) {
        this.$emit('input', serialize(val));
      },
      deep: true
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.query-container {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 10px;
    label {
      line-height: 30px;
      text-align: right;
    }
  }
  .col-2 {
    flex-basis: 50%;
  }
  .col-3 {
    flex-basis: 33%;
  }
  .col-4 {
    flex-basis: 25%;
  }
  .query-content {
    width: 200px;
    display: flex;
    align-items: center;
  }
  .pd10 {
    margin: 0 10px;
  }
  .search-btn {
    width: 100%;
  }
}

.query-btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 20px;
}
.required-icon {
  color: #f56c6c;
  vertical-align: middle;
}
.spread-btn {
  margin-left: 120px;
  color: #619aff;
  cursor: pointer;
}
</style>
