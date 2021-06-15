import Editor from './src/main.vue';
import EditorMarker from './src/marker.vue';
import EditorPolyline from './src/polyline.vue';
import EditorPolygon from './src/polygon.vue';
import EditorCircle from './src/circle.vue';
import EditorRectangle from './src/rectangle.vue';

Editor.install = function (Vue) {
  Vue.component(Editor.name, Editor);
  Vue.component(EditorMarker.name, EditorMarker);
  Vue.component(EditorPolyline.name, EditorPolyline);
  Vue.component(EditorPolygon.name, EditorPolygon);
  Vue.component(EditorCircle.name, EditorCircle);
  Vue.component(EditorRectangle.name, EditorRectangle);
}

export default Editor;