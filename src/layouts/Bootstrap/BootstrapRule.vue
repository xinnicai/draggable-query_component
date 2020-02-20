<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="vqb-rule card" style="margin-bottom:10px">
    <div class="form-inline">


    <el-row :gutter="20">
      <el-col :span="9">
          <el-cascader
              v-model="query.id"
              :options="dataList "
              @change="handleChange"
              clearable
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
  extends: QueryBuilderRule,
  data(){
    return{
      dataList:[
          {
            type: "query-builder-rule",
            id: "dataset1",
            label: "数据集1",
            children: [{
                type: "query-builder-rule",
                id: 'dataset1_data1',
                label: '字段1',
            },
            {
                type: "query-builder-rule",
                id: 'dataset1_data2',
                label: '字段2',
            },
            {
                type: "query-builder-rule",
                id: 'dataset1_data3',
                label: '字段3',
            },
                ]
        },
        {
          type: "query-builder-rule",
          id: "dataset2",
          label: "数据集2",
          children: [{
            type: "query-builder-rule",
            id: 'dataset2_data1',
            label: '字段1',
          },
            {
              type: "query-builder-rule",
              id: 'dataset2_data2',
              label: '字段2',
            },
             {
              type: "query-builder-rule",
              id: 'dataset2_data3',
              label: '字段3',
            },
          ]
        },
]
    }
  }
}
</script>
