import { map, contextMenu } from './map.js'
import { extend, isArray } from './public.js'

let feature = {}

feature.init = function (obj = {}) {
    this.isShow = true
    this.idKey = 'id'
    for (const key in obj) {
        this[key] = obj[key]
    }
    !this.map && (this.map = map)
    this.data = []
    this.idObject = {}
}

feature.remove = function () {
    this.editorClose && this.editorClose()
    this.map.contextMenu && this.map.contextMenu.close()
    this.map.remove(this.data)
    this.data.length = 0
    this.idObject = {}
}

feature.load = function (data) {
    this.onLoad && this.onLoad(this, data)
    this.remove()
    data.forEach(item => this.add(item))
}

feature.showAll = function () {
    this.data.forEach(function (item) {
        item.show()
    })
}

feature.hideAll = function () {
    this.data.forEach(function (item) {
        item.hide()
    })
}

feature.getById = function (id) {
    return this.idObject[id]
}

feature.del = function (item) {
    if (this.editorObj === item) {
        this.editorClose()
    } else {
        item.editorFeature && item.editorFeature.close()
    }
    const idx = this.data.indexOf(item)
    if (idx !== -1) {
        const id = item.params[this.idKey]
        if (isArray(this.idObject[id])) {
            if (this.idObject[id].length > 1) {
                const _index = this.idObject[id].indexOf(item)
                this.idObject[id].splice(_index, 1)
            } else {
                delete this.idObject[id]
            }
        } else {
            delete this.idObject[id]
        }
        this.data[idx].setMap(null)
        this.data[idx] = null
        this.data.splice(idx, 1)
    } else {
        console.error('删除的对象不存在！')
    }
}

feature.delById = function (id) {
    const items = this.idObject[id]
    if (items) {
        if (isArray(items)) {
            items.forEach(item => {
                const idx = this.data.indexOf(item)
                this.data[idx].setMap(null)
                this.data[idx] = null
                this.data.splice(idx, 1)
            })
            delete this.idObject[id]
        } else {
            const idx = this.data.indexOf(items)
            this.data[idx].setMap(null)
            this.data[idx] = null
            this.data.splice(idx, 1)
            delete this.idObject[id]
        }
    } else {
        console.error('删除的对象不存在！')
    }
}

feature.add = function (_params) {
    var params = extend(true, {}, _params)
    var _this = this
    this.onAdd && this.onAdd(params, this)
    const item = this.newFeature(params)
    if (!item) {
        return false
    }
    this.isShow && item.setMap(this.map)
    item.params = _params
    item._params = params
    item.del = function () {
        _this.del.bind(_this)(item)
    }
    if (this.isEditor) {
        item.editor = function () {
            _this.editor.bind(_this)(item)
        }
    }
    if (this.onEvent) {
        for (let key in this.onEvent) {
            item.on(key, function (e) {
                _this.onEvent[key](e.target)
            })
        }
    }
    if (this.setContextMenu) {
        onContextMenu.bind(this)(item, this.setContextMenu)
    }
    if (this.onClick) {
        item.on('click', function (e) {
            _this.onClick(e.target)
        })
    }
    if (params[this.idKey]) {
        if (this.isArray) {
            if(!this.idObject[params[this.idKey]]) this.idObject[params[this.idKey]] = []
            this.idObject[params[this.idKey]].push(item)
        } else {
            this.idObject[params[this.idKey]] = item
        }
    }

    this.data.push(item)
    this.onAddEnd && this.onAddEnd(item, this)
    return item
}

function onContextMenu (obj, eventList) {
    var _this = this
    obj.eventList = eventList
    obj.on('rightclick', function (e) {
        var items = _this.map.contextMenu.get('items')
        if (items.length > 0) {
            _this.map.contextMenu.set('items', [])
        }
        obj.eventList.forEach(function (item) {
            _this.map.contextMenu.addItem(item.title, function () {
                item.callback(obj)
            }, item.i)
        })
        _this.map.contextMenu.open(_this.map, e.lnglat)
    })
}

export default feature
