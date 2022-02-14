export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /*добавить в контейнер DOM элемент */
  addItem(element) {
    this._container.prepend(element);
  }

  /*отрисовка всех элементов с внешней функцией renderer*/
  renderItems(item) {
    item.forEach(item => {
      this._renderer(item);

    });
  }
}
