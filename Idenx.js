//index.js<br>var util = require("../../utils/util.js");
//获取应用实例
var app = getApp();
Page({
  data: {
    hide1: true,
    hide2: false,
    hide3: false,
    hide4:true,
    userInfo: {},
    buttonLoading: false,
    accountData: [],
    accountData2: [],
    accountTotal: 0,
    accountTotal2: 0
  },
  // 改变页面
  change: function () {
    this.setData({
      hide1: !this.data.hide1,
      hide2: !this.data.hide2,

    });
  },
  onLoad: function () {
    var that = this;
    // 获取成就记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.caculateTotal(tempAccountData);
    this.setData({
      accountData: tempAccountData
    });
    // 获取欲望记录
    var tempAccountData2 = wx.getStorageSync("accountData2") || [];
    this.caculateTotal2(tempAccountData2);
    this.setData({
      accountData2: tempAccountData2
    });

  },
  // 计算成就总额
  caculateTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      tempTotal += parseFloat(data[x].amount);
    }
    this.setData({
      accountTotal: tempTotal
    });
  },
  // 计算欲望总额
  caculateTotal2: function (data2) {
    var tempTotal2 = 0;
    for (var x in data2) {
      tempTotal2 += parseFloat(data2[x].amount2);
    }
    this.setData({
      accountTotal2: tempTotal2
    });
  },
  //成就表单提交
  formSubmit: function (e) {
    this.setData({
      buttonLoading: true
    });


    var that = this;
    setTimeout(function () {
      var inDetail = e.detail.value.inputdetail;
      var inAmount = e.detail.value.inputamount;
      if (inDetail.toString().length <= 0 || inAmount.toString().length <= 0) {
        console.log("can not empty");
        that.setData({
          buttonLoading: false
        });
        return false;
      }

      //新增记录
      var tempAccountData = wx.getStorageSync("accountData") || [];
      tempAccountData.unshift({ detail: inDetail, amount: inAmount });
      wx.setStorageSync("accountData", tempAccountData);
      that.caculateTotal(tempAccountData);
      that.setData({
        accountData: tempAccountData,
        buttonLoading: false
      });


    }, 1000);
  },
  //欲望表单提交
  formSubmit2: function (a) {
    this.setData({
      buttonLoading: true
    });


    var that2 = this;
    setTimeout(function () {
      var inDetail2 = a.detail.value.inputdetail2;
      var inAmount2 = a.detail.value.inputamount2;
      if (inDetail2.toString().length <= 0 || inAmount2.toString().length <= 0) {
        console.log("can not empty");
        that2.setData({
          buttonLoading: false
        });
        return false;
      }

      //新增欲望记录
      var tempAccountData2 = wx.getStorageSync("accountData2") || [];
      tempAccountData2.unshift({ detail2: inDetail2, amount2: inAmount2 });
      wx.setStorageSync("accountData2", tempAccountData2);
      that2.caculateTotal2(tempAccountData2);
      that2.setData({
        accountData2: tempAccountData2,
        buttonLoading: false
      });


    }, 1000);
  },
  // 呈现历史记录
  showlist: function () {
    this.setData({
      hide3: !this.data.hide3,
      hide4: !this.data.hide4,
    });
  },
  //成就删除行
  deleteRow: function (e) {
    var that = this;
    var index = e.target.dataset.indexKey;
    var tempAccountData = wx.getStorageSync("accountData") || [];
    tempAccountData.splice(index, 1);
    wx.setStorageSync("accountData", tempAccountData);
    that.caculateTotal(tempAccountData);
    that.setData({
      accountData: tempAccountData,
    });
  },
  // 欲望删除行
  deleteRow2: function (a) {
    var that2 = this;
    var index2 = a.target.dataset.index2Key;
    var tempAccountData2 = wx.getStorageSync("accountData2") || [];
    tempAccountData2.splice(index2, 1);
    wx.setStorageSync("accountData2", tempAccountData2);
    that2.caculateTotal2(tempAccountData2);
    that2.setData({
      accountData2: tempAccountData2,
    });
  }
})

