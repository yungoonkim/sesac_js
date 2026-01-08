export function renderTable({
    data,
    headerEl,
    bodyEl,
    visibleKeys,
    rowClick,
    cellRenderer
}) {
    headerEl.innerHTML = '';
    bodyEl.innerHTML = '';

    if (!data || data.length === 0) {
        bodyEl.innerHTML = ' --- 표시할 데이터가 없습니다 --- ';
        return;
    }

    // 헤더 생성
    const headerRow = document.createElement('tr');
    visibleKeys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    headerEl.appendChild(headerRow);

    // 바디 생성
    data.forEach(row => {
        const tr = document.createElement('tr');

        if (rowClick) {
            tr.addEventListener('click', () => rowClick(row));
        }

        visibleKeys.forEach(key => {
            const td = document.createElement('td');
            if (cellRenderer) {
                cellRenderer(td, key, row[key], row);
            } else {
                td.textContent = row[key];
            }
            tr.appendChild(td);
        });

        bodyEl.appendChild(tr);
    });
}
