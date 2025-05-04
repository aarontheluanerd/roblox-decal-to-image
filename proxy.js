addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    const assetId = url.searchParams.get('id')
    
    if (!assetId) {
      return new Response('Missing asset ID', { status: 400 })
    }
  
    try {
      // Forward to Cloudflare worker
      const workerUrl = `https://roblox-decal-to-image-convert.aarontheluanerd.workers.dev/?id=${assetId}`
      const response = await fetch(workerUrl)
      
      // Return the response with CORS headers
      const headers = new Headers(response.headers)
      headers.set('Access-Control-Allow-Origin', '*')
      
      return new Response(response.body, {
        status: response.status,
        headers: headers
      })
    } catch (error) {
      return new Response(`Proxy error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      })
    }
  }