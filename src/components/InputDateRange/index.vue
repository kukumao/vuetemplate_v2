<template>
  <div class="input-date-range-box">
    <el-date-picker
      class="inline-block-inp"
      v-model="myStrartTime"
      :picker-options="startOptions"
      type="datetime"
      size="small"
      :style="{width: width + 'px'}"
      value-format="timestamp"
      default-time="00:00:00"
      placeholder="开始日期">
    </el-date-picker>
    <span class="pd2">至</span>
    <el-date-picker
    class="inline-block-inp"
      v-model="myEndTime"
      :picker-options="endOptions"
      type="datetime"
      size="small"
      :style="{width: width + 'px'}"
      value-format="timestamp"
      default-time="23:59:59"
      placeholder="结束日期">
    </el-date-picker>
  </div>
</template>
<script>
  export default {
    name: 'InputDateRange',
    props: {
      startTime: {
        type: [Number, String],
        default: ''
      },
      endTime: {
        type: [Number, String],
        default: ''
      },
      width: {
        type: [Number, String],
        default: 200
      },
      datesArr: {
        type: [Array, String],
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        // 开始时间
        myStrartTime: this.startTime,
        startOptions: null,
        // 结束时间
        myEndTime: this.endTime,
        endOptions: null,
        // 两个同时改变的数组
        dates: []
      };
    },
    watch: {
      myStrartTime: {
        handler(val) {
          this.$emit('update:startTime', val || '');
          if (val) {
            this.$set(this, 'endOptions', {
              disabledDate(time) {
                return time.getTime() < val;
              }
            });
          } else {
            this.$set(this, 'endOptions', {
              disabledDate(time) {
                return false;
              }
            });
          };
          // 是否同时改变开始和结束时间
          if (val && this.myEndTime) {
            this.$set(this, 'dates', [val, this.myEndTime]);
          } else if (!val && !this.myEndTime) {
            this.$set(this, 'dates', []);
          }
        },
        deep: true
      },
      myEndTime: {
        handler(val) {
          this.$emit('update:endTime', val || '');
          if (val) {
            this.$set(this, 'startOptions', {
              disabledDate(time) {
                return time.getTime() > val;
              }
            });
          } else {
            this.$set(this, 'startOptions', {
              disabledDate(time) {
                return false;
              }
            });
          };
          // 是否同时改变开始和结束时间
          if (val && this.myStrartTime) {
            this.$set(this, 'dates', [this.myStrartTime, val]);
          } else if (!val && !this.myStrartTime) {
            this.$set(this, 'dates', []);
          }
        },
        deep: true
      },
      startTime: {
        handler(val) {
          this.myStrartTime = val;
        },
        deep: true
      },
      endTime: {
        handler(val) {
          this.myEndTime = val;
        },
        deep: true
      },
      datesArr: {
        handler(val) {
          if (val && val.length > 0) {
            this.myStrartTime = val[0];
            this.myEndTime = val[1];
          } else {
            this.myStrartTime = '';
            this.myEndTime = '';
          }
        },
        deep: true,
        immediate: true
      },
      dates: {
        handler(val) {
          this.$emit('update:datesArr', val);
          this.$emit('bothchange', val);
        },
        deep: true
      }
    },
    methods: {}
  };
</script>
<style scoped>
  .pd2{
    margin: 0 10px;
  }
  .inline-block-inp{
    display: inline-block;
    width: 200px;
  }
  .input-date-range-box{
    display: flex;
    align-items: center;
  }
</style>

