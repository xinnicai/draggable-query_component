<template>
  <div class="vqb-children">
    <draggable
        tag="el-collapse"
        class="dragArea list-group"
        :list="query.children"
        group="comp"
        @change="log"
      >
    <component
      :is="getComponent(child.type)"
      v-for="(child, index) in query.children"
      :key="index"
      :type="child.type"
      :query.sync="child.query"
      :rule-types="ruleTypes"
      :rules="rules"
      :rule="$parent.ruleById(child.query.rule)"
      :index="index"
      :max-depth="maxDepth"
      :depth="depth + 1"
      :labels="labels"
      @child-deletion-requested="$parent.removeChild"
    />
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['query', 'ruleTypes', 'rules', 'maxDepth', 'labels', 'depth'],
  components: {
    draggable
  },
  data() {
    return {
      groupComponent: null,
      ruleComponent: null,
      count:0
    }
  },

  mounted() {
    this.groupComponent = this.$parent.$options.components['QueryBuilderGroup'];
    this.ruleComponent = this.$parent.$options.components['QueryBuilderRule'];
  },

  methods: {
    getComponent(type) {
      return type === 'query-builder-group'
        ? this.groupComponent
        : this.ruleComponent;
    },
    log: function(evt) {
      console.log(evt);
      if (evt.added) {
        this.count += 1;  
        const item = { "type": "query-builder-rule", "query": evt.added.element };
        const idx = this.query.children.findIndex(e => e.id === item.query.id);
        let temp = JSON.parse(JSON.stringify(this.query.children));
        temp[idx]=item
        temp[idx].id = this.count;
        this.query.children=temp
      }
    },
  }
}
</script>