package com.example.demo.controller;


import com.example.demo.common.Result;
import com.example.demo.entity.Admin;
import com.example.demo.service.AdminService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    /**
     * controller里的一个方法，它其实就是我们平常说的web项目的一个接口的入口
     * 可以在这个方法上再加上一个url
     * 也可以指定请求方式：GET POST PUT DELETE
     * @return
     */


    @Resource
    private AdminService adminService;

    @GetMapping("/start")
    public Result start(){
        return Result.success("欢迎来到！！！！");
    }

    @GetMapping("/getAdmin")
    public Result findAll(){
        List<Admin> list  = adminService.findAll();
        return Result.success(list);
    }


}
