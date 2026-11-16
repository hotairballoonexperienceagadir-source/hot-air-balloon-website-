import type { LangContent } from "@/lib/types";

/**
 * English content - core pages (home, products, city, pillar, pricing, trust, booking, legal).
 * Copy is native EN (UK-leaning, warm expert tone). Inline links use the sheet's
 * "Internal links OUT" mapping with descriptive keyword anchors.
 */
export const content: LangContent = {
  /* ============================== EN HOME ============================== */
  "en-home": {
    intro: [
      "Watch Marrakech wake up from 800 metres. Our hot air balloon Marrakech flights lift off at sunrise every morning, floating over the palm grove, the Agafay stone desert and the foothills of the snow-capped Atlas Mountains - with licensed Moroccan pilots, hotel pickup, a traditional Berber breakfast and your flight certificate included.",
      "Since our first flight we have carried more than 12,000 passengers over Marrakech by air balloon - couples, families, photographers and proposal-planners. Booking takes one message on WhatsApp: pick your morning, we confirm the weather, you pay after you fly. If you are comparing every option, start with our guide to hot air balloon rides in Morocco or check transparent prices for all flights.",
    ],
    blocks: [
      { t: "h2", text: "Why a sunrise balloon flight is the best thing you can do in Marrakech" },
      { t: "p", text: "Marrakech is a city you feel before you see it - the call to prayer, the smell of orange blossom, the rush of the medina. From a balloon marrakech becomes something else entirely: a pink maze of rooftops and minarets, a green carpet of palm trees, and beyond it the ochre and grey hills of the Haouz plain. By 07:00 the light over the Atlas is the softest you will ever photograph." },
      { t: "p", text: "Ballooning is also the calmest way to see Morocco. There is no engine, no road, no queue - just wind. Your pilot rides different air currents to steer the balloon marrakech over palm groves and desert plateau, and lands gently in a field where the breakfast tent and the retrieval 4x4 are already waiting." },
      { t: "img", key: "hero", alt: "hot air balloon marrakech flying over the palm grove at sunrise with the Atlas Mountains behind" },
      { t: "h2", text: "What you will see from the basket" },
      { t: "ul", items: [
        "The Palmeraie: 100,000+ date palms stretching to the horizon, dotted with walled gardens and kasbahs",
        "Marrakech itself: the Koutoubia minaret, the medina walls and Jemaa el-Fnaa square in the distance",
        "The Agafay desert: a moon-like stone desert 40 minutes from the city, on the flights that head south",
        "The Atlas Mountains: Toubkal (4,167 m) and the High Atlas range, snow-capped from October to May",
        "Berber villages and farmland waking up - donkeys in the fields, bread ovens smoking, kids waving at the balloon",
      ] },
      { t: "h2", text: "Flights for every kind of traveller" },
      { t: "p", text: "The [Classic Sunrise Hot Air Balloon Ride in Marrakech](/en/marrakech/sunrise-balloon-flight/) is our original shared-basket flight and the best value. For couples and proposals, the [Private Hot Air Balloon Flight](/en/marrakech/private-balloon-flight/) gives you a basket to yourselves. The [VIP Luxury Hot Air Balloon Flight](/en/marrakech/vip-balloon-flight/) adds a 4x4 transfer, a maximum of 8 passengers and a champagne-style toast at altitude. Adventurers choose the [Balloon and Camel Ride combo](/en/marrakech/balloon-and-camel-ride/) or the [Agafay Desert balloon flight](/en/marrakech/agafay-desert-balloon/). And if you are staying on the coast, our [hot air balloon Agadir](/en/agadir-hot-air-balloon/) flights fly over the Souss Valley." },
      { t: "h2", text: "Is it safe? Is the weather reliable? When should you book?" },
      { t: "p", text: "Safety first: every pilot holds a commercial licence from the Moroccan Civil Aviation Authority and every flight is insured - we explain exactly [how safe hot air balloons are in Morocco](/en/guide/is-hot-air-balloon-safe-morocco/). Flights run all year, but [the best time for a hot air balloon in Marrakech](/en/guide/best-time-hot-air-balloon-marrakech/) is October to April for cool, stable mornings. Still deciding? Read guest stories in [our reviews](/en/reviews/) or browse [the FAQ](/en/faq/). Ready when you are: [book your flight in one click](/en/book/)." },
    ],
    gallery: [
      { key: "hero", alt: "hot air balloon marrakech at sunrise over the palm grove and Atlas Mountains", caption: "Sunrise over the Palmeraie, 06:30" },
      { key: "inflation", alt: "balloon inflation at dawn before the marrakech hot air balloon flight", caption: "Inflation begins before dawn" },
      { key: "passengers", alt: "passengers smiling in the hot air balloon marrakech basket", caption: "Happy basket, soft light" },
      { key: "agafay", alt: "hot air balloon marrakech over the Agafay stone desert", caption: "Crossing the Agafay stone desert" },
      { key: "breakfast", alt: "berber breakfast served after the marrakech hot air balloon ride", caption: "Berber breakfast under the caidal tent" },
      { key: "certificate", alt: "flight certificate handed after the marrakech balloon ride", caption: "Your flight certificate moment" },
    ],
    reviewIdx: [0, 1, 2],
    faqs: [
      { q: "How much does a hot air balloon in Marrakech cost?", a: "The Classic sunrise flight starts from {{PRICE_CLASSIC}} per adult, including hotel pickup, a 1-hour flight, Berber breakfast and flight certificate. Private, VIP and combo flights cost more - see the full price list on our [prices page](/en/hot-air-balloon-marrakech-price/)." },
      { q: "What time does the hot air balloon flight start?", a: "Hotel pickup is between 4:45 and 5:15 depending on your hotel location and the season. You take off at sunrise (between 6:15 and 7:30), fly for about one hour, have breakfast, and are back at your hotel by 10:30 at the latest." },
      { q: "Is the hot air balloon in Marrakech safe?", a: "Yes. Our pilots are licensed by the Moroccan Civil Aviation Authority, balloons are inspected after every flight, and we only fly in safe wind and visibility conditions. Read our full pilot answer on [balloon safety in Morocco](/en/guide/is-hot-air-balloon-safe-morocco/)." },
      { q: "Can children fly in the balloon?", a: "Children from 5 years old can fly with a parent or guardian. The basket rails are high and the flight is calm - kids usually love watching the desert and the mountains. Younger children cannot fly for safety reasons." },
      { q: "What happens if the weather is bad?", a: "We cancel free of charge - you pay nothing. Balloons cannot fly in strong wind, rain or poor visibility, so we check the forecast twice a day and confirm your flight the evening before. You can reschedule to another morning or get a full refund if you prepaid." },
      { q: "Do you pick up from my hotel or riad?", a: "Yes - pickup and return are included from any hotel, riad or holiday rental in Marrakech (Medina, Gueliz, Palmeraie, Agdal) and from hotels in Agadir and Taghazout for our Agadir flights." },
      { q: "How high do you fly and how far?", a: "Between 200 and 800 metres depending on the day, drifting 5 to 15 kilometres with the wind over the palm grove, desert plain or Souss Valley. The pilot steers by changing altitude to catch different wind layers." },
      { q: "Can I propose in the balloon?", a: "Absolutely - private flights are our favourite requests. Tell us on WhatsApp and we organise a banner, a photographer and a toast at altitude. See our guide to planning a [hot air balloon marriage proposal in Marrakech](/en/guide/hot-air-balloon-proposal-marrakech/)." },
      { q: "How do I book?", a: "One message on WhatsApp: send us your date, the number of adults and children and your hotel name. We confirm availability and the pickup time the evening before. No online payment - you pay on the day of the flight." },
      { q: "Is a hot air balloon ride in Marrakech worth it?", a: "It is consistently our guests' favourite morning in Morocco - most tell us it was the highlight of their whole trip. You can read honest [guest reviews here](/en/reviews/) or compare Morocco with other destinations in our [Marrakech vs Cappadocia guide](/en/guide/marrakech-vs-cappadocia-hot-air-balloon/)." },
    ],
  },

  /* ============================== EN CLASSIC ============================== */
  "en-classic": {
    intro: [
      "The Classic flight is the original hot air balloon ride marrakech travellers fall in love with: one hour floating over the palm grove and desert plateau at sunrise, in a shared basket of 8 to 16 guests flown by a licensed Moroccan pilot.",
      "Everything is arranged for you - air-conditioned hotel pickup before dawn, the inflation show, a gentle landing, the traditional pilot's toast, a Berber breakfast under a caidal tent and your personalised flight certificate. Reserve your sunrise hot air balloon marrakech morning by WhatsApp and pay only after you fly.",
    ],
    itinerary: {
      title: "Your classic morning, step by step",
      steps: [
        { time: "04:45 - 05:15", title: "Hotel pickup in Marrakech", text: "A modern air-conditioned minivan collects you from your hotel, riad or rental anywhere in the city. Hot tea and coffee on board." },
        { time: "05:45", title: "Arrival at the launch field", text: "Meet your pilot and crew, listen to the safety briefing while the crew unrolls and inflates the envelope with the burner." },
        { time: "06:15", title: "Take-off at first light", text: "Board the basket, one last burner blast and you leave the ground as the sky turns pink over the Atlas." },
        { time: "06:30 - 07:30", title: "One hour over the palm grove", text: "Float between 200 and 800 metres: the Palmeraie, desert plateau, walled villages and, on clear mornings, the whole snowy Atlas chain." },
        { time: "07:30", title: "Gentle landing and pilot's toast", text: "Your crew tracks the balloon by 4x4 and meets you at the landing field for the traditional toast and photos." },
        { time: "08:00", title: "Berber breakfast", text: "Msemen pancakes, amlou, honey, olives, dates and endless mint tea under the caidal tent - and your flight certificate." },
        { time: "09:30 - 10:30", title: "Back at your hotel", text: "Relaxed return transfer. The rest of your Marrakech day is still ahead of you." },
      ],
    },
    blocks: [
      { t: "h2", text: "Why choose the Classic sunrise balloon ride" },
      { t: "p", text: "The classic flight is the perfect first balloon marrakech experience: small enough to feel personal, priced for families and groups, and flown on some of the largest balloons in Morocco so everyone gets a rail-side view. The route changes with the wind - some mornings you drift low over date palms watching egrets take off, other mornings you climb above 600 metres to see the whole Haouz plain and the Agafay desert at once." },
      { t: "p", text: "Because it departs at sunrise, you are back at your hotel before 10:30 with the whole day left for the medina, the souks or a hammam. It is the highest-rated hour of most of our guests' trips - read what they say in [verified guest reviews](/en/reviews/)." },
      { t: "img", key: "palmgrove", alt: "classic sunrise hot air balloon ride marrakech over the palm grove at dawn" },
      { t: "h2", text: "What makes the sunrise flight different" },
      { t: "ul", items: [
        "Best light of the day for photos - long shadows, pink mountains, empty skies",
        "Cool, stable morning air: the smoothest flying conditions and the calmest landings",
        "You watch Marrakech wake up: first donkey carts, first smoke from the bread ovens",
        "1 full hour in the air - not 20 minutes, the real balloon experience",
        "Shared with at most 16 guests, so you always have space at the rail",
      ] },
      { t: "h2", text: "Not sure the Classic is your flight?" },
      { t: "p", text: "Travelling as a couple or planning a proposal? Look at the [Private Hot Air Balloon Flight in Marrakech](/en/marrakech/private-balloon-flight/) - your own basket. Want the full royal treatment? The [VIP Luxury Hot Air Balloon Flight](/en/marrakech/vip-balloon-flight/) limits the basket to 8 guests with a 4x4 transfer. Feeling adventurous? Add a camel ride to the morning with the [Balloon and Camel Ride combo](/en/marrakech/balloon-and-camel-ride/), or fly over the stone desert on the [Agafay Desert balloon flight](/en/marrakech/agafay-desert-balloon/)." },
      { t: "h2", text: "Price, what to wear, and safety" },
      { t: "p", text: "The Classic flight costs {{PRICE_CLASSIC}} per adult and {{PRICE_CLASSIC_CHILD}} per child (5-11) - the full breakdown, what changes the price and how to pay is on our [Marrakech balloon price page](/en/hot-air-balloon-marrakech-price/). Before you fly, skim our packing list in [what to wear on a hot air balloon ride](/en/guide/what-to-wear-hot-air-balloon/), and read [how safe hot air balloons are in Morocco](/en/guide/is-hot-air-balloon-safe-morocco/) if anyone in your group is nervous. Booking is one WhatsApp message - [reserve your morning here](/en/book/)." },
    ],
    gallery: [
      { key: "palmgrove", alt: "hot air balloon ride marrakech sunrise over palm trees" },
      { key: "inflation", alt: "balloon inflation before the classic marrakech flight" },
      { key: "breakfast", alt: "berber breakfast after the classic hot air balloon ride marrakech" },
    ],
    reviewIdx: [0, 5],
    faqs: [
      { q: "How long is the classic hot air balloon ride in Marrakech?", a: "About 1 hour in the air - most operators fly 30 to 40 minutes, we fly a full hour - plus pickup, inflation, breakfast and return. The whole morning lasts around 5 hours; you are back at your hotel by 10:30." },
      { q: "How high does the balloon go?", a: "Between 200 and 800 metres, depending on wind layers. Your pilot chooses the altitude for the best views and the smoothest ride, and steers by climbing and descending between air currents." },
      { q: "Is pickup included from my riad in the medina?", a: "Yes. The minivan picks you up as close to your riad as the narrow streets allow - usually the nearest car access point - and drops you back the same way. Pickup is included everywhere in Marrakech." },
      { q: "Can I fly if I am pregnant or have mobility issues?", a: "Ballooning is calm but requires standing for the flight and stepping over the basket rail (about 1.20 m). We advise against flying when pregnant or with serious mobility limitations. Contact us on WhatsApp and we will advise honestly." },
      { q: "What should I wear for the sunrise flight?", a: "Dress in layers - it is cold before take-off (5-10 degrees) and warms quickly after sunrise. Closed shoes, a cap and sunglasses. Full checklist in our [what to wear guide](/en/guide/what-to-wear-hot-air-balloon/)." },
      { q: "When is my card charged?", a: "Never before the flight - there is no online payment at all. You pay in cash or by card after the flight, at the landing field. If the weather cancels the flight, you pay nothing." },
    ],
  },

  /* ============================== EN PRIVATE ============================== */
  "en-private": {
    intro: [
      "A private hot air balloon flight means the whole basket is yours: no strangers, no timetable but sunrise, just your family or your partner drifting over Marrakech in complete privacy - the most intimate private hot air balloon marrakech experience.",
      "It is our most requested flight for proposals, anniversaries and honeymoons. Your pilot and crew fly only for your group of 2 to 8 guests, and with a little notice we add a banner at take-off, a photographer in the chase vehicle or a champagne-style toast at 500 metres. Book your private balloon flight marrakech morning directly on WhatsApp.",
    ],
    itinerary: {
      title: "Your private morning, step by step",
      steps: [
        { time: "04:45 - 05:15", title: "Private hotel pickup", text: "Your own minivan and driver collect your group. We coordinate everything on WhatsApp the evening before." },
        { time: "05:45", title: "Your balloon, your basket", text: "Meet your dedicated pilot. The crew inflates your private balloon - you are welcome to help or watch with coffee in hand." },
        { time: "06:15", title: "Take-off just for you", text: "The envelope rises, the pilot helps you aboard and you lift off together as the sun clears the Atlas." },
        { time: "06:30 - 07:30", title: "One hour, your soundtrack", text: "An hour of total privacy over the palm grove and desert: propose, celebrate, take photos, or simply enjoy the silence." },
        { time: "07:30", title: "Landing, toast, certificate", text: "Gentle landing, the traditional toast with your group, personalised certificates for every guest." },
        { time: "08:00", title: "Berber breakfast together", text: "Breakfast served for your group alone - or book our VIP upgrade with a groomed photo corner and sparkling toast." },
        { time: "09:30 - 10:30", title: "Back at your hotel", text: "Private return transfer. If you booked a photographer, your edited gallery arrives within 48 hours." },
      ],
    },
    blocks: [
      { t: "h2", text: "Why couples and families choose the private basket" },
      { t: "p", text: "A shared balloon marrakech flight is wonderful; a private one is on another level. You set the mood - champagne at sunrise, a quiet anniversary, a family of five with Grandma. Your pilot flies for you alone and the route adapts to your wishes: low over the palms for photos, or higher for the full Atlas panorama." },
      { t: "p", text: "Privacy also means flexibility: with enough notice we can shift your take-off by 15 minutes, arrange a surprise banner, hide a photographer in the chase 4x4 or prepare flowers in the basket. Around one in five of our private flights is a proposal - we have become quietly good at keeping secrets. If you are planning one, read our guide to a [hot air balloon marriage proposal in Marrakech](/en/guide/hot-air-balloon-proposal-marrakech/) first." },
      { t: "img", key: "private", alt: "private hot air balloon marrakech - couple alone in the basket at sunrise" },
      { t: "h2", text: "Private vs Classic vs VIP" },
      { t: "ul", items: [
        "Classic: shared basket, best price, ideal for solo travellers and small budgets",
        "Private: your own basket for 2-8 guests, total privacy, perfect for proposals and families",
        "VIP: like private, plus 4x4 transfer, maximum 8 guests and the champagne-style toast included",
        "All three fly the same hour-long sunrise route over the Palmeraie and the Agafay plateau",
      ] },
      { t: "p", text: "Compare every option and price on our [Marrakech balloon price page](/en/hot-air-balloon-marrakech-price/), or see how the [VIP Luxury Hot Air Balloon Flight](/en/marrakech/vip-balloon-flight/) differs from this one. Ready to keep it just for you? [Book your private flight](/en/book/) on WhatsApp - and if you want to know who will fly you, read [guest reviews](/en/reviews/) or meet the team on [our homepage](/en/)." },
    ],
    gallery: [
      { key: "private", alt: "private hot air balloon flight marrakech couple in basket" },
      { key: "proposal", alt: "proposal in a private hot air balloon over marrakech" },
      { key: "certificate", alt: "private flight certificate after landing near marrakech" },
    ],
    reviewIdx: [2, 4],
    faqs: [
      { q: "How much does a private hot air balloon flight in Marrakech cost?", a: "From {{PRICE_PRIVATE}} per person for 2 guests, and the rate per person drops as your group grows (up to 8). The private price includes everything the Classic flight includes, plus the exclusive basket. Full price list on our [prices page](/en/hot-air-balloon-marrakech-price/)." },
      { q: "Can you organise a wedding proposal in the balloon?", a: "Yes - it is our speciality. Tell us your plan on WhatsApp: we can attach a banner before take-off, arrange a photographer, chill a bottle at altitude and time the toast for the moment you pop the question." },
      { q: "Is the private balloon really private?", a: "Yes. The basket, the pilot and the crew are reserved for your group only. Nobody else boards, and the chase vehicle carries just your crew." },
      { q: "How many people fit in a private basket?", a: "From 2 to 8 guests. For larger groups we fly two balloons side by side - ask us on WhatsApp and we will arrange the tandem take-off." },
      { q: "Can we choose where to fly?", a: "Balloons drift with the wind - the pilot steers between wind layers, not to a GPS destination. Tell your pilot what you would love to see (palms, desert, villages) and they will find the current that takes you there." },
      { q: "What if we want the champagne-style toast?", a: "A sparkling (alcohol-free on request) toast at altitude is included in the [VIP flight](/en/marrakech/vip-balloon-flight/) and available as an option on private flights - just mention it when you book." },
    ],
  },

  /* ============================== EN VIP ============================== */
  "en-vip": {
    intro: [
      "The VIP luxury hot air balloon marrakech flight is the royal version of the sunrise: a maximum of 8 guests in the basket, a 4x4 transfer instead of the minivan, a champagne-style toast at altitude and a gourmet Berber breakfast after landing.",
      "You are collected before dawn, flown for a full hour by one of our most senior pilots, toasted at 500 metres and served breakfast worthy of a riad. It is the flight our guests pick for milestone birthdays, honeymoons and once-in-a-lifetime trips to Marrakech by air balloon.",
    ],
    itinerary: {
      title: "Your VIP morning, step by step",
      steps: [
        { time: "04:45 - 05:15", title: "4x4 pickup at your door", text: "A modern 4x4 collects you anywhere in Marrakech - a quieter, more comfortable ride in the dark." },
        { time: "05:45", title: "Small-group inflation", text: "Meet your senior pilot beside the balloon. Eight guests maximum means space, calm and your own questions answered." },
        { time: "06:15", title: "Royal take-off", text: "You lift off as the first light gilds the Atlas - the classic VIP moment our pilots love most." },
        { time: "06:30 - 07:30", title: "One hour + champagne-style toast", text: "An hour over the palm grove and desert plateau, with the sparkling toast served at altitude by your crew." },
        { time: "07:30", title: "Landing ceremony", text: "Gentle touchdown, the traditional pilot's oath, certificates signed by your pilot and photos with the crew." },
        { time: "08:00", title: "Gourmet Berber breakfast", text: "A dressed table under the caidal tent: fresh msemen, amlou and honey, dates, eggs, fresh juices, endless mint tea." },
        { time: "09:30 - 10:30", title: "Return by 4x4", text: "Back at your hotel before the city gets busy - with the best photos of your trip already on your phone." },
      ],
    },
    blocks: [
      { t: "h2", text: "What makes the VIP balloon flight royal" },
      { t: "p", text: "Three things set the VIP flight apart: the basket is capped at 8 guests so you always have a corner rail to yourself; the champagne-style (alcohol-free on request) toast is served at altitude - a tradition borrowed from the great French balloon houses; and breakfast is served at a dressed table rather than a buffet, with more choices and fresh juices." },
      { t: "p", text: "You also fly with a senior pilot - the colleague our guests ask for by name - and the 4x4 transfer means a smoother ride at 5 a.m. and a faster return. It is our closest flight to the royal balloon marrakech experience, without the royal price of a private basket." },
      { t: "img", key: "vip", alt: "VIP luxury hot air balloon marrakech - champagne toast in the basket at sunrise" },
      { t: "h2", text: "Who chooses the VIP flight?" },
      { t: "ul", items: [
        "Couples who want the toast and the small group without paying for a fully private basket",
        "Families celebrating a birthday or anniversary in Marrakech",
        "Photographers who need space to move around the basket",
        "Guests who simply want the most comfortable version of the sunrise flight",
      ] },
      { t: "p", text: "If you prefer a basket to yourselves, compare with the [Private Hot Air Balloon Flight](/en/marrakech/private-balloon-flight/); if you want the classic shared experience at the best price, the [Classic Sunrise Hot Air Balloon Ride](/en/marrakech/sunrise-balloon-flight/) is the one. Prices for all flights, including the Agafay Desert option, are on our [price page](/en/hot-air-balloon-marrakech-price/) - and you can book the VIP morning in one message [here](/en/book/). Curious who flies you? Meet us through [our reviews](/en/reviews/) and [the homepage](/en/)." },
    ],
    gallery: [
      { key: "vip", alt: "VIP hot air balloon flight marrakech champagne toast at altitude" },
      { key: "passengers", alt: "VIP small group in the hot air balloon basket over marrakech" },
      { key: "breakfast", alt: "gourmet berber breakfast after the VIP balloon flight marrakech" },
    ],
    reviewIdx: [1, 3],
    faqs: [
      { q: "How much does the VIP hot air balloon flight cost?", a: "From {{PRICE_VIP}} per person, with a maximum of 8 guests. It includes the 4x4 transfer, the 1-hour flight, the champagne-style toast at altitude, the gourmet Berber breakfast and your flight certificate. See all options on the [price page](/en/hot-air-balloon-marrakech-price/)." },
      { q: "Is the toast alcoholic?", a: "We serve a sparkling wine-style toast, and we offer an excellent alcohol-free sparkling alternative on request - just tell us when booking. Both are served at altitude." },
      { q: "How many guests in the VIP basket?", a: "Eight maximum, usually five to seven in practice. That is the whole point: space at the rail, no elbows, and a pilot who has time to answer every question." },
      { q: "Can children join the VIP flight?", a: "Yes, from 5 years old. Families often book the whole 8-seat basket - ask us for the semi-private rate on WhatsApp when you take all seats." },
      { q: "What is the difference with the private flight?", a: "The private flight reserves the whole basket for your group only, from 2 guests. The VIP flight is a small shared basket (max 8) with the royal extras included. Compare them on our [prices page](/en/hot-air-balloon-marrakech-price/)." },
      { q: "Do you fly the VIP flight over the Agafay desert?", a: "The VIP morning uses the same launch field as the Classic flight - the route depends on the wind and often crosses the edge of the Agafay plateau. For a dedicated desert flight, see the [Agafay Desert balloon](/en/marrakech/agafay-desert-balloon/)." },
    ],
  },

  /* ============================== EN CAMEL ============================== */
  "en-camel": {
    intro: [
      "Two of Morocco's greatest experiences in one morning: a hot air balloon and camel ride marrakech combo that lifts you over the palm grove at sunrise, then puts you in the saddle for a gentle camel ride through the same Palmeraie.",
      "You fly first, breakfast second, and ride third - back at your hotel by 11:30 with a full Moroccan morning behind you. It is the best-value way to tick both boxes for families and first-time visitors, and everything is booked in one WhatsApp message.",
    ],
    itinerary: {
      title: "Your balloon + camel morning, step by step",
      steps: [
        { time: "04:45 - 05:15", title: "Hotel pickup", text: "Air-conditioned minivan from your hotel or riad anywhere in Marrakech." },
        { time: "05:45", title: "Inflation and briefing", text: "Meet the crew and your pilot at the launch field while the balloon comes alive." },
        { time: "06:15 - 07:30", title: "One-hour sunrise flight", text: "The full balloon experience: palm grove, desert plateau, villages and the Atlas panorama." },
        { time: "07:30", title: "Landing, toast, certificate", text: "Traditional pilot's toast, personalised flight certificate and photos with the crew." },
        { time: "08:00 - 08:45", title: "Berber breakfast", text: "Msemen, amlou, olives, dates and mint tea under the caidal tent." },
        { time: "09:00 - 09:45", title: "Camel ride in the Palmeraie", text: "A 45-minute ride on well-kept camels through the palm grove, led by an experienced camel handler. Helmets and blankets provided." },
        { time: "10:00 - 11:30", title: "Back at your hotel", text: "Return transfer with two adventures, dozens of photos and one legendary morning." },
      ],
    },
    blocks: [
      { t: "h2", text: "Why the balloon + camel combo works so well" },
      { t: "p", text: "The camel ride takes place right after breakfast, on the same estate as the balloon landing - no extra driving, no second pickup. While the balloon shows you the palm grove from above, the camel shows you the same paths at camel-eye level: sand tracks, walled gardens, the smell of mint and woodsmoke." },
      { t: "p", text: "The combo is priced lower than booking the [Classic balloon flight](/en/marrakech/sunrise-balloon-flight/) and a separate camel tour, and it saves you half a day of logistics. Children from 5 years old can do both activities." },
      { t: "img", key: "camel", alt: "hot air balloon and camel ride marrakech combo - camels in the palm grove under the balloon" },
      { t: "h2", text: "Is the camel ride ethical?" },
      { t: "ul", items: [
        "Camels are healthy, well-fed and rested between rides - we cap the number of rides per animal per day",
        "Padded saddles and blankets, never ridden in the midday heat",
        "Rides are walking pace through the palm grove - no rushed tourist-carousel circuit",
        "You can decline the camel ride and keep the balloon-only price difference - just tell us when booking",
      ] },
      { t: "p", text: "If you would rather fly over the stone desert than the palm grove, look at the [Agafay Desert balloon flight](/en/marrakech/agafay-desert-balloon/) - and for all prices including the combo, see our [Marrakech balloon price page](/en/hot-air-balloon-marrakech-price/). Book the whole morning in one message [here](/en/book/)." },
    ],
    gallery: [
      { key: "camel", alt: "camel ride in the marrakech palm grove after the balloon flight" },
      { key: "palmgrove", alt: "balloon over the palm grove - balloon and camel ride marrakech" },
      { key: "breakfast", alt: "berber breakfast between balloon and camel ride in marrakech" },
    ],
    reviewIdx: [5, 0],
    faqs: [
      { q: "How much does the balloon and camel ride combo cost?", a: "From {{PRICE_CAMEL}} per adult - cheaper than booking both activities separately. It includes pickup, the 1-hour balloon flight, breakfast, the 45-minute camel ride and return transfer." },
      { q: "Is the camel ride safe for children?", a: "Yes, from 5 years old. Children ride with a parent or the camel handler at walking pace, and we use padded saddles and blankets. Helmets are available on request." },
      { q: "Can I do only the balloon and skip the camel?", a: "Of course - tell us on WhatsApp and we will adjust your booking to the classic flight. The combo simply saves money when you want both." },
      { q: "What should I wear for the camel ride?", a: "Long trousers are more comfortable than shorts, with closed shoes. The camel stands up in two big movements - hold the saddle handle and lean back when it rises; your handler guides you through it." },
      { q: "How long does the whole morning last?", a: "Pickup at 5:00, back at your hotel around 11:30 - about 6.5 hours in total including both activities and breakfast." },
    ],
  },

  /* ============================== EN AGAFAY ============================== */
  "en-agafay": {
    intro: [
      "Forty minutes south of Marrakech, the land turns to stone: the Agafay desert, a moon-like plateau of ochre hills with the Atlas rising behind it. The Agafay desert balloon flight takes you over this otherworldly landscape at sunrise - no dunes, no roads, just silence and space.",
      "It is our most cinematic route and the closest you can get to a Sahara balloon marrakech morning without a two-day expedition. Same full package as the Classic flight: pickup, one hour in the air, Berber breakfast, flight certificate - booked on WhatsApp.",
    ],
    itinerary: {
      title: "Your Agafay morning, step by step",
      steps: [
        { time: "04:45 - 05:15", title: "Hotel pickup", text: "Minivan from your hotel, riad or rental anywhere in Marrakech." },
        { time: "05:45", title: "Launch field on the Agafay edge", text: "Meet the crew south of the city where the plain meets the stone desert." },
        { time: "06:15 - 07:30", title: "One hour over the Agafay", text: "Drift over ochre hills, dry riverbeds and the white tents of desert camps, with the snowy Atlas as your backdrop." },
        { time: "07:30", title: "Landing in the desert", text: "Touch down on the plateau - the retrieval team, the toast and your certificate are already waiting." },
        { time: "08:00", title: "Berber breakfast in a desert camp", text: "Breakfast is served in a caidal tent on the Agafay itself: msemen, amlou, dates, mint tea - with camels often grazing nearby." },
        { time: "09:30 - 10:30", title: "Back at your hotel", text: "Return transfer. Optional add-on: a camel or quad ride before you head back." },
      ],
    },
    blocks: [
      { t: "h2", text: "Why fly over the Agafay desert" },
      { t: "p", text: "The Agafay is what photographers dream about: sculpted hills, hard shadows at dawn, and the improbable contrast of snow-capped mountains behind a stone desert. Because the plateau is empty, the silence at 500 metres is absolute - you hear the burner, the wind, and nothing else." },
      { t: "p", text: "The flight departs from a dedicated field on the desert's edge, so take-off happens over the Agafay itself rather than the palm grove. If you cannot choose between desert and palms, note that most Classic mornings also cross the edge of the Agafay - the dedicated [Agafay flight](/en/marrakech/agafay-desert-balloon/) simply guarantees it. You can also compare all our routes in the complete guide to [hot air balloon rides in Morocco](/en/hot-air-balloon-morocco/)." },
      { t: "img", key: "agafay", alt: "hot air balloon agafay desert marrakech - balloon over the stone desert at sunrise" },
      { t: "h2", text: "Make it a full desert morning" },
      { t: "ul", items: [
        "Add a camel ride on the plateau after breakfast (45 minutes)",
        "Add a quad buggy circuit through the Agafay tracks (1 hour)",
        "Book the VIP version of the desert flight with a small basket and a sparkling toast",
        "Stay for lunch in a desert camp - ask us on WhatsApp, we arrange everything",
      ] },
      { t: "p", text: "Prices: the Agafay flight is {{PRICE_AGAFAY}} per adult - the full comparison with every option is on our [price page](/en/hot-air-balloon-marrakech-price/). If you would rather fly over palms, the [Classic sunrise flight](/en/marrakech/sunrise-balloon-flight/) is the original; for the royal treatment, the [VIP flight](/en/marrakech/vip-balloon-flight/) can also be flown in a small basket. Ready? [Book your desert morning](/en/book/)." },
    ],
    gallery: [
      { key: "agafay", alt: "agafay desert hot air balloon at sunrise" },
      { key: "certificate", alt: "landing in the agafay desert after the balloon flight" },
      { key: "breakfast", alt: "berber breakfast in a desert camp after the agafay balloon flight" },
    ],
    reviewIdx: [3, 1],
    faqs: [
      { q: "Is the Agafay a real desert?", a: "It is a stone desert - arid, moon-like hills rather than sand dunes. For dunes you need the Sahara (Merzouga or Erg Chigaga), a full day away. The Agafay gives you the desert feeling 40 minutes from Marrakech, and from the air the two are hard to tell apart." },
      { q: "How much does the Agafay balloon flight cost?", a: "From {{PRICE_AGAFAY}} per adult including pickup, the 1-hour desert flight, breakfast in a desert camp and your certificate. All prices are on our [price page](/en/hot-air-balloon-marrakech-price/)." },
      { q: "Is the desert flight different from the Classic?", a: "Yes - the launch field is on the Agafay edge, so you fly over the desert for the whole hour and have breakfast in a desert camp. The Classic flight flies over the palm grove and only sometimes reaches the desert edge." },
      { q: "Can I add a camel or quad ride?", a: "Yes, both are available on the plateau after breakfast. Ask on WhatsApp when booking and we will build the morning around them." },
      { q: "Is it colder over the desert?", a: "Desert mornings are cold before sunrise and warm quickly after - same as everywhere around Marrakech. Bring the layers from our [what to wear guide](/en/guide/what-to-wear-hot-air-balloon/) and you will be comfortable." },
    ],
  },

  /* ============================== EN AGADIR (city) ============================== */
  "en-agadir": {
    intro: [
      "Skip the four-hour drive to Marrakech: the hot air balloon Agadir experience flies at sunrise over the Souss Valley, a green patchwork of argan forests, orange groves and tiny villages, with the Atlantic glittering on the horizon.",
      "We collect you from any hotel in Agadir or Taghazout before dawn, fly you for a full hour with a licensed Moroccan pilot, land gently in the valley and finish with a Berber breakfast and your flight certificate. If you are looking for a hot air balloon agadir morocco morning that ends before your beach day starts - this is it.",
    ],
    blocks: [
      { t: "h2", text: "What you will see over the Souss Valley" },
      { t: "p", text: "The Souss is Morocco's orchard. From the basket you drift over argan trees - the twisted, goat-climbing trees that produce argan oil - citrus groves, wheat fields and whitewashed farmhouses. On clear mornings the Atlantic Ocean shimmers to the west and the Anti-Atlas lines the southern horizon. It is a greener, softer flight than the desert routes around Marrakech, and the light over the water at 07:00 is unforgettable." },
      { t: "p", text: "Like everywhere in Morocco, ballooning here is calm: no engine, no wind in your face, just the burner's occasional whoosh and your pilot pointing out villages, the andalusian-style grand mosque of Agadir, and the surf break at Taghazout far in the distance." },
      { t: "img", key: "agadir", alt: "hot air balloon agadir - balloon over the Souss Valley and argan forests at sunrise" },
      { t: "h2", text: "How your Agadir balloon morning works" },
      { t: "ul", items: [
        "05:15 - hotel pickup in Agadir, Taghazout or Tamraght (included, air-conditioned minivan)",
        "06:00 - inflation and safety briefing at the launch field in the Souss Valley",
        "06:30 - take-off at sunrise, one full hour in the air at 200-800 metres",
        "07:30 - gentle landing, traditional pilot's toast, personalised flight certificate",
        "08:00 - Berber breakfast: msemen, amlou, olives, dates and mint tea",
        "10:00 - back at your hotel, in time for breakfast by the pool or the first surf session",
      ] },
      { t: "h2", text: "Agadir or Marrakech - which balloon flight should you choose?" },
      { t: "p", text: "Both flights are the same price, the same hour in the air and the same full package - the difference is the landscape. Marrakech gives you palms, desert plateau and big mountains; Agadir gives you the green Souss Valley and the ocean. If your trip includes both cities, fly both - guests who do often tell us the two flights felt like two different countries. Our complete guide to [hot air balloon rides in Morocco](/en/hot-air-balloon-morocco/) compares all the places you can fly, and every price is on our [price page](/en/hot-air-balloon-marrakech-price/)." },
      { t: "h2", text: "Safety, weather and booking your Agadir flight" },
      { t: "p", text: "Your pilot is licensed by the Moroccan Civil Aviation Authority and the balloon is insured for full passenger liability - we answer every safety question in our guide [is a hot air balloon ride in Morocco safe?](/en/guide/is-hot-air-balloon-safe-morocco/). Flights run all year with the most reliable conditions from October to April; if the wind does not cooperate we cancel free of charge. Common questions (pickup times, kids, pregnancy) are answered in [the FAQ](/en/faq/), real mornings in [our guest reviews](/en/reviews/), and booking takes one WhatsApp message on [the booking page](/en/book/)." },
    ],
    gallery: [
      { key: "agadir", alt: "hot air balloon agadir over the Souss valley at sunrise" },
      { key: "inflation", alt: "balloon inflation before the agadir hot air balloon flight" },
      { key: "passengers", alt: "passengers in the basket over the souss valley near agadir" },
      { key: "breakfast", alt: "berber breakfast after the hot air balloon agadir flight" },
    ],
    reviewIdx: [4, 0, 3],
    faqs: [
      { q: "How much does a hot air balloon in Agadir cost?", a: "From {{PRICE_AGADIR}} per adult and {{PRICE_AGADIR_CHILD}} per child (5-11) - the same price as Marrakech, including hotel pickup in Agadir or Taghazout, the 1-hour flight, Berber breakfast and flight certificate." },
      { q: "Do you pick up from Taghazout and Tamraght?", a: "Yes, pickup and return are included from Agadir city, Taghazout and Tamraght hotels and surf camps. We confirm your exact pickup time by WhatsApp the evening before." },
      { q: "Where does the balloon take off?", a: "In the Souss Valley, about 25 minutes inland from Agadir - far from the airport's flight paths, with open fields for a safe landing." },
      { q: "Can I fly in Agadir and Marrakech on the same trip?", a: "Yes, and many guests do. Book both on WhatsApp with your travel dates and we will schedule them on different mornings - the landscapes are completely different." },
      { q: "What if the weather cancels my Agadir flight?", a: "You pay nothing. Coastal fog is the usual culprit; we check forecasts twice daily, confirm the evening before, and you can reschedule to another morning of your stay or cancel free." },
      { q: "Is it safe to fly a balloon near the ocean?", a: "We launch 25 km inland, so the flight is entirely over the Souss Valley farmland - the ocean is a view, never a hazard. Safety rules are the same as in Marrakech: licensed pilots, insured flights, strict wind limits." },
      { q: "How far in advance should I book?", a: "Agadir flights are less crowded than Marrakech: 2-3 days' notice is usually enough, though sunset-season weekends (April, October) fill faster. Message us with your dates and we will confirm within minutes." },
    ],
  },

  /* ============================== EN MOROCCO (pillar) ============================== */
  "en-morocco": {
    intro: [
      "Morocco is one of the best countries in the world to fly a balloon: reliable morning weather, dramatic landscapes within an hour of major cities, and prices far below Europe. This complete guide covers everything about hot air balloon Morocco flights - where you can fly, what it costs, when to go and how to choose an operator.",
      "We are Hot Air Balloon Experience Agadir, a licensed Moroccan operator flying sunrise flights over Marrakech, the Agafay desert and Agadir since our first basket. Everything below is written by our pilots - no marketing fog, just what you need to plan the perfect hot air balloon in morocco morning.",
    ],
    blocks: [
      { t: "h2", text: "Where can you fly a hot air balloon in Morocco?" },
      { t: "h3", text: "Marrakech - the classic (and the busiest)" },
      { t: "p", text: "Marrakech is Morocco's balloon capital: the [Classic sunrise flight over the palm grove](/en/marrakech/sunrise-balloon-flight/) is the country's most booked balloon experience, with take-offs every morning of the year. You fly over the Palmeraie, the Haouz plain and often the edge of the Agafay desert, with the Atlas Mountains as a permanent backdrop. Marrakech also has the widest choice of flight types: private baskets, [VIP flights](/en/marrakech/sunrise-balloon-flight/) with champagne-style toasts, and balloon + camel combos." },
      { t: "h3", text: "The Agafay desert - Morocco's moon landscape" },
      { t: "p", text: "Forty minutes from Marrakech, the Agafay stone desert feels like another planet: ochre hills, dry riverbeds, desert camps with white tents. The dedicated [Agafay Desert balloon flight](/en/marrakech/agafay-desert-balloon/) departs from the desert's edge, flies over the plateau for a full hour and has breakfast in a desert camp. It is the most cinematic morning you can book without driving to the Sahara." },
      { t: "h3", text: "Agadir - the green valley and the ocean" },
      { t: "p", text: "The [hot air balloon Agadir flight](/en/agadir-hot-air-balloon/) flies over the Souss Valley: argan forests, orange groves and villages, with the Atlantic on the horizon. It is the best choice if you are staying on the coast (Taghazout, Tamraght, Agadir) - no 4-hour drive to Marrakech, pickup included, and a completely different landscape from the desert routes." },
      { t: "h3", text: "Ouarzazate and the Sahara - what about Merzouga?" },
      { t: "p", text: "You will find occasional balloon activity around Ouarzazate and the Dades Valley, and you may read about balloons over Merzouga's dunes. In practice there is no permanent, licensed daily operation there - flights are seasonal or one-off events. If seeing the Erg Chebbi dunes from the air matters to you, ask us: we occasionally organise private charters, or we will honestly tell you to keep the dunes for a 4x4 trip and fly with us where conditions are proven." },
      { t: "img", key: "atlasAerial", alt: "hot air balloon morocco - aerial view over the High Atlas Mountains at sunrise" },
      { t: "h2", text: "When is the best time to fly in Morocco?" },
      { t: "p", text: "Balloons fly all year in Morocco, but mornings are not equal. October to April is prime season: cool, stable air, soft light and the Atlas capped in snow. Summer is perfectly flyable if you take off at dawn - by 9 a.m. the ground heats up and thermals make landing conditions rougher. Winter mornings can be cold (5-10 degrees before sunrise) but offer the clearest visibility of the year. For a month-by-month breakdown, read our guide to [the best time for a hot air balloon in Marrakech](/en/guide/best-time-hot-air-balloon-marrakech/)." },
      { t: "h2", text: "What does a balloon flight in Morocco cost?" },
      { t: "p", text: "Morocco is one of the cheapest developed ballooning destinations in the world. A shared sunrise flight starts around {{PRICE_CLASSIC}} per person (roughly 140 euros) including hotel pickup, one hour in the air, breakfast and certificate. Private baskets run from {{PRICE_PRIVATE}}, VIP small-group flights from {{PRICE_VIP}}. For comparison: Cappadocia charges 180-250 euros for 60-90 minutes, and European operators often exceed 250 euros for a shorter flight. Full, transparent price tables for every flight type are on our [Marrakech balloon price page](/en/hot-air-balloon-marrakech-price/), and we compare Morocco with the rest of the world in [how much does a hot air balloon ride cost?](/en/guide/how-much-does-hot-air-balloon-cost/)." },
      { t: "h2", text: "Is it safe to fly a balloon in Morocco?" },
      { t: "p", text: "Yes - when you fly with a licensed operator. Moroccan commercial pilots are certified by the Direction Gnrale de l'Aviation Civile, balloons undergo documented inspections, and serious operators only launch in safe wind and visibility. The accidents you may have read about involved operators cutting corners; choosing a company that publishes its licences, insurance and pilot names removes almost all of the risk. We wrote the full answer, including what to check before you book, in [are hot air balloons safe in Morocco?](/en/guide/is-hot-air-balloon-safe-morocco/)." },
      { t: "h2", text: "How to choose your balloon operator" },
      { t: "ul", items: [
        "Licensed pilots: ask for the pilot's name and licence authority - we publish ours on every flight page",
        "Real flight time: an hour in the air, not 20 minutes - always check the duration",
        "Insurance: full passenger liability, same standards as Europe",
        "Group size: 16 maximum in shared baskets; beware of 24-seat industry baskets",
        "Transparent pricing: no deposit demanded over the phone, payment after the flight",
        "Weather discipline: an operator that cancels for wind is an operator you can trust",
      ] },
      { t: "h2", text: "What a morning flight actually looks like" },
      { t: "p", text: "Hotel pickup between 4:45 and 5:15, inflation show at the launch field, take-off at sunrise, a full hour between 200 and 800 metres, a gentle landing, the pilot's toast, a Berber breakfast under a caidal tent and your flight certificate - back at your hotel by 10:30. That is the standard morning; see it step by step on the [Classic Marrakech flight page](/en/marrakech/sunrise-balloon-flight/) or the [Agadir page](/en/agadir-hot-air-balloon/)." },
      { t: "h2", text: "Morocco vs Cappadocia - the honest comparison" },
      { t: "p", text: "Cappadocia flies more balloons and has the famous fairy-chimney photos; Morocco flies fewer balloons over wilder, emptier landscapes - and charges about half the price. Crowds: Cappadocia launches 100+ balloons at once; Marrakech usually 10-20. Views: Cappadocia has rock valleys, Morocco has palms, stone desert, Atlas mountains and (from Agadir) the ocean. Our full, honest comparison is in [Marrakech vs Cappadocia: which balloon ride is better?](/en/guide/marrakech-vs-cappadocia-hot-air-balloon/)." },
      { t: "h2", text: "Practical questions before you book" },
      { t: "p", text: "Everything about pickup times, age limits, pregnancy, payments and weather cancellations is answered in [our FAQ](/en/faq/). To reserve, [book your flight in one WhatsApp message](/en/book/) - no online payment, you pay after you fly." },
    ],
    faqs: [
      { q: "Can you fly a hot air balloon over the Sahara dunes?", a: "There is no permanent licensed daily operation over Merzouga or Erg Chigaga. The reliable desert experience in Morocco is the Agafay stone desert, 40 minutes from Marrakech - flown every morning." },
      { q: "Which city is best for a balloon flight in Morocco?", a: "Marrakech for palms, desert and mountains with the widest choice of flights; Agadir for the green Souss Valley and the ocean if you are on the coast. Both cost the same and use the same safety standards." },
      { q: "How much does a hot air balloon cost in Morocco?", a: "Shared sunrise flights from {{PRICE_CLASSIC}} per person, private baskets from {{PRICE_PRIVATE}}, VIP from {{PRICE_VIP}} - all including pickup, breakfast and certificate. Details on the [price page](/en/hot-air-balloon-marrakech-price/)." },
      { q: "Do balloons fly in winter in Morocco?", a: "Yes - winter is actually high season: clear skies, calm winds and snowy mountains. Dress in layers for the pre-dawn cold; by landing it is usually warm enough for breakfast outside." },
      { q: "Is ballooning in Morocco suitable for children?", a: "From 5 years old, with a parent. The flight is calm, baskets have high rails, and the breakfast-after makes it a family favourite." },
      { q: "How do I know an operator is licensed?", a: "Ask for the pilot's name, the licence authority (Direction Gnrale de l'Aviation Civile) and the insurance certificate - serious operators answer immediately. Ours are published on [our about page](/en/about/) and every flight page." },
    ],
  },

  /* ============================== EN PRICES ============================== */
  "en-prices": {
    intro: [
      "Transparent hot air balloon marrakech price list for 2026 - every flight, every inclusion, no hidden fees. You pay after the flight, never online, and if the weather cancels your morning you pay nothing.",
      "Below you will find the exact prices for the Classic, Private, VIP, Balloon + Camel and Agafay flights, plus what changes the price, what is always included, and how children are priced. Everything is confirmed in one WhatsApp message before you commit to anything.",
    ],
    blocks: [
      { t: "h2", text: "What is always included in every price" },
      { t: "ul", items: [
        "Hotel pickup and return transfer (Marrakech, Agadir, Taghazout - depending on your flight)",
        "A full hour in the air with a licensed pilot - not a 20-minute hop",
        "Traditional Berber breakfast after landing",
        "Personalised flight certificate signed by your pilot",
        "Full passenger insurance and bottled water on board",
        "The inflation show before take-off - yes, you can watch and photograph it",
      ] },
      { t: "h2", text: "What changes the price of a balloon flight" },
      { t: "ul", items: [
        "Basket exclusivity: a private basket costs more per person than a shared one",
        "Group size: the private rate per person drops as your group grows from 2 to 8",
        "Extras: champagne-style toast, professional photographer, camel or quad add-ons",
        "Season: prices are the same all year - we do not charge high-season premiums",
        "Children: 5-11 year olds pay the child rate (12+ pay adult price, under 5 cannot fly)",
      ] },
      { t: "p", text: "Wondering how Morocco compares with Cappadocia, Europe or the US? We published the honest international comparison in [how much does a hot air balloon ride cost?](/en/guide/how-much-does-hot-air-balloon-cost/)." },
      { t: "h2", text: "How you pay - and when" },
      { t: "p", text: "There is no online payment and no deposit. You book by WhatsApp, we confirm the pickup time the evening before, you fly, and you pay after landing - cash (MAD or EUR) or card at the landing field. This is deliberate: if the weather cancels the flight, nobody has to chase a refund. It also means the price you see here is the price you pay on the day." },
      { t: "h2", text: "Ready to lock in your morning?" },
      { t: "p", text: "Pick your flight above, message us your date and hotel on [the booking page](/en/book/), and we confirm within minutes. If you have a question about prices that is not answered here, [the FAQ](/en/faq/) probably has it - or just ask us directly." },
    ],
    reviewIdx: [0, 1, 5],
    faqs: [
      { q: "Is there a deposit or prepayment?", a: "No. Booking is by WhatsApp and payment happens after the flight, at the landing field. This protects you if the weather cancels the morning." },
      { q: "Do you accept card payments?", a: "Yes - cash in MAD or EUR and all major cards are accepted after the flight. There is no card fee." },
      { q: "Are prices the same all year?", a: "Yes. We do not raise prices for holidays, high season or last-minute bookings. The price on this page is the price you pay." },
      { q: "Do children pay full price?", a: "Children aged 5-11 pay the child rate ({{PRICE_CLASSIC_CHILD}} on Classic flights); from 12 they pay the adult price. Children under 5 cannot fly for safety reasons." },
      { q: "Is tipping expected?", a: "Tips are never expected and never requested - the crew is salaried. If a flight made your trip, a tip is appreciated but entirely your choice." },
      { q: "Why is Marrakech cheaper than Europe?", a: "Lower operating costs, no intermediary platforms, and year-round flying that keeps the balloons busy. The equipment, licences and insurance standards are the same as in Europe." },
    ],
  },

  /* ============================== EN REVIEWS ============================== */
  "en-reviews": {
    intro: [
      "Real reviews from real passengers who flew with us over Marrakech, the Agafay desert and Agadir. We publish them unedited - the five-star mornings and the honest details - because that is how we would want to choose an operator.",
      "Most of our guests book through WhatsApp after a friend's recommendation, so these pages are where we prove ourselves. Every guest below flew a real flight; names are published with permission. Ready to add yours? [Book your morning here](/en/book/).",
    ],
    blocks: [
      { t: "h2", text: "What guests mention most" },
      { t: "ul", items: [
        "The light at sunrise over the Atlas - the most photographed moment of their trip",
        "The crew's calm: nervous flyers tell us the briefing made them relax before take-off",
        "The full hour in the air - longer than most operators, and guests notice",
        "The Berber breakfast and the flight certificate: the details that make it feel personal",
        "WhatsApp booking: confirmed in minutes, no deposit, no stress",
      ] },
      { t: "p", text: "Flown with us recently? Send your photos and a few lines on WhatsApp and we will add your review to this page. Every review below flew the [Classic Marrakech flight](/en/marrakech/sunrise-balloon-flight/), the [Private flight](/en/marrakech/private-balloon-flight/) or our [Agadir flight](/en/agadir-hot-air-balloon/) - each links to the flight they describe." },
    ],
    reviewIdx: [0, 1, 2, 3, 4, 5],
    faqs: [
      { q: "Are these reviews verified?", a: "Yes - every review comes from a passenger who booked and flew with us, with name and flight date on file. We publish them unedited." },
      { q: "Where else can I read reviews?", a: "Ask us on WhatsApp and we will send you our Google Maps and TripAdvisor profiles, plus recent guest photos from the flight you are considering." },
      { q: "Do you publish negative reviews?", a: "We publish all feedback and act on it. The most common complaint in our history is a cancelled flight for weather - which is exactly the cancellation that protects you." },
    ],
  },

  /* ============================== EN FAQ ============================== */
  "en-faq": {
    intro: [
      "Every question we hear before a hot air balloon Marrakech or Agadir flight - answered honestly by the pilots who fly them. Pickup times, kids, pregnancy, weather, payments, cameras: it is all here.",
      "If your question is not listed, message us on WhatsApp - a real pilot or crew member answers, usually within 10 minutes. And when you are ready, [book your flight here](/en/book/).",
    ],
    blocks: [
      { t: "h2", text: "Booking and payment questions" },
      { t: "h3", text: "How far in advance should I book?" },
      { t: "p", text: "For [Marrakech sunrise flights](/en/marrakech/sunrise-balloon-flight/), 2-3 days is usually enough; private and VIP baskets and the April/October weekends fill faster. Agadir flights need 1-2 days' notice. Same-day requests sometimes work - always worth a WhatsApp message." },
      { t: "h3", text: "Do I pay in advance?" },
      { t: "p", text: "No - payment happens after the flight at the landing field, in cash (MAD or EUR) or by card. There is no deposit and no online payment, which means a weather cancellation never costs you anything. The full policy is on the [price page](/en/hot-air-balloon-marrakech-price/)." },
      { t: "h2", text: "Morning logistics" },
      { t: "h3", text: "What time is pickup?" },
      { t: "p", text: "Between 4:45 and 5:15 depending on your hotel and the season (sunrise moves). We confirm the exact time by WhatsApp the evening before your flight. If [the best time for a hot air balloon in Marrakech](/en/guide/best-time-hot-air-balloon-marrakech/) is new to you, that guide also explains how sunrise shifts through the year." },
      { t: "h3", text: "What should I wear and bring?" },
      { t: "p", text: "Layers for the cold before dawn, closed shoes, sunglasses and your passport for the manifest. The complete checklist is in [what to wear on a hot air balloon ride](/en/guide/what-to-wear-hot-air-balloon/)." },
      { t: "h2", text: "Safety and health" },
      { t: "h3", text: "Is ballooning safe in Morocco?" },
      { t: "p", text: "With a licensed operator, yes. Our pilots hold commercial licences from the Moroccan Civil Aviation Authority, balloons are inspected continuously, and we cancel for wind or visibility without hesitation. The long answer - including what to check before booking any operator - is in [are hot air balloons safe in Morocco?](/en/guide/is-hot-air-balloon-safe-morocco/)." },
      { t: "h3", text: "Can I fly if I am pregnant or have a medical condition?" },
      { t: "p", text: "We advise against flying when pregnant, and you must be able to stand for an hour and step over the 1.20 m basket rail. Recent surgery, serious back problems or heart conditions: message us first and we will give you an honest answer, not a sales pitch." },
      { t: "h3", text: "Can children fly?" },
      { t: "p", text: "From 5 years old, with a parent or guardian. The flight is calm, the rails are high, and kids love spotting donkeys and sheep from above. Under 5 cannot fly for safety reasons." },
      { t: "h2", text: "Weather and cancellations" },
      { t: "h3", text: "What happens if it is windy or foggy?" },
      { t: "p", text: "We cancel free of charge. Balloons need calm wind and decent visibility; our pilots check forecasts twice a day and make the final call at the launch field if needed. You reschedule to another morning of your stay or simply do not pay - there was nothing to pay in the first place." },
      { t: "h3", text: "Do flights run all year?" },
      { t: "p", text: "Yes, every morning of the year from Marrakech and Agadir. October-April is the most reliable and most photogenic season; summer flights take off at dawn and land before the heat." },
      { t: "h2", text: "Still deciding?" },
      { t: "p", text: "Browse [all our flights](/en/), compare prices, or simply [message us on WhatsApp](/en/book/) - we would rather answer ten questions than have you book the wrong morning." },
    ],
    faqs: [
      { q: "Can I bring a drone or a professional camera?", a: "Cameras and phones: yes, always. Drones: only before take-off and after landing - never during the flight, and subject to Moroccan drone regulations which you must arrange yourself." },
      { q: "Is there a toilet at the launch field?", a: "Yes, basic facilities at the launch field and at the breakfast camp. The flight itself is one hour." },
      { q: "Can non-flying companions join the morning?", a: "Yes - they can watch the inflation, ride the chase vehicle to the landing point and join breakfast for a reduced ground fee. Ask on WhatsApp." },
      { q: "Do you fly in the rain?", a: "Light rain without wind can be flyable, but we cancel when rain affects visibility or landing conditions. Morocco's climate means rain cancellations are rare - a few days a year." },
      { q: "How many people are in the basket?", a: "Shared baskets carry 8-16 guests; VIP baskets maximum 8; private baskets just your group of 2-8. Every seat is at the rail." },
      { q: "What languages does the crew speak?", a: "Arabic, French and English on every flight; Spanish, German and Dutch with advance notice - tell us your language when booking." },
      { q: "Can we book for a group of 20+?", a: "Yes - we fly two or three balloons in formation. Message us with your group size and date and we will quote a group rate." },
    ],
  },

  /* ============================== EN BOOKING ============================== */
  "en-contact": {
    intro: [
      "Book your hot air balloon flight in one WhatsApp message: tell us your date, how many adults and children, and your hotel - we confirm availability and your pickup time, and you pay after the flight.",
      "No online payment, no deposit, no cancellation fee if the weather says no. Fill in the quick form below to open WhatsApp with everything pre-filled, or message us directly and a pilot's team member will answer within minutes.",
    ],
    blocks: [
      { t: "h2", text: "Which flight should you book?" },
      { t: "ul", items: [
        "First balloon flight or best value: the [Classic sunrise flight in Marrakech](/en/marrakech/sunrise-balloon-flight/)",
        "Staying on the coast: the [hot air balloon Agadir flight](/en/agadir-hot-air-balloon/)",
        "Couples and proposals: the [Private Hot Air Balloon Flight](/en/marrakech/private-balloon-flight/)",
        "Celebrating something: the [VIP Luxury flight](/en/marrakech/vip-balloon-flight/)",
        "Not sure about prices: the full comparison is on the [price page](/en/hot-air-balloon-marrakech-price/)",
      ] },
      { t: "p", text: "Booking questions are usually answered in [the FAQ](/en/faq/) - but the fastest way to an answer is simply to message us. We speak Arabic, French, English, Spanish, German and Dutch." },
    ],
    faqs: [
      { q: "How fast do you answer on WhatsApp?", a: "Usually within 10 minutes between 07:00 and 21:00 (GMT+1). Overnight messages are answered first thing in the morning." },
      { q: "What information do you need to book?", a: "Your date (plus a backup morning if you have one), number of adults and children, and your hotel or riad name. That is all - we handle the rest." },
      { q: "Can I change my booking?", a: "Yes - dates, flight type and passenger numbers can be changed free of charge up to 24 hours before pickup, subject to availability." },
    ],
  },

  /* ============================== EN ABOUT ============================== */
  "en-about": {
    intro: [
      "We are Hot Air Balloon Experience Agadir, a Moroccan ballooning company flying sunrise flights over Marrakech, the Agafay desert and the Souss Valley of Agadir. Licensed pilots, insured baskets, honest prices - and a WhatsApp message as the only booking form you will ever need.",
      "This page is who we are, who flies you, and why hundreds of travellers trust us with their one sunrise in Morocco. If you prefer proof to promises, read [our guest reviews](/en/reviews/) or the details of [how safe our flights are](/en/guide/is-hot-air-balloon-safe-morocco/).",
    ],
    blocks: [
      { t: "h2", text: "Our story" },
      { t: "p", text: "We started with one balloon, one landrover and a lot of early mornings. What has not changed: flights every single morning of the year, a full hour in the air (never 20 minutes), breakfast cooked by the same families since day one, and payment only after you fly. What has: three launch sites - Marrakech Palmeraie, the Agafay desert and the Souss Valley near Agadir - and a fleet that flies over 350 mornings a year." },
      { t: "img", key: "pilot", alt: "our chief pilot before a hot air balloon flight in Morocco" },
      { t: "h2", text: "Who flies you" },
      { t: "p", text: "Our chief pilot Youssef El Amrani holds a commercial balloon licence from the Moroccan Civil Aviation Authority with 12 years and 3,400+ flights over Morocco - from the Palmeraie to the dunes of the deep south. Every pilot on our team carries the same commercial licence, flies with a written weather checklist, and has flown every route in this site hundreds of times. You will meet your pilot at the launch field before take-off - ask them anything, that is what they are there for." },
      { t: "h2", text: "Our standards" },
      { t: "ul", items: [
        "Licensed commercial pilots only - no exceptions, no trainees at the controls",
        "Balloons and burners inspected and documented after every flight",
        "Full passenger liability insurance on every flight",
        "Maximum 16 guests in shared baskets, 8 in VIP, only your group in private baskets",
        "Weather discipline: we cancel rather than push the limits, always",
        "Payment after the flight - your money never leaves your pocket before your feet leave the ground",
      ] },
      { t: "h2", text: "Come fly with us" },
      { t: "p", text: "Pick your morning on [the homepage](/en/) - Classic, Private, VIP, Agafay or Agadir - and [book it in one WhatsApp message](/en/book/). We would love to show you Morocco the way we see it every morning: slowly, quietly, and from above." },
    ],
    faqs: [
      { q: "Where are you based?", a: "Our operational base is in the Palmeraie of Marrakech, with a second crew based in the Souss Valley for Agadir flights. We fly from three launch sites: Marrakech, the Agafay desert and Agadir." },
      { q: "Can I visit before booking?", a: "Yes - message us and come watch the inflation from the launch field one morning. Most people who watch end up booking the next day." },
      { q: "Do you offer gift vouchers?", a: "Yes - ask on WhatsApp and we will send a personalised voucher valid 12 months, for any flight type. Ideal for birthdays and anniversaries." },
    ],
  },

  /* ============================== EN LEGAL ============================== */
  "en-terms": {
    intro: [
      "These terms govern your balloon flight booking with Hot Air Balloon Experience Agadir. In plain language: booking happens on WhatsApp, payment happens after the flight, and weather cancellations are always free.",
    ],
    blocks: [
      { t: "h2", text: "1. Booking and confirmation" },
      { t: "p", text: "A booking is confirmed when we send you a WhatsApp confirmation naming the flight, the date, the pickup time and the number of passengers. Verbal agreements are not bookings. Please check the confirmation message carefully and tell us immediately of any error." },
      { t: "h2", text: "2. Prices and payment" },
      { t: "p", text: "Prices are those published on our price pages at the time of booking, per person, including everything listed as included. Payment is due after the flight, at the landing field, in cash (MAD or EUR) or by card. We take no deposit and no prepayment." },
      { t: "h2", text: "3. Weather cancellations" },
      { t: "p", text: "Ballooning depends on wind and visibility. If the pilot judges conditions unsafe, the flight is cancelled by us free of charge - you owe nothing. You may reschedule to another available morning. The pilot's decision at the launch field is final; we never fly in unsafe conditions and we do not compensate for non-flight consequences (hotels, transport, missed activities)." },
      { t: "h2", text: "4. Cancellation by the passenger" },
      { t: "p", text: "You may cancel free of charge up to 24 hours before pickup by WhatsApp. Cancellations within 24 hours of pickup and no-shows at pickup are invoiced at 50% of the flight price per person. Date changes are free subject to availability." },
      { t: "h2", text: "5. Passenger responsibilities" },
      { t: "ul", items: [
        "Be at the pickup point at the confirmed time (late arrival may shorten or cancel the flight)",
        "Follow all pilot and crew instructions before, during and after the flight",
        "Declare pregnancy, recent surgery or relevant medical conditions before boarding",
        "Do not board under the influence of alcohol or drugs - the pilot may refuse boarding without refund",
        "Children under 5, and pets, cannot fly",
      ] },
      { t: "h2", text: "6. Liability and insurance" },
      { t: "p", text: "Every flight is covered by full passenger liability insurance meeting Moroccan aviation requirements. Our liability is limited to the services sold; personal belongings remain your responsibility. Nothing in these terms limits liability where doing so would be unlawful." },
      { t: "h2", text: "7. Photos and privacy" },
      { t: "p", text: "We may photograph flights for our own communication; tell your pilot if you prefer not to appear. Our data practices are described in the [privacy policy](/en/privacy/). Questions about these terms: message us on WhatsApp via [the booking page](/en/book/)." },
    ],
    faqs: [],
  },
  "en-privacy": {
    intro: [
      "This policy explains what personal data we collect, why, and how little of it there is. Short version: we collect what WhatsApp and a flight manifest legally require, we use one anonymised analytics tool if you consent to it, and we never sell or share your data.",
    ],
    blocks: [
      { t: "h2", text: "1. What we collect" },
      { t: "ul", items: [
        "WhatsApp conversations: your name, dates, hotel and passenger details you choose to send us (WhatsApp's own privacy policy applies to that platform)",
        "Flight manifest data required by aviation rules: name, age, nationality, weight category",
        "Contact details you give us for vouchers or group bookings",
        "Anonymous website statistics (Google Analytics 4, IP-anonymised) only if you accept cookies",
      ] },
      { t: "h2", text: "2. What we do with it" },
      { t: "p", text: "Manifest data is used for flight safety and Civil Aviation compliance, then retained as required by law. Conversations are used to organise your flight and, if you ask us to, to send you a reminder next season. Analytics data is aggregated and never used to identify individuals. We do not sell, rent or share your data with anyone except where aviation law requires it." },
      { t: "h2", text: "3. Your rights" },
      { t: "p", text: "You may ask what we hold about you, ask us to correct or delete it, and withdraw analytics consent at any time by clearing your browser storage. Write to us by WhatsApp or email via [the booking page](/en/book/) and we answer within 72 hours." },
      { t: "h2", text: "4. Cookies" },
      { t: "p", text: "This site loads no third-party scripts until you accept the cookie banner. If you decline, nothing is tracked. If you accept, Google Analytics 4 runs with IP anonymisation. Booking always happens on WhatsApp, which does not require any cookie on this site." },
    ],
    faqs: [],
  },

  /* ============================== EN BLOG HUB ============================== */
  "en-blog": {
    intro: [
      "Everything we know about hot air ballooning in Morocco, written by the pilots who fly every morning: safety explained properly, the best months for your flight, what to wear, what it costs and how the whole thing works. No fluff - just the answers you need before you book.",
      "Every guide below links to the flights it describes, and every question we could not fit here is answered in [our FAQ](/en/faq/). When you are ready, [book your flight on WhatsApp](/en/book/) - or start from [the homepage](/en/) to compare flights and prices.",
    ],
    blocks: [],
    faqs: [],
  },
};
