package com.example.demo.dao_mapper;

import com.example.demo.entity.Admin;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

@Repository
public interface AdminDao extends Mapper<Admin> {
    // 1. 基于注解的方式
//    @Select("select * from admin")
//    List<Admin> getUser();


    //2.基于xml方式写---去对应的xml文件描写
    //List<Admin> getUser();


    //3.使用引入的包--在userService里面写

}
