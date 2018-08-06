import {map, contextMenu} from './map.js'

let feature = {}

feature.init = function (obj = {}) {
    this.isShow = true
    this.idKey = 'id'
    for (const key in obj) {
        this[key] = obj[key]
    }
    this.data = []
    this.idObject = {}
}

feature.remove = function () {
    map.remove(this.data)
    this.data.length = 0
    this.idObject = {}
}

feature.load = function (data) {
    this.onLoad && this.onLoad(this, data)
    this.remove()
    const _this = this
    data.forEach(function (item) {
        _this.add(item)
    })
}

feature.getById = function (id) {
    return this.idObject[id]
}

feature.del = function (item) {
    const idx = this.data.indexOf(item)
    if (idx !== -1) {
        const id = item.params[this.idKey]
        delete this.idObject[id]
        this.data[idx].setMap(null)
        this.data[idx] = null
        this.data.splice(idx, 1)
    } else {
        console.error('删除的对象不存在！')
    }
}

feature.delById = function (id) {
    const item = this.idObject[id]
    if (item) {
        const idx = this.data.indexOf(item)
        delete this.idObject[id]
        this.data[idx].setMap(null)
        this.data[idx] = null
        this.data.splice(idx, 1)
    } else {
        console.error('删除的对象不存在！')
    }
}

feature.add = function (params) {
    var _this = this
    this.onAdd && this.onAdd(params, this)
    const item = this.newFeature(params)
    if (!item) {
        return false
    }
    this.isShow && item.setMap(map)
    item.params = params
    item.del = function () {
        _this.del.bind(_this)(item)
    }

    if (this.onClick) {
        item.on('click', function (e) {
            _this.onClick(e.target)
        })
    }
    if (this.setContextMenu) {
        onContextMenu(item, this.setContextMenu)
    }
    if (this.onDragend) {
        item.on('dragend', function (e) {
            _this.onDragend(e.target)
        })
    }

    params[this.idKey] && (this.idObject[params[this.idKey]] = item)
    this.data.push(item)
}

function onContextMenu (obj, eventList) {
    obj.eventList = eventList
    obj.on('rightclick', function (e) {
        var items = contextMenu.get('items')
        if (items.length > 0) {
            contextMenu.set('items', [])
        }
        obj.eventList.forEach(function (item) {
            contextMenu.addItem(item.title, function () {
                item.callback(obj)
            }, item.i)
        })
        contextMenu.open(map, e.lnglat)
    })
}

export default feature
