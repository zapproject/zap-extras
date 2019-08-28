export function getPages(currentPage, totalPages) {
  const delta = 2;
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
;
export function getTotalPages(totalItemsLength, pageSize) {
  return Math.ceil(totalItemsLength / pageSize);
}
export function getPageStart(page, pageSize) {
  return pageSize * (page - 1);
}
export function getPageForItem(item, allItems, pageSize) {
  const index = allItems.indexOf(item);
  return Math.floor(index / pageSize) + 1;
}
export function parseHash() {
  const hashParts = window.location.hash.slice(1).split(';');
  let page = 1;
  let expandedAddress = '';
  let search = '';
  let bonded = false;
  hashParts.forEach(pair => {
    const [key, value] = pair.split('=');

    switch (key) {
      case 'page':
        page = Number(value);
        break;

      case 'oracle':
        expandedAddress = value;
        break;

      case 'search':
        search = value ? value.toLowerCase() : '';
        break;

      case 'bonded':
        bonded = !!value;
        break;
    }
  });
  return {
    page,
    expandedAddress,
    search,
    bonded
  };
}