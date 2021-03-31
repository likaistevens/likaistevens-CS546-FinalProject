<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="onChangeTab">
      <el-tab-pane name="createBill">
        <span slot="label"><i class="el-icon-date" /> New Bill</span>
        <CreateBill ref="refCreateBill" :chart-data="chartData" @refresh-data="getBillChartData" />
      </el-tab-pane>
      <el-tab-pane name="billList">
        <span slot="label"><i class="el-icon-date" /> All Bills</span>
        <BillList ref="refBillList" :chart-data="chartData" @refresh-data="getBillChartData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreateBill from './CreateBill'
import BillList from './BillList'

export default {
  name: 'Bill',
  components: { CreateBill, BillList },
  data() {
    return {
      chartData: [],
      activeName: 'createBill'
    }
  },
  mounted() {
    this.getBillChartData({
      dateTs: new Date().getTime() - 24 * 3600 * 1000 * 7
    })
  },
  methods: {
    getBillChartData(params) {
      const userId = this.$store.state.userId
      if (!userId) {
        this.$message.error('please login')
        return
      }
      this.API.getBillChart({
        userId,
        ...params
      }).then(res => {
        this.chartData = res.data
        this.$nextTick(() => {
          this.onChangeTab()
        })
      })
    },
    onChangeTab() {
      if (this.activeName === 'createBill') {
        this.$refs.refCreateBill.setChart()
      } else if (this.activeName === 'billList') {
        this.$refs.refBillList.setChart()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
