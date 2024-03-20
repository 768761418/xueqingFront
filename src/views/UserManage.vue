<!--相当于 AdminView.vue-->
<template>
  <div>

    <div style="margin-bottom: 20px;">
      <el-input v-model="params.user_name" style="width: 125px"
        placeholder="用户名"></el-input>
      <el-button type="primary" style="margin-left: 10px"
        @click="findById()">查询</el-button>
      <el-button type="primary" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()">新增</el-button>
    </div>

    <!-- 信息表格 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="userId" label="用户ID"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="userPass" label="用户密码"></el-table-column>
      <el-table-column prop="userRegisterDay" label="注册时间"></el-table-column>
      <el-table-column prop="userMail" label="邮箱"></el-table-column>
      <!-- <el-table-column prop="user_type" label="用户种类"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <!-- <el-button type="danger">删除</el-button> -->
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
          <el-form-item label="用户ID" label-width="15%">
            <el-input v-model="form.userId" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="用户名" label-width="15%">
            <el-input v-model="form.userName" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" label-width="15%">
            <el-input v-model="form.userPass" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" label-width="15%">
            <el-input v-model="form.userRegisterDay" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="15%">
            <el-input v-model="form.userMail" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户种类" label-width="15%">
            <el-input v-model="form.user_type" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item> -->
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
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      params: {
        user_name: '',
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
      // request.get("/admin/user").then(res => {
      //   if (res.code === '0') {
      //     this.tableData = res.data;
      //     this.total = 13;
      //   }
      axios({
        method: "get",
        url: "/tbUser/list/1/20"

      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },

    //搜索
    findBySearch() {
      // request.get("/admin/user/search", {
      //   params: this.params
      // }).then(res => {
      //   if (res.code === '0') {
      //     this.tableData = res.data.list;
      //     this.total = res.data.total;
      //   } else {

      //   }
      // })
      console.log(this.params)
      axios({
        method: "get",
        url: "/tbUser/search/",
        params: {
          key: "user_name",
          page: this.params.pageNum,
          size: this.params.pageSize,
          value: this.params.user_name
        }
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },
    findById() {
      // request.get("/admin/user/searchbyid", {
      //   params: this.paramid
      // }).then(res => {
      //   if (res.code === '0') {
      //     this.tableData = res.data;
      //   } else {

      //   }
      // })
      console.log(this.params)
      axios({
        method: "get",
        url: "/tbUser/search/",
        params: {
          key: "user_name",
          page: 1,
          size: 20,
          value: this.params.user_name
        }
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },

    //清空输入框
    reset() {
      this.paramid = { id: '' },
        this.params = {
          user_name: '',
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
      request.delete("/admin/user/" + id).then(res => {
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
      let newObj = JSON.parse(JSON.stringify(obj))
      this.form = newObj;
      this.dialogFormVisible = true;
    },
    submit() {
      console.log(this.form)
      axios({
        method: "post",
        url: "/tbUser/update",
        data: this.form
      }).then(res => {
        console.log(res)
        if (res.data.mess == "success") {
          this.$message.success("修改成功")
          this.findBySearch();
          this.dialogFormVisible = false;
        } else {
          this.$message.error("修改失败")
        }
      })



    }
  }

}
  </script>
  