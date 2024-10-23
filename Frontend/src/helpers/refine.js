const truncateArray = (arr) => {
  const array = [];
  let rep = 0;
  for (let i = 0; i < arr.length; i++) {
    array.push(arr[i]);
    for (let j = 0; j < array.length; j++) {
      if (array[j] === arr[i]) {
        rep++;
        if (rep > 1) {
          array.splice(j, 1);
        }
      }
    }
    rep = 0;
  }
  return array;
};

export const refine = (data) => {
  if (data) {
    console.log("dataaaa", data);
    let sale = [];
    let expenses = [];
    let months = [];
    const { sales, expense } = data;
    sales?.forEach((s) => {
      sale.push(s.totalSum);
      months.push(s._id.month);
    });
    expense?.forEach((s) => {
      expenses.push(s.totalSum);
      months.push(s._id.month);
    });
    return [sale, expenses, truncateArray(months)];
  } else {
    return;
  }
};
