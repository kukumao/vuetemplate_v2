<template>
  <!-- 如果存在子节点，则使用el-submenu组件并递归调用自身 -->
  <el-submenu
    v-if='menuObj.subMenus.length > 0'
    :index='menuObj.menuUrl'>
    <template slot="title">
      <i :class='"nav-icon-box md-icon__" + menuObj.menuKey'></i>
      <span slot="title">{{ menuObj.label }}</span>
    </template>
    <!-- 递归调用该组件 -->
    <second-el-menu-item 
    v-for="(item, index) in menuObj.subMenus"
    :key="index"
    :menuObj="item"
    >
    </second-el-menu-item>
  </el-submenu>
  <!-- 否则直接渲染该节点 -->
  <el-menu-item
    v-else
    :menuObj='menuObj'
    :index='menuObj.menuUrl'>
    <i :class='"nav-icon-box md-icon__" + menuObj.menuKey'></i>
    <span slot="title">{{ menuObj.label }}</span>
  </el-menu-item>
</template>
<script>
  export default {
    name: 'SecondElMenuItem', // name：用来进行递归调用的组件名
    props: ['menuObj']
  };
</script>

<style scoped>
  /*图标*/
  .nav-icon-box{
    display: inline-block;
    margin-right: 5px;
    width: 16px;
    height: 16px;
  }
  /*会员列表*/
  .md-icon__vip__memberList{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat 0 0;
    background-size: 120px 72px;
  }
  /*等级管理*/
  .md-icon__vip__memberLevel{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -24px 0;
    background-size: 120px 72px;
  }
  /*成长管理*/
  .md-icon__vip__memberGrowth{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -51px 0;
    background-size: 120px 72px;
  }
  /*权益管理*/
  .md-icon__vip__memberRight{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -75px 0;
    background-size: 120px 72px;
  }
  /*渠道设置*/
  .md-icon__sys__systemSetup{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -97px 0;
    background-size: 120px 72px;
  }
  /*数据字典*/
  .md-icon__sys__dictConfig{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat 0 -20px;
    background-size: 120px 72px;
  }

  /*会员分析*/
  .md-icon__data__memberAnalysis{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -24px -20px;
    background-size: 120px 72px;
  }
  /*来源分析*/
  .md-icon__data__SourceAnalysis{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -50.5px -20px;
    background-size: 120px 72px;
  }
  /*权益分析*/
  .md-icon__data__rightAnalysis{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -74.5px -20px;
    background-size: 120px 72px;
  }
  /*留存分析*/
  .md-icon__data__retainAnalysis{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -96.5px -20px;
    background-size: 120px 72px;
  }
  /*其它报表*/
  .md-icon__data__otherReports{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat 0 -40px;
    background-size: 120px 72px;
  }

  /*积分池管理*/
  .md-icon__vip__IntegralPool{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -24px -40px;
    background-size: 120px 72px;
  }
  /*积分管理*/
  .md-icon__vip__IntegralManagement{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -50.5px -40px;
    background-size: 120px 72px;
  }
   /*积分日报，使用等级管理icon*/
  .md-icon__data__integralStatistics{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -24px 0;
    background-size: 120px 72px;
  }
   /*活动中心，使用等级管理icon*/
  .md-icon__marketingMgr__activityCenter{
    background: url('../../../assets/common/common-nav-icon.png') no-repeat -24px 0;
    background-size: 120px 72px;
  }
</style>
