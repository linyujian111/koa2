/*
 * @Description: 数据库连接
 * @Author: hai-27
 * @Date: 2020-03-14 22:21:48
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-15 02:12:41
 */
// var mysql = require('mysql');
var sqlserver = require('mssql');
const { dbConfig } = require('../config.js');
// var pool = mysql.createPool(dbConfig);



let db = {

  /**
   * 添加
   * */
  insert: (data, insertTable, callback) => {
    sqlserver.table(insertTable);
    sqlserver.data(data);
    sqlserver.insert(function (results) {
      callback(results);
    }, function (err, sql) {
      if (err) {
        console.log(err);
      }
    });
  },
  
  /**
  * 条件查询
  * */
  list: (successCallback, option, listTable) => {
    sqlserver.table(listTable);
    sqlserver.where(option);
    sqlserver.select(function (results) {
      successCallback(results);
    }, function (err, sql) {
      if (err)
        console.log(err);
    });
  },


  /**
  * 修改
  * */
  update: (data, option, updateTable, successCallback) => {
    sqlserver.table(updateTable);
    sqlserver.data(data);
    sqlserver.where(option);

    sqlserver.update(function (results) {
      successCallback(results);
    }, function (err, sql) {
      if (err)
        console.log(err);
      //console.log(sql);
    });

  },
  del: (ids, table, successCallback, failedCallback) => {
    sqlserver.query("delete from " + table + " where serno in ( " + ids + " )", successCallback, failedCallback);
  },

  /**
* 模糊查询
* */
  list_sql: (sql, successCallback) => {
    sqlserver.query(sql, successCallback, function (err) {
      console.log(err);
    });
  },

  /**
*分页查询
* */

list_sqlPage : (sql, rows, page, successCallback) =>{
  sqlserver.query(sql, rows, page, successCallback, function (err) {
    console.log(err);
  })
},

/**
* 统计
* */

total:(sql, callback)=>{
  sqlserver.query(sql, callback, function (err) {
    console.log(err);
  });
},

/**
* 根据ID查询
* */

findUserById : (sql, successCallback, failedCallback)=> {
  sqlserver.query(sql, successCallback, failedCallback);
},


};





// db.query = function (strsql) {
//   return new Promise((resolve, reject) => {

//     sqlserver.connect(dbConfig).then(function () {
//       var req = new sqlserver.Request().query(strsql).then(function (recordset) {
//         resolve(recordset);
//       })
//         .catch(function (err) {
//           reject(err);
//         });
//     })
//       .catch(function (err) {
//         reject(err);
//       });

//   });
// };


// var pool = mysql.connect(dbConfig);

// var db = {};

// db.query = function (sql, params) {

//   return new Promise((resolve, reject) => {
//     // 取出链接
//     pool.getConnection(function (err, connection) {

//       if (err) {
//         reject(err);
//         return;
//       }

//       connection.query(sql, params, function (error, results, fields) {
//         console.log(`${ sql }=>${ params }`);
//         // 释放连接
//         connection.release();
//         if (error) {
//           reject(error);
//           return;
//         }
//         resolve(results);
//       });

//     });
//   });
// }
// 导出对象
module.exports = db;
