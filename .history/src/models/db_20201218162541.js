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



let  db={

/**
 * 添加
 * */
  insert:(data, insertTable,callback)=>{
    queryObj.table(insertTable);
    queryObj.data(data);
    queryObj.insert(function (results) {
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
  list:(successCallback, option, listTable)=>{
    queryObj.table(listTable);
    queryObj.where(option);
    queryObj.select(function (results) {
        successCallback(results);
    }, function (err, sql) {
        if (err)
            console.log(err);
    });
  },


/**
* 修改
* */
  update:(data, option, updateTable,successCallback)=>{
    queryObj.table(updateTable);
    queryObj.data(data);
    queryObj.where(option);
  
    queryObj.update(function (results) {
        successCallback(results);
    }, function (err, sql) {
        if (err)
            console.log(err);
        //console.log(sql);
    });
  
  },
  del:(ids, table,successCallback,failedCallback)=>{
    queryObj.query("delete from " + table + " where serno in ( " + ids + " )",successCallback,failedCallback);
  },

  /**
* 模糊查询
* */
  list_sql :(sql,successCallback)=>{
  queryObj.query(sql, successCallback,function(err){
      console.log(err);
  });
}
};








var 

/**
*分页查询
* */
var  list_sqlPage = function(sql,rows,page,successCallback){
  queryObj.query(sql,rows,page,successCallback,function (err){
      console.log(err);
  })
}


/**
* 统计
* */
var total = function(sql,callback){
  queryObj.query(sql,callback,function(err){
      console.log(err);
  });
};

/**
* 根据ID查询
* */
var findUserById = function(sql,successCallback,failedCallback){
  queryObj.query(sql,successCallback,failedCallback);
};

db.query = function (strsql) {
  return new Promise((resolve, reject) => {

    sqlserver.connect(dbConfig).then(function () {
      var req = new sqlserver.Request().query(strsql).then(function (recordset) {
        resolve(recordset);
      })
        .catch(function (err) {
          reject(err);
        });
    })
      .catch(function (err) {
        reject(err);
      });

  });
};


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
