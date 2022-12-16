export const getRequest = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const postRequest = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const deleteRequest = async (url) => {
  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  });
  return await res.json();
};

export const putRequest = async (url, body) => {
  const res = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: body,
  });
  return await res.json();
};

export const patchRequest = async (url, body) => {
  const res = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await res.json();
};
