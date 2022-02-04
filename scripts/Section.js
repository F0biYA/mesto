export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /*добавить в контейнер DOM элемент */
  addItem(element) {
    this._container.append(element);
  }

  /*отрисовка всех элементов с внешней функцией renderer*/
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}