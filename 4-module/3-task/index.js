function highlight(table) {
  for(let i = 1; i < table.rows.length; i++){
    const status_cell = table.rows[i].cells[3]
    const gender_cell = table.rows[i].cells[2]
    const age_cell = table.rows[i].cells[1]

    if (status_cell.dataset.available === 'true') {
      table.rows[i].classList.add('available')
    } else if (status_cell.dataset.available === 'false') {
      table.rows[i].classList.add('unavailable')
    } else {
      table.rows[i].hidden = true
    }

    if (gender_cell.textContent === 'm') {
      table.rows[i].classList.add('male')
    } else {
      table.rows[i].classList.add('female')
    }

    if (age_cell.textContent < 18) {
      table.rows[i].setAttribute('style', 'text-decoration: line-through')
    }
  }
}
