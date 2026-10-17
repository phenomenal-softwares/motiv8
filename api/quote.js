module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rapidApiKey = process.env.X_RAPIDAPI_KEY;
  const rapidApiHost = process.env.X_RAPIDAPI_HOST;

  if (!rapidApiKey || !rapidApiHost) {
    console.error('RapidAPI configuration is missing on the server.');
    return res.status(500).json({ error: 'Quote service is not configured' });
  }

  const category = req.query.category;
  if (
    category !== undefined &&
    (typeof category !== 'string' || category.length > 100)
  ) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const quoteUrl = new URL('https://famous-quotes4.p.rapidapi.com/random');
  if (category) {
    quoteUrl.searchParams.set('category', category);
  }

  try {
    const response = await fetch(quoteUrl, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost,
      },
    });

    if (!response.ok) {
      console.error(`RapidAPI request failed with status ${response.status}.`);
      return res.status(502).json({ error: 'Quote provider request failed' });
    }

    const quotes = await response.json();
    return res.status(200).json(quotes);
  } catch (error) {
    console.error('Unable to retrieve a quote from RapidAPI:', error);
    return res.status(502).json({ error: 'Unable to retrieve a quote' });
  }
};
