const formChange = (money: number, banknotes: number[]) => {
  const changeList: { banknote: number; amount: number }[] = [];

  banknotes.forEach((item, i) => {
    if (!i) {
      changeList.push({ banknote: item, amount: Math.floor(money / item) });
    } else {
      let leftover = money;
      for (let k = 0; k < i; k++) {
        leftover = leftover % banknotes[k];
      }
      changeList.push({ banknote: item, amount: Math.floor(leftover / item) });
    }
  });

  return changeList;
};

export { formChange };
