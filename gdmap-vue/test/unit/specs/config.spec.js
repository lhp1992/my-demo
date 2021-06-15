import * as util from '../util'
import Vue from 'vue'
import $$config from 'lhp-amap/packages/config'

describe('Config', () => {
  it('get', () => {
    let allOptions = $$config.get('default.all')
    expect(allOptions).to.have.deep.property('cursor', 'pointer')
    expect(allOptions).to.have.deep.property('strokeWeight', 2)
    expect(allOptions).to.have.deep.property('strokeColor', "#1791fc")
  })

  it('set', () => {
    $$config.set('default.polyline', {
      strokeStyle: 'dashed'
    })
    let polyline = $$config.get('default.polyline')
    expect(polyline).to.have.deep.property('strokeStyle', 'dashed')
  })

  it('getOptions', () => {
    let polyline = $$config.getOptions('polyline')
    expect(polyline).to.have.deep.property('strokeStyle', 'dashed')
    expect(polyline).to.have.deep.property('cursor', 'pointer')
    expect(polyline).to.have.deep.property('strokeWeight', 2)
  })

  it('getEditor', () => {
    let polyline = $$config.getEditor('polyline')
    expect(polyline).to.have.deep.property('strokeStyle', 'dashed')
    expect(polyline).to.have.deep.property('fillColor', 'red')
    expect(polyline).to.have.deep.property('fillOpacity', 0.3)
  })
})