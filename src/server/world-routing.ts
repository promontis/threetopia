/** Keep the public world entry separate from the marketing site, including old links. */
export async function routeWorld(request:Request, assets:{fetch(request:Request):Promise<Response>}, siteUrl:string, worldUrl:string):Promise<Response|null> {
  const url=new URL(request.url),site=new URL(siteUrl),world=new URL(worldUrl);
  const legacy=/^\/world(?:\/|\/index\.html)?$/.test(url.pathname);
  if(url.hostname===world.hostname){
    if(url.protocol!=='https:'||legacy||url.pathname==='/index.html') {
      return Response.redirect(`${world.origin}${legacy||url.pathname==='/index.html'?'/':url.pathname}${url.search}`,308);
    }
    if(url.pathname==='/') {
      if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
      // ASSETS fetches the standalone document without running this Worker again.
      const assetUrl=new URL('/world/',url);
      return assets.fetch(new Request(assetUrl,request));
    }
    if(url.pathname.startsWith('/api/')||url.pathname.startsWith('/waitlist/'))return new Response('Not found',{status:404});
  } else if((url.hostname===site.hostname||url.hostname===`www.${site.hostname}`)&&legacy) {
    return Response.redirect(`${world.origin}/${url.search}`,308);
  }
  return null;
}
