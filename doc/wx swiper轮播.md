# 微信Swiper轮播组件
```html
<swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" circular="{{circular}}" vertical="{{vertical}}" interval="{{interval}}" duration="{{duration}}" previous-margin="{{previousMargin}}px" next-margin="{{nextMargin}}px" bindchange="change">
      <block wx:for="{{banners}}" wx:key="{{index}}">
        <swiper-item>
          <navigator url="/pages/webview/webview?link= {{item.url}}">
            <view class="banner {{skinStyle}}-box">
              <image src="{{item.imagePath}}" />
            </view>
          </navigator>
        </swiper-item>
      </block>
</swiper>
```
swiper对应属性：
- `indicator-dots="{{indicatorDots}}"` 是否显示面板指示点
- `autoplay="{{autoplay}}"` 是否自动切换
- `circular="{{circular}}"` 是否采用衔接滑动
- `vertical="{{vertical}}"` 滑动方向是否为纵向
- `interval="{{interval}}"` 自动切换时间间隔
- `duration="{{duration}}"` 滑动动画时长
- `previous-margin="{{previousMargin}}px"` 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
- `next-margin="{{nextMargin}}px"` 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
- `bindchange="change"` current 改变时会触发 change 事件，event.detail = {current, source}
```javascript
// 这可以监听当前轮播滚动的index
 change:function(e){
    //console.log("e.detail.current：" + e.detail.current)
    this.setData({
      current: e.detail.current
    })
  }
```




