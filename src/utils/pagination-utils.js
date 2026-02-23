

export const retrievePageFromFullArray = (data, currentPage) => {
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedObjectIDs = [...(data?.objectIDs || [])].sort((a, b) => a - b);

  const currentObjectIDs = sortedObjectIDs
    ? sortedObjectIDs.slice(startIndex, endIndex)
    : [];

    return currentObjectIDs;
}

export const calculateTotalPages = (data) => {
     const totalPages = data?.objectIDs
    ? Math.ceil(data.objectIDs.length / 10)
    : 0;
    return totalPages;
}