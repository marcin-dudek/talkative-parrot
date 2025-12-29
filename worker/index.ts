import * as cheerio from 'cheerio';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
        const word = url.pathname.replace("/api/", "");
        const response = await fetch(`https://sjp.pl/${word}`);
        const html = cheerio.load(await response.text());
        const items = html('p[style="margin: .5em 0; font: medium/1.4 sans-serif; max-width: 34em; "]');

        let itemsArray: string[] = [];
        items.each((_, element) => {
          let text = html(element).html();
          if (text?.indexOf('<br>') === -1) {
            itemsArray.push(text.trim().replace(/;+$/,''));
          } else {
            text?.split('<br>').forEach(line => {
              const l=line.substring(2).trim().replace(/;+$/,'');
              if (l.length > 0) {
                itemsArray.push(l);
              }
            });
          }
        });
        
        return Response.json({
          word: url.pathname.replace("/api/", ""),
          definitions: itemsArray
        });
    }
		return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
