import { map, infoWindow } from './map.js'

const infoWindowCustom = function (opt) {
    const _this = this
    this.map = opt.map || map
    this.data = null
    this.title = opt.title
    this.width = (opt.width ? (opt.width + 'px') : 'auto')
    let btnHtml = ''
    if (opt.butsModel) {
        btnHtml = opt.butsModel(opt.buts, this.data)
    } else {
        opt.buts.forEach(function (item) {
            btnHtml += '\
                <a class="' + (opt.btnClass ? opt.btnClass : 'my_iw_btn') + '" href="javascript:void(0)">' + item + '</a>\
            '
        })
    }
    this.btnHtml = btnHtml
    opt.butClick && $('body').on('click', '.my_iw_btns a', function(){
        opt.butClick($.trim($(this).text()), _this.data)
    })
    $('body').on('click', '.amap-info-close', function(){
        _this.map.infoWindow.close()
    })
    this.render = opt.model || function(data){
        _this.data = data
        let table = ''
        for (let key in opt.field) {
            table += '<tr><td><span class="my_iw_title">'+ opt.field[key] +'</span>：<span class="my_iw_colon_1">'+ data[key] +'</span></td></tr>';
        }
        const content = '\
            <table>'+ table +'</table>\
        '
        return content
    }
}
infoWindowCustom.prototype.show = function(position, data){
    this.map.infoWindow.open(this.map, position)
    // const content = this.render(data)
    const content = '\
        <div class="my_infoWindow" style="width:'+ this.width +'">\
            <span class="weui-loadmore__tips" style="cursor: pointer;" id="infowindow_context_close">\
                <a href="javascript:void(0);" style="color: red;">&gt;&gt;</a>\
                <span id="infowindow_context_title">'+ this.title +'</span>\
                <a href="javascript:void(0);" style="color: red;">&lt;&lt;</a>\
                <a class="amap-info-close" href="javascript: void(0)">×</a>\
            </span>\
            <div class="my_iw_main">\
                '+ this.render(data) +'\
            </div>\
            <div class="my_iw_btns">'+ this.btnHtml +'</div>\
            <div class="my_iw_top"></div>\
            <div class="my_iw_bottom"></div>\
        </div>\
        <div class="my_iw_jt"></div>\
    '
    this.map.infoWindow.setContent(content)
}
infoWindowCustom.prototype.hide = function(){
    this.map.infoWindow.close()
}

export default infoWindowCustom
