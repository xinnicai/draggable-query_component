<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="vqb-group card" :class="'depth-' + depth.toString()">



    <div class="vqb-group-heading card-header">
      <div class="match-type-container form-inline">


    <el-row :gutter="20">
      <el-col :span="6">
         <el-select v-model="query.logicalOperator" placeholder="逻辑">
          <el-option
            v-for="label in labels.matchTypes"
            :key="label.id"
            :value="label.id"
            :label="label.label"
            >
          </el-option>
        </el-select>

      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain @click="addRule">{{ labels.addRule }}</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" plain @click="addGroup">{{ labels.addGroup }}</el-button>
       
      </el-col>
    </el-row>




        <button v-if="depth > 1"  type="button"  class="close ml-auto"  @click="remove" v-html="labels.removeGroup"></button>
      </div>
    </div>

    <div class="vqb-group-body card-body">
      <div class="rule-actions form-inline">
        <div class="form-group">
        </div>
      </div>

      <query-builder-children v-bind="$props" />
    </div>
  </div>
</template>

<script>
import QueryBuilderGroup from '../../components/QueryBuilderGroup';
import QueryBuilderRule from './BootstrapRule.vue';

export default {
  name: "QueryBuilderGroup",

  components: {
    // eslint-disable-next-line vue/no-unused-components
    'QueryBuilderRule': QueryBuilderRule
  },

  extends: QueryBuilderGroup,
}
</script>











<style>
  .vue-query-builder .vqb-group .rule-actions {
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 0px;
  }

  .vue-query-builder .vqb-rule {
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: #c6ecee71;
    border-color: #ddd;
    padding: 2px;
  }
 .vue-query-builder .vqb-group-heading {
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: #eff5f500;
    border-color: #ddd;
    padding: 4px;
  }
  



  .vue-query-builder .vqb-group.depth-1 .vqb-rule,
  .vue-query-builder .vqb-group.depth-2 {
    border-left: 4px solid #8bc34a;
  }

  .vue-query-builder .vqb-group.depth-2 .vqb-rule,
  .vue-query-builder .vqb-group.depth-3 {
    border-left: 4px solid #ff5722;
  }

  .vue-query-builder .vqb-group.depth-3 .vqb-rule,
  .vue-query-builder .vqb-group.depth-4 {
    border-left: 4px solid #8bc34a;
  }

  .vue-query-builder .vqb-group.depth-4 .vqb-rule,
  .vue-query-builder .vqb-group.depth-5 {
    border-left: 4px solid  #ff5722;
  }

    .vue-query-builder .vqb-group.depth-5 .vqb-rule,
  .vue-query-builder .vqb-group.depth-6 {
    border-left: 4px solid  #8bc34a;
  }

  .vue-query-builder .close {
    opacity: 1;
    color: rgb(150,150,150);
  }

  @media (min-width: 768px) {
    .vue-query-builder .vqb-rule.form-inline .form-group {
      display: block;
    }
  }

  .el-header {
    background-color: rgba(211, 234, 238, 0.438);
    color: rgb(150,150,150);
    text-align: center;
    line-height: 60px;
  } 
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>