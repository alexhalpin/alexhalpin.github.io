// surfline and surfchex have cors restrictions

export async function scrapeSurfersView() {
  const surfersViewUrl =
    "https://thesurfersview.com/cams_http/seaside-heights-ocean-view.php";

  const resp = await fetch(surfersViewUrl);
  const body = await resp.text();

  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(body, "text/html");
  //   console.log("view", doc.querySelector(".player-x"));

  const idRegex = /"id":"(\d*)"/;
  const videoRegex = /"video":"(\d*)"/;

  const id = body.match(idRegex)[1];
  const video = body.match(videoRegex)[1];

  const bridUrl = `https://services.brid.tv/services/get/video/${id}/${video}.json`;
  const bridResp = await fetch(bridUrl);
  const bridJson = await bridResp.json();

  const streamLink = bridJson.Video[0].source.sd;

  return streamLink;
}
