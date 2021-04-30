const filterDefaults = {
  rentMonthly: {
    stateKey: 'rentMonthly',
    defaultValue: 0,
  },
  housingType: {
    stateKey: 'housingType',
    defaultValue: [],
  },
  hasPrivateBath: {
    stateKey: 'hasPrivateBath',
    defaultValue: false,
  },
  hasFurnishedRoom: {
    stateKey: 'hasFurnishedRoom',
    defaultValue: false,
  },
  hasParkingIncluded: {
    stateKey: 'hasParkingIncluded',
    defaultValue: false,
  },
  hasWasherDryerInUnit: {
    stateKey: 'hasWasherDryerInUnit',
    defaultValue: false,
  },
  hasPetsAllowed: {
    stateKey: 'hasPetsAllowed',
    defaultValue: false,
  },
  hasWifi: {
    stateKey: 'hasWifi',
    defaultValue: false,
  },
  hasCableTelevision: {
    stateKey: 'hasCableTelevision',
    defaultValue: false,
  },
  hasKitchenAccess: {
    stateKey: 'hasKitchenAccess',
    defaultValue: false,
  },
  hasPoolAccess: {
    stateKey: 'hasPoolAccess',
    defaultValue: false,
  },
  hasDrugTolerantCohabitants: {
    stateKey: 'hasDrugTolerantCohabitants',
    defaultValue: false,
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
  if (filterState.hasPrivateBath) {
    ui.push({
      display: 'Private Bathroom',
      stateKey: filterDefaults.hasPrivateBath.stateKey,
      stateDefault: filterDefaults.hasPrivateBath.defaultValue,
    });
  }
  if (filterState.hasFurnishedRoom) {
    ui.push({
      display: 'Furnished Room',
      stateKey: filterDefaults.hasFurnishedRoom.stateKey,
      stateDefault: filterDefaults.hasFurnishedRoom.defaultValue,
    });
  }
  if (filterState.hasParkingIncluded) {
    ui.push({
      display: 'Parking Included',
      stateKey: filterDefaults.hasParkingIncluded.stateKey,
      stateDefault: filterDefaults.hasParkingIncluded.defaultValue,
    });
  }
  if (filterState.hasWasherDryerInUnit) {
    ui.push({
      display: 'Washer Dryer In Unit',
      stateKey: filterDefaults.hasWasherDryerInUnit.stateKey,
      stateDefault: filterDefaults.hasWasherDryerInUnit.defaultValue,
    });
  }
  if (filterState.hasPetsAllowed) {
    ui.push({
      display: 'Pets Allowed',
      stateKey: filterDefaults.hasPetsAllowed.stateKey,
      stateDefault: filterDefaults.hasPetsAllowed.defaultValue,
    });
  }
  if (filterState.hasWifi) {
    ui.push({
      display: 'Wifi Included',
      stateKey: filterDefaults.hasWifi.stateKey,
      stateDefault: filterDefaults.hasWifi.defaultValue,
    });
  }
  if (filterState.hasCableTelevision) {
    ui.push({
      display: 'Cable TV Included',
      stateKey: filterDefaults.hasCableTelevision.stateKey,
      stateDefault: filterDefaults.hasCableTelevision.defaultValue,
    });
  }
  if (filterState.hasKitchenAccess) {
    ui.push({
      display: 'Kitchen',
      stateKey: filterDefaults.hasKitchenAccess.stateKey,
      stateDefault: filterDefaults.hasKitchenAccess.defaultValue,
    });
  }
  if (filterState.hasPoolAccess) {
    ui.push({
      display: 'Pool Access',
      stateKey: filterDefaults.hasPoolAccess.stateKey,
      stateDefault: filterDefaults.hasPoolAccess.defaultValue,
    });
  }
  if (filterState.hasDrugTolerantCohabitants) {
    ui.push({
      display: '420 Friendly',
      stateKey: filterDefaults.hasDrugTolerantCohabitants.stateKey,
      stateDefault: filterDefaults.hasDrugTolerantCohabitants.defaultValue,
    });
  }
  return ui;
};
