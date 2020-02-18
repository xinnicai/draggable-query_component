<template>
  <div class="row">
    <div class="col-3">
      <h3>可用组件列表</h3>
      <draggable :list="data" :options="{ forceFallback: true }" :group="{ name: 'comp', pull: 'clone', put: false }" @change="log" >
        <div class="firstLevel" v-for="item in data" :key="item.id">
            <div class="leverFirst">
              <span class="treeExpandBtn" @click.stop="toggleNode(item)" :class="{expanded:item.expand && item.children,btnclose:!item.expand && item.children,line: !item.last && !item.children,lastLine:item.last&&!item.children}"><span class="tree-icon" :class="item.icon"></span> </span>     
              <span >{{item.label}}</span>
            </div>
          <draggable :list="item.children" v-if="item.expand" :options="{ forceFallback: true }" :group="{ name: 'comp', pull: 'clone', put: false }" @change="log" >
            <div class="SecondLevel" v-for="it in item.children" :key="it.id">
              <div class="leverSecond">
                <span class="treeExpandBtn" @click.stop="toggleNode(it)" :class="{expanded:it.expand && it.children,btnclose:!it.expand && it.children,line: !it.last && !it.children,lastLine:it.last&&!it.children}"><span class="tree-icon" :class="it.icon"></span> </span>     
                <span >{{it.label}}</span>
              </div>
              <draggable :list="it.children" v-if="it.expand" :options="{ forceFallback: true }" :group="{ name: 'comp', pull: 'clone', put: false }" @change="log" >
                  <div class="ThirdLevel" v-for="ele in it.children" :key="ele.id">
                    <div class="leverThird">
                      {{ele.label}}
                    </div>
                  </div>
                </draggable>
            </div>
          </draggable>
        </div>
      </draggable>
    </div>
    <div class="col-9">
      <h3>组件配置页面展示</h3>
      <!-- <draggable
        tag="el-collapse"
        class="dragArea list-group"
        :list="list2"
        group="comp"
        @change="log"
      > -->
        <slot v-bind="vqbProps">
          <query-builder-group
            v-bind="vqbProps"
            :query.sync="query"
          />
        </slot>
        <!-- <el-collapse
          class="list-group-item left"
          v-for="(element,index) in list2"
          :key="index"
          v-model="activeNames"
          @change="handleChange"
        >
          <el-collapse-item :name="element.id">
            <template slot="title">
              <span>{{element.label}}</span>
              <i class="el-icon-circle-close" @click.stop="deleteItem(index)"></i>
            </template>
            <div>{{ element.label }}</div>
          </el-collapse-item>
        </el-collapse> -->
      <!-- </draggable> -->
    </div>

    
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import draggable from "vuedraggable";
import QueryBuilderGroup from './layouts/Bootstrap/BootstrapGroup.vue';
import deepClone from './utilities.js';




var defaultLabels = {
  matchType: "逻辑",
  matchTypes: [
    {"id": "and", "label": "且"},
    {"id": "or", "label": "或"},
  ],
  addRule: "规则",
  removeRule: "&times;",
  addGroup: "组",
  removeGroup: "&times;",
  textInputPlaceholder: "value",
};
export default {
  name: 'VueQueryBuilder',
  components: {
    QueryBuilderGroup,
    draggable
  },
  display: "Clone",
  order: 2,
    props: {
    rules: Array,
    labels: {
      type: Object,
      default () {
        return defaultLabels;
      }
    },
    maxDepth: {
      type: Number,
      default: 7,
      validator: function (value) {
        return value >= 1
      }
    },
    value: Object
  },
  data() {
    return {
      list1: [
        { name: "组件1", id: 1, content: "内容内容内容。。。。" },
        { name: "组件2", id: 2, content: "内容内容内容。。。。" },
        { name: "组件3", id: 3, content: "内容内容内容。。。。" },
        { name: "组件4", id: 4, content: "内容内容内容。。。。" },
        { name: "组件5", id: 5, content: "内容内容内容。。。。" },
        { name: "组件6", id: 6, content: "内容内容内容。。。。" },
        { name: "组件7", id: 7, content: "内容内容内容。。。。" }
      ],
      list2: [],
      activeNames: [],
      count: 0,
     data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        query: {
        logicalOperator: this.labels.matchTypes[0].id,
        children: []
      },

       query1: { "logicalOperator": "and", "children": [ { "type": "query-builder-rule", "query": { "rule": null, "value": null } } ] } ,
      ruleTypes: {
        "text": {
          operators: ['equals','does not equal','contains','does not contain','is empty','is not empty','begins with','ends with'],
          inputType: "text",
          id: "text-field"
        },
        "numeric": {
          operators: ['=','<>','<','<=','>','>='],
          inputType: "number",
          id: "number-field"
        },
        "custom": {
          operators: [],
          inputType: "text",
          id: "custom-field"
        },
        "radio": {
          operators: [],
          choices: [],
          inputType: "radio",
          id: "radio-field"
        },
        "checkbox": {
          operators: [],
          choices: [],
          inputType: "checkbox",
          id: "checkbox-field"
        },
        "select": {
          operators: [],
          choices: [],
          inputType: "select",
          id: "select-field"
        },
        "multi-select": {
          operators: ['='],
          choices: [],
          inputType: "select",
          id: "multi-select-field"
        },
      },

    };
  },
  computed: {
    mergedLabels () {
      return Object.assign({}, defaultLabels, this.labels);
    },

    mergedRules () {
      var mergedRules = [];
      var vm = this;

      vm.rules.forEach(function(rule){
        if ( typeof vm.ruleTypes[rule.type] !== "undefined" ) {
          mergedRules.push( Object.assign({}, vm.ruleTypes[rule.type], rule) );
        } else {
          mergedRules.push( rule );
        }
      });

      return mergedRules;
    },

    vqbProps () {
      return {
        index: 0,
        depth: 1,
        maxDepth: this.maxDepth,
        ruleTypes: this.ruleTypes,
        rules: this.mergedRules,
        labels: this.mergedLabels
      }
    },


  },

  created () {
      this.query = this.query1;
  },
  methods: {
    // 初始化tree数据
    initData(expandInit,activeInit){
				var self = this;
				var modifyDataFun = function(datas){
					if(datas){
						datas.forEach( (m,index)  => {
							if(expandInit){
                self.$set(m,'expand',true);
                
							}
							if(activeInit){
								self.$set(m,'active',false);
							}
							if(index === datas.length - 1){
								self.$set(m,'last',true);
							}
							if(m.children){
                self.$set(m,'icon','el-icon-caret-bottom');
								modifyDataFun(m.children);
							}
						});
					}
				}
        modifyDataFun(this.data);
    },
    log: function(evt) {
      console.log(evt);
      if (evt.added) {
        // this.count += 1;
        const item = evt.added.element;
        // const idx = this.list2.findIndex(e => e.id === item.id);
        // let temp = JSON.parse(JSON.stringify(this.list2));
        // temp[idx].id = this.count;
        let dragAdd={ "type": "query-builder-rule", "query": { "rule": null, "value": item.label } }
        this.query.children.push(dragAdd)
      }
    },
    handleChange: function() {},
    deleteItem: function(index) {
      this.list2.splice(index, 1);
    },
    toggleNode(item){
					item.expand = !item.expand;
          item.active = true;
          if(item.expand){
            item.icon='el-icon-caret-bottom'
          }else{
            item.icon='el-icon-caret-right'
          }
				},
  },
  mounted(){
      this.initData(true,true);
       this.$watch(
        'query',
        newQuery => {
          if (JSON.stringify(newQuery) !== JSON.stringify(this.value)) {
            this.$emit('input', deepClone(newQuery));
          }
        }, {
        deep: true
      });

      this.$watch(
        'value',
        newValue => {
          if (JSON.stringify(newValue) !== JSON.stringify(this.query)) {
            this.query = deepClone(newValue);
          }
        }, {
        deep: true
      });

      if ( typeof this.$options.propsData.value !== "undefined" ) {
        this.query = Object.assign(this.query, this.$options.propsData.value);
      }
		},
};

</script>
<style>
.row {
  display: flex;
  width: 100%;
}

.col-5 {
  flex: 0 0 40%;
  max-width: 40%;
  margin-right: 10%;
}

.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border: 0;
}

.list-group-item:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  box-sizing: border-box;
}

.el-collapse-item__header {
  border: 0;
  height: 40px;
  line-height: 40px;
}

.el-collapse-item__wrap {
  border-bottom: 0;
}

.list-group-item {
  cursor: move;
}

h3 {
  font-size: 28px;
  margin-bottom: 20px;
}

.el-icon-circle-close {
  color: #c9a2a2;
  font-size: 20px;
  position: absolute;
  right: 50px;
}

.el-icon-circle-close:hover {
  color: #f40;
}
.treeDrag{
    width:300px;
    color: #fff;
    margin-left:auto;
    margin-right:auto;
  }
  .leverFirst:hover ,.leverSecond:hover,.leverThird:hover{
    background-color: #f5f7fa;
  }
  .leverFirst ,.leverSecond,.leverThird {
    /* display: flex; */
    display: block;
    align-items: center;
    height: 26px;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    cursor: default;
    background: #fff;
    color: #606266;
  }
  .leverSecond{
    margin-left: 18px;
  }
  .leverThird{
    margin-left:36px;
  }
  .el-icon-caret-right,.el-icon-caret-bottom{
    cursor: pointer;
    color: #C0C4CC;
    font-size: 12px;
  }
</style>
