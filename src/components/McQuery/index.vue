<template>
  <!-- 搜索栏 -->
  <el-form
    :model="form"
    ref="form"
    v-bind="$attrs"
    :label-position="labelPosition"
    :label-width="labelWidth"
    inline
    :class="[
      isMore ? 'flex-wraper' : 'inline-block-form',
      {'flex-wraper': isMore},
    ]"
  >
      <template
        v-for="(item, index) in items"
      >
        <!-- 下拉选择框 -->
        <el-form-item
          class="query-item"
          v-if="item.type === 'el-select'"
          :prop="item.prop"
          :style="{ width: item.formItemWidth || formItemWidth || '290px' }"
          :label="item.label"
          :labelWidth="item.labelWidth"
          :key="index"
        >
          <el-select
            :style="{ width: item.width || itemWidth }"
            v-model="form[item.prop]"
            :clearable="item.clearable === false ? false : true"
            v-bind="item"
            v-on="getListeners($listeners, item.prop)"
          >
            <el-option
              v-for="(i, index) in item.options"
              :key="index"
              :label="i.label"
              :value="i.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 单选框组 -->
        <el-form-item
          class="query-item"
          v-else-if="item.type === 'el-radio-group'"
          :style="{ width: item.formItemWidth || formItemWidth || '290px' }"
          :prop="item.prop"
          :labelWidth="item.labelWidth"
          :label="item.label"
          :key="index"
        >
          <el-radio-group
            :style="{ width: item.width || itemWidth }"
            v-model="form[item.prop]"
            v-bind="item"
            v-on="getListeners($listeners, item.prop)"
          >
            <el-radio
              v-for="(i, index) in item.options"
              :key="index"
              :label="i.value"
            >{{ i.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 时间范围选择器 -->
        <template v-else-if="item.type === 'date-range'">
            <!-- v-else-if="item.type === 'date-range'" -->
          <el-form-item
            class="query-item"
            :labelWidth="item.labelWidth"
            :style="{ width: item.formItemWidth || formItemWidth || '580px' }"
            :label="item.label"
            :key="index"
          >
            <el-form-item :prop="item.prop[0]" class="no-margin">
              <el-date-picker
                :style="{ width: item.width || itemWidth }"
                class="date-range-picker"
                v-model="form[item.prop[0]]"
                v-bind="item[item.prop[0]]"
                :value-format="getDateRangeValueFormat(item, 0)"
                v-on="getListeners($listeners, item.prop[0])"
              ></el-date-picker>
            </el-form-item>
            <span class="date-range-separator">{{ item.separator || '至' }}</span>
            <el-form-item :prop="item.prop[1]" class="no-margin">
              <el-date-picker
                :style="{ width: item.width || itemWidth }"
                class="date-range-picker"
                v-model="form[item.prop[1]]"
                v-bind="item[item.prop[1]]"
                :value-format="getDateRangeValueFormat(item, 1)"
                v-on="getListeners($listeners, (item.prop[1] || item.prop[0]))"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <!-- 增加一个空元素，为了使得元素能够对齐，允许使用 noFake 属性关闭 -->
          <div v-if="isMore && !item.noFake" :key="index + 'feke'" class="fake-date-range"></div>
        </template>

        <!-- 数字范围选择器 -->
        <el-form-item
          class="query-item"
          v-else-if="item.type === 'input-range'"
          :style="{ width: item.formItemWidth || formItemWidth || '290px' }"
          :labelWidth="item.labelWidth"
          :label="item.label"
          :key="index"
        >
          <el-form-item :prop="item.prop[0]" class="no-margin">
            <el-input
              :style="{ width: item.width || itemWidth }"
              class="date-range-picker"
              v-model="form[item.prop[0]]"
              v-bind="item[item.prop[0]]"
              :value-format="getDateRangeValueFormat(item, 0)"
              v-on="getListeners($listeners, item.prop[0])"
            ></el-input>
          </el-form-item>
          <span class="date-range-separator">{{ item.separator || '至' }}</span>
          <el-form-item :prop="item.prop[1]" class="no-margin">
            <el-input
              :style="{ width: item.width || itemWidth }"
              class="date-range-picker"
              v-model="form[item.prop[1]]"
              v-bind="item[item.prop[1]]"
              :value-format="getDateRangeValueFormat(item, 1)"
              v-on="getListeners($listeners, (item.prop[1] || item.prop[0]))"
            ></el-input>
          </el-form-item>
        </el-form-item>

        <!-- 其他 -->
        <el-form-item
          class="query-item"
          v-else
          :style="{ width: item.formItemWidth || formItemWidth || '290px' }"
          :prop="item.prop"
          :labelWidth="item.labelWidth"
          :label="item.label"
          :key="index"
        >
          <component
            :style="{ width: item.width || itemWidth }"
            :is="item.type || 'el-input'"
            :type="item.dateType"
            v-model="form[item.prop]"
            v-bind="item"
            :clearable="item.clearable === false ? false : true"
            v-on="getListeners($listeners, item.prop)"
          ></component>
        </el-form-item>
      </template>

    <el-form-item v-if="showButton" :class="isMore ? 'btn-item-more' : 'btn-item-less'">
      <el-button type="primary" @click="queryHandler">查询</el-button>
      <el-button @click="resetHandler">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  const jsonClone = (val) => JSON.parse(JSON.stringify(val));

  export default {
    name: 'McQuery',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {
      showButton: {
        default: true,
      },
      labelWidth: {
        type: String,
        default: '80px',
      },
      labelPosition: {
        type: String,
        default: 'left',
      },
      // 表单的宽度（input之类而不是form-item）
      itemWidth: {
        type: String,
        default: '200px',
      },
      // 单个搜索项的宽度，用来计算flex布局
      formItemWidth: {
        type: String,
      },

      items: Array,
    },
    data() {
      return {
        form: {},
      };
    },
    computed: {
      // 是否有多个搜索项
      isMore() {
        return this.items.length > 2;
      },
    },
    watch: {},
    created() {
      this.init();
    },
    mounted() {
      this.$nextTick(function() {
      });
    },
    methods: {
      /** --------------- 供外部调用 - start -------------  */
      // 重置
      reset() {
        this.resetHandler();
      },
      /** --------------- 供外部调用 - end -------------  */
      /** --------------- 特殊类别辅助函数 - start -------------  */
      getDateRangeValueFormat(item, index) {
        const valueFormat = 'yyyy-MM-dd HH:mm:ss';
        if (item.valueFormat) {
          return item.valueFormat;
        }

        if (index === 0) {
          if (item[item.prop[0]] && item[item.prop[0]].valueFormat) {
            return item[item.prop[0]].valueFormat;
          }
          if (item[item.prop[1]] && item[item.prop[1]].valueFormat) {
            return item[item.prop[1]].valueFormat;
          }
        }

        if (index === 1) {
          if (item[item.prop[1]] && item[item.prop[1]].valueFormat) {
            return item[item.prop[1]].valueFormat;
          }
          if (item[item.prop[1]] && item[item.prop[1]].valueFormat) {
            return item[item.prop[1]].valueFormat;
          }
        }

        return valueFormat;
      },
      /** --------------- 特殊类别辅助函数 - end -------------  */
      /**
       * 将父组件绑定的事件根据前缀分发给各个子组件
       */
      getListeners(val, prop) {
        const regStr = '^(' + prop + '-)(.*)$';
        const regExp = new RegExp(regStr);
        const listeners = {};
        for (let listener in val) {
          const match = listener.match(regExp);
          if (match) {
            listeners[match[2]] = val[listener];
          }
        }

        return listeners;
      },
      resetHandler() {
        this.$refs.form.resetFields();
        this.$emit('input', {});
        this.$nextTick(function() {
          this.$emit('reset');
        });
      },
      queryHandler() {
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.$emit('input', jsonClone(this.form));
            this.$emit('query', jsonClone(this.form));
          }
        });
      },
      // 初始化表单，解决重置出现无法正常使用的bug
      init() {
        const items = this.items;
        items.forEach(item => {
          const prop = item.prop;
          const form = this.form;

          if (prop.forEach) {
            prop.forEach(key => {
              this.$set(form, key, '');
            });
          } else {
            this.$set(form, prop, '');
          }
        });
      },
    },
  };
</script>

<style scoped>
  .no-margin {
    margin: 0;
  }
  .flex-wraper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .inline-block-form {
    display: inline-block;
    vertical-align: top;
  }

  .date-range-separator {
    display: inline-block;
    width: 20px;
    text-align: center;
  }
  .date-range-picker {
    width: inherit;
  }

  .btn-item-less {
    margin-left: 10px;
  }
  .btn-item-more {
    display: block;
    width: 100%;
    margin-bottom: 0;
    text-align: center;
  }

  /* 每一个搜索项的公共样式 */
  .query-item {
    margin-right: 0;
  }

  .fake-date-range {
    width: 0;
    flex: 0 1 0;
  }

  /* 当总共有小于等于三个表单项（2个搜索一个操作）时，第二个表单项的类名为query-item时，左边距为30px */
  .query-item:nth-of-type(1):nth-last-of-type(-n+3) {
    margin-right: 30px;
  }
</style>