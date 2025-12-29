import * as cheerio from 'cheerio';

const extractWord = (text: string) => {
  if (text.indexOf("<span")>=0){
    const item = cheerio.load(text);
    return item.text().trim();
  } else{
    return text.trim().replace(/;+$/,'');
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/definition/")) {
        const word = url.pathname.replace("/api/definition/", "");
        const response = await fetch(`https://sjp.pl/${word}`);
        const html = cheerio.load(await response.text());
        const items = html('p[style="margin: .5em 0; font: medium/1.4 sans-serif; max-width: 34em; "]');

        let definitions: string[] = [];
        items.each((_, element) => {
          let text = html(element).html();
          if (text?.indexOf('<br>') === -1) {
            definitions.push(extractWord(text));
          } else {
            text?.split('<br>').forEach(line => {
              definitions.push(extractWord(line.substring(2)))
            });
          }
        });
        
        return Response.json({
          word: word,
          definitions: definitions
        });
    }
		return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
