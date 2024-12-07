export async function  sendRequest<T>(url: string,options?: RequestInit): Promise<T> {
  options = {
    headers: {
    'Content-Type': 'application/json',
    },
    ...options
  };

  const response = await fetch(url, options);
    // Check if response is okay
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    const data: T = await response.json();
    return data;
  }