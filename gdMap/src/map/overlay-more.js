import { Marker } from './marker.js'
import { extend } from './public.js'
import { map } from './map.js'

const markerTitleIpt = function (obj = {}) {
    let status
    let _map = obj.map || map
    $(document).off('blur', '.marker-title-ipt .marker-input')
    const keyDown = function(e){
        if (e.keyCode == 13 || e.keyCode == 108) {
            $(this).blur()
        }
    }
    $(document).on('blur', '.marker-title-ipt .marker-input', function(){
        _map.setStatus(status)
        const html = $(this).val() || '<span style="color: red">未定义标题</span>'
        var object = $(this).parent()[0].feature
        object.params[obj.titleKey || 'title'] = $(this).val()
        $(this).siblings('.marker-title').html(html).show().data('title', $(this).val() || '')
        $(this).remove()
        $(this).off('keydown', keyDown)
    })
    return {
        onAdd: function(params, e) {
            const title = params[obj.titleKey || 'title']
            params.$dom = $('<div class="marker-title-ipt">\
                    <img src="'+ (params.icon || obj.icon) +'">\
                    <p class="marker-title">\
                        '+ (title || '<span style="color: red">未定义标题</span>') +'\
                    </p>\
                </div>\
            ')
            params.$dom.find('.marker-title').data('title', title || '').click(function(){
                $(this).hide().after('<input class="marker-input" type="text">').siblings('input').val($(this).data('title')).on('keydown', keyDown)
                setTimeout(() => $(this).siblings('input')[0].focus())
                status = _map.getStatus()
                _map.setStatus(extend({}, status, {
                    dragEnable: false,
                    keyboardEnable: false
                }))
            })
            params[e.contentKey] = params.$dom[0]
        },
        onAddEnd: (item) => {
            item._params.$dom[0].feature = item
        }
    }
}

export { markerTitleIpt }
