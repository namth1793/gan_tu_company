const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, data: [], message: err.message };
  }
}

export async function getCategories() {
  return fetchAPI('/categories');
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/products${query ? `?${query}` : ''}`);
}

export async function getFeaturedProducts() {
  return fetchAPI('/products/featured');
}

export async function getProduct(slug) {
  return fetchAPI(`/products/${slug}`);
}

export async function getNews(params = {}) {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/news${query ? `?${query}` : ''}`);
}

export async function getNewsArticle(slug) {
  return fetchAPI(`/news/${slug}`);
}

export async function getVideos() {
  return fetchAPI('/videos');
}

export async function submitContact(data) {
  return fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
