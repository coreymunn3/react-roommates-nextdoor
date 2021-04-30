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
