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
        id: "vegetable",
        label: "蔬菜",
        children: [{
            type: "text",
            id: 'nangua',
            label: '南瓜',
        },
        {
            type: "text",
            id: 'qingcai',
            label: '青菜',
        },
            ]
    },
    {
        type: "text",
        id: "fruit",
        label: "水果",

    },
]
    }
  }
}
</script>