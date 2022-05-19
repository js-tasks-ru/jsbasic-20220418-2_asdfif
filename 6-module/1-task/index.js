/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  static colNames = ['Имя', 'Возраст', 'Зарплата', 'Город', '']

  constructor(rows) {
    this.elem = this.#createElem(rows)
  }

  #createElem(rows) {
    const table = document.createElement('table')
    const body = this.#createBody(table, rows)

    this.#createHead(table)
    body.addEventListener('click', (event) =>{
      this.#onXClick(event)
    });

    return table
  }

  #createHead(table){
    const head = table.createTHead()
    const headRow = head.insertRow()

    UserTable.colNames.forEach(colName => {
      let headCell = document.createElement('th')
      headCell.textContent = colName
      headRow.appendChild(headCell)
    })
  }

  #createBody(table, rows) {
    const body = table.createTBody()

    rows.forEach(row => {
      this.#createTRow(row, body)
    });

    return body
  }

  #createTRow(row, table) {
    const trow = table.insertRow()
    for (let attr in row){
      const cell = trow.insertCell()
      cell.textContent = row[attr]
    }
    const x = trow.insertCell()
    x.innerHTML = '<button data-delete-row=true>X</button>'
  }

  #onXClick(event) {
    if(event.target.dataset.deleteRow === 'true') {
      event.target.closest('tr').remove()
    }
  }
}
