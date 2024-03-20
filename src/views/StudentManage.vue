<!--相当于 AdminView.vue-->
<template>
  <div>
    <!-- 搜索表单 -->
    <!-- <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入学号"></el-input>
      <el-input style="width: 240px; margin-left:10px" placeholder="请输入姓名"></el-input>
      <el-input style="width: 240px; margin-left:10px" placeholder="请输入电话号码"></el-input>
      <el-button style="margin-left: 10px" type="primary"><i class="el-icon-search"></i>查询</el-button>
      <el-button style="margin-left: 10px" type="danger"><i class="el-icon-delete"></i>清空</el-button>
      <el-button style="margin-left: 10px" type="warning"><i class="el-icon-plus"></i>新增</el-button>
    </div> -->

    <div style="margin-bottom: 20px;">
      <el-input v-model="paramid.id" style="width: 125px" placeholder="请输入学号"></el-input>
      <el-button type="primary" style="margin-left: 10px"
        @click="findById()">查询</el-button>
      <el-button type="primary" @click="reset()">清空</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="add()">新增</el-button>
    </div>
    <!-- <div style="margin-bottom: 20px;">
      <el-input v-model="params.name" style="width: 125px" placeholder="姓名"></el-input>
      <el-input v-model="params.phone" style="width: 125px; margin-left: 5px"
        placeholder="电话"></el-input>
      <el-button type="primary" style="margin-left: 10px"
        @click="findBySearch()">查询</el-button>
      <el-button type="primary" @click="reset()">清空</el-button>
    </div> -->

    <!-- 信息表格 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="stuId" label="学号" width="100"></el-table-column>
      <el-table-column prop="stuName" label="学生姓名" width="150"></el-table-column>
      <el-table-column prop="stuClass" label="学生班级" width="150"></el-table-column>
      <el-table-column prop="stuSex" label="学生性别" width="100"></el-table-column>
      <el-table-column prop="stuAge" label="学生年龄" width="100"></el-table-column>
      <el-table-column prop="stuPhone" label="学生电话"></el-table-column>
      <el-table-column prop="stuPathf" label="学生住址"></el-table-column>
      <el-table-column prop="stuPath" label="学生照片"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div style="display: flex;flex-direction: row;">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
              <el-button slot="reference" type="danger"
                style="margin-left: 5px">删除</el-button>
            </el-popconfirm>
          </div>
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
          <el-form-item label="学号" label-width="15%">
            <el-input v-model="form.stuId" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名" label-width="15%">
            <el-input v-model="form.stuName" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="学生班级" label-width="15%">
            <el-input v-model="form.stuClass" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="学生性别" label-width="15%">
            <el-radio v-model="form.stuSex" label="男">男</el-radio>
            <el-radio v-model="form.stuSex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="学生年龄" label-width="15%">
            <el-input v-model="form.stuAge" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="学生电话" label-width="15%">
            <el-input v-model="form.stuPhone" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="学生住址" label-width="15%">
            <el-input v-model="form.stuPathf" autocomplete="off"
              style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="学生照片" label-width="15%">
            <el-input v-model="form.stuPath" autocomplete="off"
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
import { getStudentList } from '@/api';
import axios from 'axios';
export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      params: {
        stu_name: '',
        stu_tel: '',
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
      axios({
        method: "get",
        url: "/stu/list/1/20"

      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },

    //搜索
    findBySearch() {
      console.log(this.params)
      axios({
        method: "get",
        url: "/stu/search/",
        params: {
          page: this.params.pageNum,
          size: this.params.pageSize,
          value: ""
        }
      }).then(res => {
        console.log(res.data.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },
    findById() {
      console.log(this.paramid.id)
      axios({
        method: "get",
        url: "/stu/search",
        params: {
          key: "stu_id",
          page: 1,
          size: 20,
          value: this.paramid.id
        }

      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },

    //清空输入框
    reset() {
      this.paramid = { id: '' },
        this.params = {
          id: '',
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
      // request.delete("/admin/" + id).then(res => {
      //   if (res.code === '0') {
      //     this.$message({
      //       message: '删除成功',
      //       type: 'success'
      //     });
      //     this.findBySearch();
      //   } else {
      //     this.$message({
      //       message: res.msg,
      //       type: 'success'
      //     });
      //   }
      // })
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
      // request.post("/admin/add", this.form).then(res => {
      //   if (res.code === '0') {
      //     this.$message({
      //       message: "成功",
      //       type: 'success',
      //     })
      //     this.dialogFormVisible = false;
      //     this.findBySearch();
      //   } else {
      //     this.$message({
      //       message: res.message,
      //       type: 'success',
      //     })
      //   }
      // })
      console.log(this.form)
      axios({
        method: "post",
        url: "/stu/update",
        data: this.form
      }).then(res => {
        console.log(res)
        if (res.data.mess == "success") {
          this.$message.success("修改成功")
          this.findById();
          this.dialogFormVisible = false;
        } else {
          this.$message.error("修改失败")
        }
      })
    }
  }

}
  </script>
  