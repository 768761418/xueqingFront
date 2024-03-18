package com.example.demo.service;

import com.example.demo.dao_mapper.AdminDao;
import com.example.demo.entity.Admin;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Resource
    private AdminDao adminDao;

    public List<Admin> findAll() {
        //1.2种方法都是通过userDao的getUser()方法实现的
        //return AdminDao.getUser();


        // 3. 通过--使用引入的包
        return adminDao.selectAll();
    }
}
