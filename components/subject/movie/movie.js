// pages/components/movie/movie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   *
   */
  data: {
    topbtndata: [{
        image: "../../../assets/images/find_movie.png",
        title: "找电影"
      },
      {
        image: "../../../assets/images/douban_top.png",
        title: "豆瓣榜单"
      },
      {
        image: "../../../assets/images/douban_guess.png",
        title: "豆瓣猜"
      },
      {
        image: "../../../assets/images/douban_film_list.png",
        title: "豆瓣片单"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTopTab: function (e) {
      var index = e.currentTarget.dataset.index
      console.log("当前点击的按钮是", index)
    }
  }
})