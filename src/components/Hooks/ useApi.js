function useApi() {
  const request = async (url, options = {}) => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return await response.json();
  };

  return { request };
}

export default useApi;