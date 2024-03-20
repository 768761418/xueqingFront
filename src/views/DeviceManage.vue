<!--相当于 AdminView.vue-->
<template>
  <div>

    <div style="margin-bottom: 20px;">
      <el-input v-model="params.name" style="width: 125px" placeholder="直播ID"></el-input>
      <el-button type="primary" style="margin-left: 10px"
        @click="findBySearch()">查询</el-button>
      <el-button type="primary" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()">新增</el-button>
    </div>

    <!-- 信息表格 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="device_id" label="直播ID"></el-table-column>
      <el-table-column prop="device_title" label="标题"></el-table-column>
      <el-table-column prop="device_start" label="开始时间"></el-table-column>
      <el-table-column prop="device_end" label="结束时间"></el-table-column>
      <el-table-column prop="device_creation" label="创建时间"></el-table-column>
      <el-table-column prop="device_state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger">删除</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
            <el-button slot="reference" type="danger"
              style="margin-left: 5px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 10px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="params.pageNum" :page-sizes="[5, 10, 15, 20]"
        :page-size="params.pageSize" layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <div>
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="直播ID" label-width="15%">
            <el-input v-model="form.device_id" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="标题" label-width="15%">
            <el-input v-model="form.device_title" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" label-width="15%">
            <el-input v-model="form.device_start" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" label-width="15%">
            <el-input v-model="form.device_end" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" label-width="15%">
            <el-input v-model="form.device_creation" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="状态" label-width="15%">
            <el-input v-model="form.device_state" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
  
  <script>
//   import request from '@/utils/request';

export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      params: {
        device_id: '',
        pageNum: 1,
        pageSize: 20
      },
      paramid: {
        id: '',
      },
      total: 0,
      dialogFormVisible: false,////第二层界面是否可见
      form: {}
    }
  },

  //页面加载的时候，做的一些事情，在create()里面
  created() {
    this.load();
  },

  methods: {
    load() {
      request.get("/admin/class").then(res => {
        if (res.code === '0') {
          this.tableData = res.data;
          this.total = 13;
        }
      })
    },

    //搜索
    findBySearch() {
      request.get("/admin/device/search", {
        params: this.params
      }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {

        }
      })
    },
    findById() {
      request.get("/admin/device/searchbyid", {
        params: this.paramid
      }).then(res => {
        if (res.code === '0') {
          this.tableData = res.data;
        } else {

        }
      })
    },

    //清空输入框
    reset() {
      this.paramid = { id: '' },
        this.params = {
          name: '',
          phone: '',
          pageNum: 1,
          pageSize: 20,
        }
      this.load();
    },

    //分页
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.findBySearch();
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.findBySearch();
    },

    //删除
    del(id) {
      request.delete("/admin/device/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.findBySearch();
        } else {
          this.$message({
            message: res.msg,
            type: 'success'
          });
        }
      })
    },

    //添加
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    edit(obj) {
      this.form = obj;
      this.dialogFormVisible = true;
    },
    submit() {
      request.post("/admin/device/add", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "成功",
            type: 'success',
          })
          this.dialogFormVisible = false;
          this.findBySearch();
        } else {
          this.$message({
            message: res.message,
            type: 'success',
          })
        }

      })



    }
  }

}
  </script>
  