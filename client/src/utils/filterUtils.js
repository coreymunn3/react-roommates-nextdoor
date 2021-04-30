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
  if (filters.hasPrivateBath) {
    postsArray = postsArray.filter((post) => post.hasPrivateBath === true);
  }
  if (filters.hasFurnishedRoom) {
    postsArray = postsArray.filter((post) => post.hasFurnishedRoom === true);
  }
  if (filters.hasParkingIncluded) {
    postsArray = postsArray.filter((post) => post.hasParkingIncluded === true);
  }
  if (filters.hasWasherDryerInUnit) {
    postsArray = postsArray.filter(
      (post) => post.hasWasherDryerInUnit === true
    );
  }
  if (filters.hasPetsAllowed) {
    postsArray = postsArray.filter((post) => post.hasPetsAllowed === true);
  }
  if (filters.hasWifi) {
    postsArray = postsArray.filter((post) => post.hasWifi === true);
  }
  if (filters.hasCableTelevision) {
    postsArray = postsArray.filter((post) => post.hasCableTelevision === true);
  }
  if (filters.hasKitchenAccess) {
    postsArray = postsArray.filter((post) => post.hasKitchenAccess === true);
  }
  if (filters.hasPoolAccess) {
    postsArray = postsArray.filter((post) => post.hasPoolAccess === true);
  }
  if (filters.hasDrugTolerantCohabitants) {
    postsArray = postsArray.filter(
      (post) => post.hasDrugTolerantCohabitants === true
    );
  }
  return postsArray;
};
