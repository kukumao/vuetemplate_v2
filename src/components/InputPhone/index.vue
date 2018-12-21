<template>
  <div>
    <el-input 
    :placeholder="placeholder" 
    type="number" 
    :clearable="clearable" 
    maxlength="11" 
    size="small" 
    min="1"
    max="19999999999"
    :class="className + ' phone-number-inp'" 
    @keyup.native="phoneChange"
    v-model.trim="mobile">
      <template slot="append">
        <slot></slot>
      </template>
    </el-input>
  </div>
</template>
<script>
  export default {
    name: 'InputPhone',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      clearable: {
        type: Boolean,
        default: false
      },
      className: {
        type: String,
        default: 'gc-w300'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        // 电话
        mobile: null
      };
    },
    watch: {
      value: {
        handler(val) {
          this.mobile = val;
        },
        deep: true,
        immediate: true
      },
      mobile: {
        handler: function(val) {
          this.$emit('input', val);
        },
        deep: true
      }
    },
    methods: {
      phoneChange(val) {
        let myText1 = (this.mobile).toString();
        let textReg = /^[0-9]*$/;
        // console.log(99, this.mobile, val.key, textReg.test(val.key), this.mobile.length);
        // 限制特殊字符输入
        if (this.mobile && !textReg.test(val.key) && (val.key === '.' || val.key === '+' || val.key === '-')) {
          this.mobile = '1';
          return;
        } else if (!this.mobile && val.key.length === 1) {
          this.mobile = '1';
          return;
        } else if (!textReg.test(this.mobile)) {
          this.mobile = '1';
          return;
        }
        // 1开头的11位
        if (this.mobile.length > 11) {
          // 要1开头的数字
          if (+myText1.substring(0, 1) !== 1) {
            this.mobile = '1' + myText1.slice(0, 10);
          } else {
            // 限制长度
            this.mobile = myText1.substring(0, 11);
          };
        } else if (this.mobile.length === 11) {
          // 要1开头的数字
          if (+myText1.substring(0, 1) !== 1) {
            this.mobile = '1' + myText1.substring(0, 10);
          }
        } else {
          if (this.mobile !== '' && (+myText1.substring(0, 1) !== 1)) {
            // 要1开头的数字
            this.mobile = '1' + this.mobile;
          };
        }
      }
    }
  };
</script>

