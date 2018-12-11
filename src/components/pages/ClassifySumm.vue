<template>
<section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-select v-model="filters.collectorID" placeholder="" @focus="geCollector()" >
          <el-option v-for="item in collectors"
               :key="item.collectorid"
               :label="item.name"
               :value="item.collectorid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="filters.timeTypeValue" name="timeType">
           <el-option
            v-for="item in timeTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="block" v-if="this.filters.timeTypeValue == 0">
          <el-date-picker
            v-model="filters.startTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span>——</span>
          <el-date-picker
            v-model="filters.endTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="block" v-if="this.filters.timeTypeValue == 1">
          <span class="demonstration">年</span>
          <el-date-picker
            v-model="filters.year"
            format="yyyy"
            value-format="yyyy"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="handleQuery" icon="el-icon-search">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="handleAdd" icon="el-icon-download">导出</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <el-card class="box-card" style="height:320px;">
    <div slot="header" class="clearfix" style="text-align: left;">
      <span style="color:#2DC3D0;"><i class="el-icon-info"></i> <b>能耗分类汇总统计表</b> </span>
    </div>
    <div class="text item">
      <el-table style="width: 100%; margin-top: 20px" stripe border
        highlight-current-row v-loading="pageLoading" align="center">
        <el-table-column label="能源种类" prop="collector" style="height:50px">
        </el-table-column>
        <el-table-column label="实物量" prop="collector" style="height:50px">
        </el-table-column>
        <el-table-column label="计量单位" prop="collector" style="height:50px">
        </el-table-column>
        <el-table-column label="折标系数" prop="collector" style="height:50px">
        </el-table-column>
        <el-table-column label="当量值" prop="collector" style="height:50px">
          <el-table-column label="折标准煤(吨标准煤)" prop="collector" style="height:50px">
          </el-table-column>
          <el-table-column label="占比(%)" prop="collector" style="height:50px">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </el-card>

  <el-card class="box-card" style="width:49.85%;height: 420px;float:left;margin-top: 8px;">
    <div slot="header" class="clearfix" style="text-align: left;">
      <span style="color:#2DC3D0;"><i class="el-icon-info"></i> <b>分项占比</b> </span>
    </div>
    <div class="text item">
      
    </div>
  </el-card>
  <el-card class="box-card" style="width:49.85%;height: 420px;float:right;margin-top: 8px;">
    <div slot="header" class="clearfix" style="text-align: left;">
      <span style="color:#2DC3D0;"><i class="el-icon-info"></i> <b>分级占比</b> </span>
    </div>
    <div class="text item">
      
    </div>
  </el-card>

  
  <!--底部-->
  <!-- <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
    </el-pagination>
  </el-col> -->

</section>
</template>

<script>

let data = () => {
  return {
    //页码
    page: 1,
    //每页数量
    size: 20,
    //总数
    total: 0,
    //查询条件
    filters: {
      collectorID: '',
      timeTypeValue: '0' ,
      startTime: new Date().getFullYear()+'-'+new Date().getMonth()+"-"+new Date().getDay(),
      endTime: new Date().getFullYear()+'-'+new Date().getMonth()+"-"+new Date().getDay()
    },
    //页面数据
    rows: [],
    //页面载入状态
    pageLoading: false,
    //列表高度
    clientHeight: '100%',
    collectors : [],
    timeTypeOptions: [{
          value: '0',
          label: '自定义',
        }, {
          value: '1',
          label: '月'
        }, {
          value: '2',
          label: '年'
        }]

  }
}

let handleAdd = function() {

}

let handleEdit = function(index, row) {

}

let handleDelete = function(index, row) {

}

let getRows = function() {
  if (this.pageLoading)
    return
  this.pageLoading = true

  //调用post请求
  const url ='/gradeSubentry';
  var params = new URLSearchParams();
  params.append('collectorID', this.filters.collectorID);       //你要传给后台的参数值 key/value
  if (this.filters.timeTypeValue == 0) {
    params.append('startTime', this.filters.startTime);
    params.append('endTime', this.filters.endTime);
  } else if (this.filters.timeTypeValue == 1) {
    params.append('startTime', this.filters.startTime);
  } else {
    params.append('time', '');
  }
  params.append('timeType', this.filters.timeTypeValue);
  this.$axios({
    method: 'post',
    url:url,
    data:params
  }).then((res)=>{
   this.pageLoading = false

    if(res.data.code === 403) {
      this.common.notywarn(
        this.$notify,
        res.data.code,
        res.data.msg
      );
      this.$router.replace({ path: "/" });
    }

    if (!res.data || !res.data.data)
      return
    //总数赋值
    this.total = res.data.data.total
    this.page++;
    //页面元素赋值
    this.rows = res.data.data;
  }).catch(e => this.pageLoading = false)
}

let handleQuery = function() {
  this.getRows()
}

let handleCurrentChange = function(val) {
  this.page = val
  this.getRows()
}

let initHeight = function() {
  this.clientHeight = (document.documentElement.clientHeight - 258) + 'px'
}

let geCollector = function() {
  this.$axios({
            method: 'get',
            url:"/getCollector",
            data:null,
        }).then((res)=>{
            this.collectors = res.data.data;
        });
}

export default {
  data: data,
  methods: {
    //查询
    handleQuery,
    //添加
    handleAdd,
    //修改
    handleEdit,
    //删除
    handleDelete,
    //页数改变
    handleCurrentChange,
    //获取分页
    getRows,
    //获取所有集中器列表
    geCollector,
    //初始化高度
    initHeight,
    //改变行样式
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => {
         return Number(item.timeValue[column.property.split('.')[1]])
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.initHeight)
    this.initHeight()
    this.getRows()
  }
}
</script>

<style>
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
