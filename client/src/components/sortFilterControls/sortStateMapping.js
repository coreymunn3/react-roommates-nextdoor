export const mapReduxSortStateToUI = (sortState) => {
  const ui = [];
  if (sortState !== 'No Sort') {
    ui.push({
      display: `Sorting By ${sortState}`,
    });
  }
  return ui;
};
