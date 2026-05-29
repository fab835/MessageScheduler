const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:3333";

const buildUrl = (path: string) => `${apiBaseUrl}/v1${path}`;

export const responseErrorHandler = async (response: Response) => {
  if (response.ok) return;

  let errorMessage = `Request failed with status ${response.status}`;

  try {
    const body = await response.json();

    errorMessage = body.error || body.message || body.details || JSON.stringify(body);
  } catch {
    // Response body isn't JSON
  }

  throw new Error(errorMessage);
};

export const getMessages = async (): Promise<any[]> => {
  const response = await fetch(buildUrl("/messages"), {
    next: {
      revalidate: 0
    }
  });
  await responseErrorHandler(response);
  return response.json();
};

export const getDashboardOverview = async (): Promise<any> => {
  const response = await fetch(buildUrl("/dashboard/overview"), {
    next: {
      revalidate: 0
    }
  });
  await responseErrorHandler(response);
  return response.json();
};

export const createMessage = async (payload: any): Promise<any> => {
  const response = await fetch(buildUrl("/messages"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  await responseErrorHandler(response);
  return response.json();
};

