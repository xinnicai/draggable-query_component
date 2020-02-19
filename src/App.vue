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
        type: "text",
        id: "dataset1",
        label: "数据集1",
        children: [{
            type: "text",
            id: 'dataset1_data1',
            label: '字段1',
        },
        {
            type: "text",
            id: 'dataset1_data2',
            label: '字段2',
        },
            ]
    },
        {
          type: "text",
          id: "dataset2",
          label: "数据集2",
          children: [{
            type: "text",
            id: 'dataset2_data1',
            label: '字段1',
          },
            {
              type: "text",
              id: 'dataset2_data2',
              label: '字段2',
            },
          ]
        },
]
    }
  }
}
</script>
