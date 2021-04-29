export const filterPosts = (postsArray, filters) => {
  if (filters.rentMonthly > 0) {
    postsArray = postsArray.filter(
      (post) => post.rentMonthly < filters.rentMonthly
    );
  }
  if (filters.housingType.length > 0) {
    postsArray = postsArray.filter((post) =>
      filters.housingType.includes(post.housingType)
    );
  }
  return postsArray;
};

export const createFilterPills = (filters) => {
  const pills = [];
  if (filters.rentMonthly > 0) {
    pills.push(`Rent < $${filters.rentMonthly}`);
  }
  if (filters.housingType.length > 0) {
    const allHousingTypes = '';
    filters.housingType.forEach((type) => allHousingTypes + ' ' + type);
    pills.push(`Housing Type: ${allHousingTypes}`);
  }
  return pills;
};
