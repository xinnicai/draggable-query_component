<template>
  <div></div>
</template>

<script>
import deepClone from '../utilities.js';

export default {
  data() {
    return{
      operators: ['equals','does not equal','contains','does not contain','is empty','is not empty','begins with','ends with'],
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['query', 'index', 'rule', 'rules','labels', 'depth'],

  computed: {

  },

  beforeMount () {

  },

  mounted () {
    let updated_query = deepClone(this.query);

    // Set a default value for these types if one isn't provided already

  },

  methods: {
    remove: function() {
      this.$emit('child-deletion-requested', this.index);
    },
    updateQuery(value) {
      let updated_query = deepClone(this.query);
      updated_query.value = value;
      this.$emit('update:query', updated_query);
    },
  }
}
</script>