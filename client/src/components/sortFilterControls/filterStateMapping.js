const filterDefaults = {
  rentMonthly: {
    stateKey: 'rentMonthly',
    defaultValue: 0,
  },
  housingType: {
    stateKey: 'housingType',
    defaultValue: [],
  },
};

export const mapReduxFilterStateToUI = (filterState) => {
  const ui = [];
  if (filterState.rentMonthly > 0) {
    ui.push({
      display: `Rent < $${filterState.rentMonthly}`,
      stateKey: filterDefaults.rentMonthly.stateKey,
      stateDefault: filterDefaults.rentMonthly.defaultValue,
    });
  }
  if (filterState.housingType.length > 0) {
    let display = '';
    for (let i = 0; i < filterState.housingType.length; i++) {
      display += filterState.housingType[i] + ', ';
    }
    ui.push({
      display: `Housing Type: ${display}`,
      stateKey: filterDefaults.housingType.stateKey,
      stateDefault: filterDefaults.housingType.defaultValue,
    });
  }
  return ui;
};
