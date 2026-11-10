(() => {
  const projects = {
    halloween: {
      title: "Halloween Party Campaign",
      category: "EVENT CAMPAIGN / POSTER DESIGN",
      intro: "A dark, atmospheric visual direction created to bring a Halloween event campaign together across its key promotional moments.",
      tags: ["Event poster", "Campaign artwork", "Promotional design"],
      hero: "assets/halloween-main-poster.png",
      caption: "HALLOWEEN PARTY · MAIN CAMPAIGN ARTWORK",
      overview: "A collection of promotional visuals for a Halloween party, including the main event poster and supporting announcements. The work is designed to give the event a recognisable visual presence across its campaign materials.",
      concept: "The direction uses a dark, cinematic mood to suit the Halloween theme. Dramatic imagery and a strong focal point help establish the atmosphere while keeping the event information prominent.",
      process: "The campaign direction starts with the event mood and main poster composition. Supporting pieces then carry the same visual language into ticket updates, announcements and social formats so the campaign feels connected.",
      gallery: [
        ["assets/gallery/Main%20Poster%2004.png","Main event poster"],
        ["assets/gallery/postponement-announcement.png","Postponement announcement"],
        ["assets/gallery/ticket-promotion.png","Ticket promotion"],
        ["assets/gallery/fancy-dress-promo.png","Fancy dress promotion"],
        ["assets/gallery/halloween-story-ticket.png","Story ticket promotion"]
      ]
    },
    magic: {
      title: "Halloween Magic Show Promotion",
      category: "EVENT PROMOTION / POSTER DESIGN",
      intro: "A supporting event visual designed to spotlight the magic show within the wider Halloween celebration.",
      tags: ["Event poster", "Artist announcement", "Promotional design"],
      hero: "assets/magic-show-poster.png",
      caption: "MAGIC SHOW · PROMOTIONAL ARTWORK",
      overview: "A dedicated promotional poster for the magic show segment of a Halloween event. It gives this part of the programme its own visual moment while remaining connected to the event theme.",
      concept: "The creative direction leans into mystery and atmosphere, using a focused composition to make the show announcement feel distinctive and easy to recognise.",
      process: "The design brings the event theme and show announcement together in one clear layout. The main artwork is treated as the focal point, with supporting information arranged to remain readable.",
      gallery: [
        ["assets/gallery/magic-show-promo.png","Magic show promotion"],
        ["assets/gallery/Main%20Poster%2004.png","Main Halloween campaign"]
      ]
    },
    experimental: {
      title: "Music-inspired Experimental Poster",
      category: "EXPERIMENTAL / VISUAL POSTER",
      intro: "A personal visual exploration built around expressive imagery, layered composition and an artist-inspired mood.",
      tags: ["Experimental poster", "Typography", "Visual exploration"],
      hero: "assets/The%20Weeknd%20Design%2003.png",
      caption: "MUSIC-INSPIRED · EXPERIMENTAL ARTWORK",
      overview: "An experimental poster concept exploring a music-led visual identity. The piece focuses on atmosphere and composition rather than a commercial campaign brief.",
      concept: "The direction explores how expressive portrait imagery, typography and tonal contrast can work together to create a strong visual mood.",
      process: "The composition is developed by balancing the main image with typographic elements and supporting graphic details. The final layout brings these elements together as one cohesive poster.",
      gallery: [
        ["assets/gallery/The%20Weeknd%20Design%2003.png","The Weeknd-inspired design"],
        ["assets/gallery/Billie%20Eilish%2004.png","Billie Eilish-inspired design"]
      ]
    },
    oreo: {
      title: "Oreo Shake Promotion",
      category: "FOOD & BEVERAGE / ADVERTISING",
      intro: "A product-focused promotional visual designed to make an Oreo shake the hero of the composition.",
      tags: ["Product promotion", "Advertising design", "Food & beverage"],
      hero: "assets/oreo-shake-poster.png",
      caption: "OREO SHAKE · PROMOTIONAL POSTER",
      overview: "A promotional poster concept for an Oreo shake. The design gives the featured product the main visual focus and supports a clear advertising message.",
      concept: "The concept centres on appetite appeal and a simple visual hierarchy, helping the product stand out immediately within the poster layout.",
      process: "The product is treated as the hero element, with the supporting text and graphic details arranged around it to keep the message direct and easy to scan.",
      gallery: [
        ["assets/gallery/Coffee%20Poster.png","Oreo shake promotion"]
      ]
    }
  };
  const params = new URLSearchParams(window.location.search);
  const key = params.get("project") || "halloween";
  const project = projects[key] || projects.halloween;
  const setText = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  document.title = project.title + " — BLOOM CREATIVES";
  setText("projectTitle", project.title);
  setText("projectCategory", project.category);
  setText("projectIntro", project.intro);
  setText("projectCaption", project.caption);
  setText("projectOverview", project.overview);
  setText("projectConcept", project.concept);
  setText("projectProcess", project.process);
  const hero = document.getElementById("projectHero");
  if (hero) { hero.src = project.hero; hero.alt = project.title + " artwork"; }
  const tags = document.getElementById("projectTags");
  project.tags.forEach(tag => { const el = document.createElement("span"); el.textContent = tag; tags.appendChild(el); });
  const gallery = document.getElementById("projectGallery");
  project.gallery.forEach(([src, caption]) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = src; img.alt = caption; img.loading = "lazy"; img.decoding = "async";
    const figcaption = document.createElement("figcaption"); figcaption.textContent = caption;
    figure.append(img, figcaption); gallery.appendChild(figure);
  });
  if (!project.gallery.length) document.getElementById("projectGallerySection").hidden = true;
})();