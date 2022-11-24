module.exports = Behavior({
  data: {
    sharedText: 'This is a piece of data shared between pages.'
  },
  methods: {
    sharedMethod: function() {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    }
  }
})

// 页面可以引用 behaviors 。 behaviors 可以用来让多个页面有相同的数据字段和方法。