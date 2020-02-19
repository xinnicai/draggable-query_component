<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="vqb-rule card">
    <div class="form-inline">


    <el-row :gutter="20">
      <el-col :span="9">
          <el-cascader
              v-model="query.id"
              :options="rules"
              @change="handleChange"
              :props="{ checkStrictly: false , value:'id',emitPath:false}">
          </el-cascader>
      </el-col>
      <el-col :span="6">
          <el-select v-model="query.operator" placeholder="请选择">
              <el-option
                v-for="operator in operators"
                :key="operator"
                :value="operator"
                :label="operator"
                >
              </el-option>
          </el-select>
      </el-col>
      <el-col :span="9">

          <el-input v-model="query.value" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>








      <button v-if="depth > 1"  type="button"  class="close ml-auto"  @click="remove" v-html="labels.removeRule"></button>

    </div>
  </div>

</template>

<script>
import QueryBuilderRule from '../../components/QueryBuilderRule';

export default {
  extends: QueryBuilderRule
}
</script>
