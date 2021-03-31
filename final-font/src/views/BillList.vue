<template>
  <div class="layout">
    <div class="left-container">
      <el-table :data="tableData" style="width: 100%;height: 100%;">
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="food" label="Food" />
        <el-table-column prop="entertainment" label="Entertainment" />
        <el-table-column prop="transition" label="Transition" />
        <el-table-column prop="other" label="Other" />
        <el-table-column prop="total" label="Total" />
        <el-table-column prop="note" label="Note" />
        <el-table-column label="Operation" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">View</el-button>
            <el-button type="text" size="small" @click="onDetail(scope.row)">Detail</el-button>
            <el-button type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right-container">
      <div ref="chartContainer" class="chartContainer" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'BillList',
  props: {
    chartData: {
      default: () => {},
      type: Array
    }
  },
  data() {
    return {
      myChart: null,
      tableData: [],
      dataMap: {}
    }
  },
  watch: {
    chartData: {
      handler(newValue, oldValue) {
        this.tableData = newValue.map(item => {
          item && (this.dataMap[item._id] = {
            ...item
          })
          return {
            ...item
          }
        })
        this.setChart()
      },
      deep: true
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chartContainer)
    // this.getBillChart()
    this.tableData = this.chartData.map(item => {
      item && (this.dataMap[item._id] = {
        ...item
      })
      return {
        ...item
      }
    })
  },
  methods: {
    onDetail(row) {
      this.setChart(row._id)
    },
    setChart(id) {
      let option
      if (!id) {
        id = this.chartData[0]._id
      }
      const temp = this.dataMap[id]
      const data = [
        { value: temp.food, name: 'Food' },
        { value: temp.entertainment, name: 'Entertainment' },
        { value: temp.transition, name: 'Transition' },
        { value: temp.other, name: 'Other' }
      ]
      this.myChart.clear()
      this.myChart.setOption({
        title: {
          text: `Bill On ${temp.date}`,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 20,
          top: 20,
          bottom: 20
        },
        series: [
          {
            name: '',
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            data
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
    display: flex;
    justify-content: space-between;
    .left-container{
        flex: 1;
        padding: 0 20px;
        width: 50vw;
        height: calc(100vh - 100px - 71px);
    }
    .right-container{
        flex: 1;
        .chartContainer{
            width: 50vw;
            height: calc(100vh - 100px - 71px);
        }
    }
}
</style>
<style>
.el-table__body-wrapper{
    overflow: auto;
    height: calc(100% - 70px);
    /* height: 100%; */
}
</style>
