<template>

<div>
  <div class="container mt-2">
    <vue-query-builder
      :rules="rules"
      :maxDepth="6"
      @queryUpdated="queryUpdated"
      v-model="query"
      ></vue-query-builder>
  </div>
  {{ query }}

</div>
</template>

<script>
import VueQueryBuilder from './VueQueryBuilder.vue';

export default {
  name: 'app',

  components: {
    VueQueryBuilder
  },

  methods: {
    queryUpdated (query) {
      this.query = query;
    }
  },

  data () {
    return {
      query: null,

      rules: [
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
