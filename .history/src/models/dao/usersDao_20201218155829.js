/*
 * @Description: 用户模块数据持久层
 * @Author: hai-27
 * @Date: 2020-03-14 23:26:24
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 00:15:49
 */
const db = require('../db.js');

module.exports = {
  // 连接数据库根据用户名和密码查询用户信息
  Login: async (userName, password) => {
    const sql = 'select * from users where userName = ? and password = ?';
    return await db.query(sql, [userName, password]);
  },
  // 连接数据库根据用户名查询用户信息
  FindUserName: async (userName) => {
    const sql = 'select * from users where userName = ?';
    return await db.query(sql, [userName]);
  },
  // 连接数据库插入用户信息
  Register: async (userName, password) => {
    const sql = 'insert into users values(null,?,?,null)';
    return await db.query(sql, [userName, password]);
  },
  // 连接数据库插入用户信息
  search: async () => {

    var sql = "select * from test11;"
    db(sql).then(res=>{
   
      return res;
    }).catch(err=>{
      return err;
    })

    // const sql = 'select * from test11';
    // return await db.query(sql);
  }
}