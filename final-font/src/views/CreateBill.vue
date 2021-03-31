<template>
  <div class="layout">
    <div class="left-container">
      <el-form ref="newBillForm" :model="newBillForm" :rules="rules" label-width="100px" label-position="left" class="input-container">
        <el-form-item label="Date" prop="date" class="input-box">
          <el-date-picker
            v-model="newBillForm.date"
            type="date"
            placeholder="Please select date" size="small"
          />
        </el-form-item>
        <el-form-item label="Food" prop="food" class="input-box">
          <el-input v-model.number="newBillForm.food" size="small" />
        </el-form-item>
        <el-form-item label="Entertainment" prop="entertainment" class="input-box">
          <el-input v-model.number="newBillForm.entertainment" size="small" />
        </el-form-item>
        <el-form-item label="Transition" prop="transition" class="input-box">
          <el-input v-model.number="newBillForm.transition" size="small" />
        </el-form-item>
        <el-form-item label="Other" prop="other" class="input-box">
          <el-input v-model.number="newBillForm.other" size="small" />
        </el-form-item>
        <el-form-item label="Note" prop="note" class="input-box">
          <el-input v-model="newBillForm.note" size="small" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="prime" icon="el-icon-circle-plus-outline" round style="width: 100px;" @click="onCreatBill">add</el-button>
        <el-popover
          placement="top-start"
          width="250"
          trigger="hover"
          content="Each click of the button will randomly generate 10 records"
        >
          <el-button slot="reference" type="prime" @click="onAddTestData">Click To Add Test Data</el-button>
        </el-popover>
      </div>
    </div>
    <div class="right-container">
      <div class="select-container">
        <el-select v-model="timeFrame" placeholder="time frame" size="small" @change="onChangeTimeFrame">
          <el-option
            v-for="item in timeFrameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="chartType" placeholder="chart type" size="small" @change="onChangeType">
          <el-option
            v-for="item in chartTypeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div ref="chartContainer" class="chartContainer" />
    </div>
  </div>
</template>
<script>

export default {
  name: 'CreateBill',
  props: {
    chartData: {
      default: () => {},
      type: Array
    }
  },
  data() {
    return {
      myChart: null,
      names: ['food', 'entertainment', 'transition', 'other', 'total'],
      newBillForm: {
        date: '',
        food: 0,
        entertainment: 0,
        transition: 0,
        other: 0,
        note: ''
      },
      timeFrameOptions: [
        { value: 'week', label: 'LAST WEEK' },
        { value: 'month', label: 'LAST MONTH' },
        { value: 'year', label: 'LAST YEAR' }
      ],
      chartTypeoptions: [
        { value: 'line', label: 'LINE CHART' },
        { value: 'bar', label: 'BAR CHART' },
        { value: 'stack', label: 'STACK CHART' }
      ],
      timeFrame: 'week',
      chartType: 'line',
      rules: {
        date: [
          { type: 'date', required: true, message: 'Please select date', trigger: 'change' }
        ],
        food: [
          { type: 'number', message: 'Must be Number', trigger: 'change' }
        ],
        entertainment: [
          { type: 'number', message: 'Must be Number', trigger: 'change' }
        ],
        transition: [
          { type: 'number', message: 'Must be Number', trigger: 'change' }
        ],
        other: [
          { type: 'number', message: 'Must be Number', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chartContainer)
  },
  methods: {
    onAddTestData() {
      const userId = this.$store.state.userId
      const sopeRandom = (min, max) => {
        if (!max) {
          return Math.round(Math.random() * min)
        } else {
          return (Math.random() * (max - min)) + min
        }
      }
      const today = new Date().getTime()
      const lastTwoMonth = today - 24 * 60 * 3600 * 1000 * 2
      const newBillList = [...Array(10).keys()].map((item, index) => {
        return {
          userId,
          date: this.$moment(sopeRandom(lastTwoMonth, today)).format('YYYY-MM-DD'),
          food: sopeRandom(100),
          entertainment: sopeRandom(100),
          transition: sopeRandom(100),
          other: sopeRandom(100),
          note: `This is a random record ${index}`
        }
      })
      this.API.newBill(newBillList).then(() => {
        this.$message({
          message: 'success!',
          type: 'success'
        })
        this.$refs.newBillForm.resetFields()
        this.onChangeTimeFrame('week')
      })
    },
    onCreatBill() {
      this.$refs.newBillForm.validate((valid) => {
        if (valid) {
          const userId = this.$store.state.userId
          if (!userId) {
            this.$message.error('please login')
            return
          }
          this.API.newBill({
            userId,
            ...this.newBillForm,
            date: this.$moment(this.newBillForm.date).format('YYYY-MM-DD')
          }).then(() => {
            this.$message({
              message: 'success!',
              type: 'success'
            })
            this.$refs.newBillForm.resetFields()
            this.onChangeTimeFrame('week')
          })
        } else {
          return false
        }
      })
    },
    setChart(param) {
      let chartType = param && param.type
      let names = [...this.names]
      if (!chartType) {
        chartType = 'line'
      }
      if (chartType === 'stack' || chartType === 'bar') {
        names.pop()
      }
      const xData = []
      const series = names.map((item, index) => {
        return {
          name: item,
          type: chartType === 'stack' ? 'bar' : chartType,
          stack: 'stack',
          data: []
        }
      })
      this.chartData.forEach((item, outIndex) => {
        xData.push(item.date)
        series.forEach((serie, inIndex) => {
          serie.data.push(item[serie.name])
          serie.stack = chartType === 'stack' ? 'stack' : outIndex + '' + serie.name + '' + inIndex
        })
      })
      const option = {
        title: {
          text: ''
        },
        tooltip: {},
        series,
        legend: { data: names },
        yAxis: {},
        xAxis: { data: xData }
      }
      this.myChart.clear()
      this.myChart.setOption(option)
    },
    onChangeTimeFrame(e) {
      let dateTs = 0
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      if (e === 'week') {
        dateTs = new Date().getTime() - 24 * 3600 * 1000 * 7
      } else if (e === 'month') {
        dateTs = new Date(year + '-' + (month - 1) + '-' + day).getTime()
      } else if (e === 'year') {
        dateTs = new Date((year - 1) + '-' + month + '-' + day).getTime()
      }
      this.$emit('refresh-data', {
        dateTs
      })
      // this.getBillChart({
      //   dateTs
      // })
    },
    onChangeType(e) {
      this.setChart({ type: e })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .left-container{
        flex: 1;
        padding: 0 20px;
        .input-container{
            .input-text{
                display: inline-block;
                width: 100px;
            }
            .input-box{
                display: inline-block;
                width: 270px;
            }
        }
    }
    .right-container{
        flex: 1;
        .select-container{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .chartContainer{
            width: calc(100vw - 450px);
            height: calc(100vh - 100px - 113px);
        }
    }
}

</style>
<style>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 170px;
}
.el-form-item {
    margin-bottom: 18px;
}
</style>
