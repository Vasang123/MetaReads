const checkCanisterId = () => {
  const baseUrl = window.location.href; 
  const url = new URL(baseUrl);
  const urlCanisterId = url.searchParams.get("canisterId");
  const storedCanisterId = sessionStorage.getItem("canisterId");
  if (storedCanisterId) {
    return storedCanisterId;
  }
  if (urlCanisterId) {
    sessionStorage.setItem("canisterId", urlCanisterId);
    return urlCanisterId; 
  } else {
    return null;
  }
};

export const createUrl = (path: any) => {
  const canisterId = checkCanisterId();
  if (canisterId) {
    return `${path}/?canisterId=${canisterId}`;
  } else {
    return path;
  }
};
