import type { LangContent } from "@/lib/types";

/**
 * Deutscher Inhalt – Kernseiten (Startseite, Agadir, Preise, FAQ, Buchung).
 * Formales "Sie", warmer Expertenton, korrekte deutsche Orthographie (ä ö ü ß).
 * Interne Links entsprechen exakt der linksOut-Liste aus data/pages.json;
 * Preise stehen als Tokens {{PRICE_*}} und werden beim Rendern ersetzt.
 */
export const content: LangContent = {

  /* Startseite: Fokus "Heißluftballonfahrt Marrakesch"; verlinkt nach Agadir, Preise, FAQ und Buchung */
  /* ============================== DE STARTSEITE ============================== */
  "de-home": {
    intro: [
      "Erleben Sie Marrakesch von seiner schönsten Seite – mit einer Heißluftballonfahrt Marrakesch bei Sonnenaufgang: Sie schweben eine volle Stunde über dem Palmenhain, der Steinwüste Agafay und den Ausläufern des schneebedeckten Atlasgebirges, mit lizenzierten marokkanischen Piloten, Hotelabholung, traditionellem berberischem Frühstück und Ihrem persönlichen Flugzertifikat – alles inklusive.",
      "Seit unserem ersten Flug haben wir mehr als 12.000 Gäste mit der Ballonfahrt Marrakesch begeistert – Paare, Familien, Fotografen und Frischverlobte. Die Buchung dauert eine einzige WhatsApp-Nachricht: Sie wählen Ihren Morgen, wir bestätigen das Wetter, und Sie zahlen erst nach der Landung. Auf dieser Seite zeigen wir Ihnen, was Sie vom Korb aus sehen, welche Flugarten es gibt und wie Sie Ihren Platz sicher buchen.",
    ],
    blocks: [
      { t: "h2", text: "Warum eine Ballonfahrt bei Sonnenaufgang das Beste ist, was Sie in Marrakesch unternehmen können" },
      { t: "p", text: "Marrakesch ist eine Stadt, die man fühlt, bevor man sie sieht: der Ruf des Muezzin, der Duft der Orangenblüten, das Gedränge der Souks. Aus dem Heißluftballon verwandelt sich Marrakesch in etwas völlig anderes – ein rosafarbenes Labyrinth aus Terrassen und Minaretten, ein grüner Teppich aus Palmen und dahinter die ockerfarbenen Hügel der Haouz-Ebene. Gegen 07:00 Uhr ist das Licht über dem Atlas so weich, wie Sie es im ganzen Urlaub nirgendwo sonst fotografieren werden." },
      { t: "p", text: "Ballonfahren ist außerdem die ruhigste Art, Marokko zu entdecken. Es gibt keinen Motor, keine Straße und keine Warteschlange – nur den Wind. Ihr Pilot nutzt verschiedene Luftströme, um den Ballon über Palmenhaine und Wüstenplateaus zu steuern, und landet sanft auf einem Feld, wo Frühstückszelt und Bergungsfahrzeug bereits auf Sie warten." },
      { t: "img", key: "hero", alt: "Heißluftballon Marrakesch fliegt bei Sonnenaufgang über den Palmenhain, im Hintergrund das Atlasgebirge" },
      { t: "p", text: "Warum gerade so früh? Ballons fliegen dort, wo die Luft noch ruhig ist: Kurz vor dem Sonnenaufgang ist der Wind schwach, die Thermik des aufheizenden Bodens existiert noch nicht, und die Sichtweite ist am weitesten. Aus demselben Grund startet kein seriöser Anbieter am Nachmittag – wir nehmen Ihnen den allerfrühesten Wecker ab, weil genau diese Stunde die sicherste und zugleich schönste des Tages ist. Danach haben Sie den ganzen Rest des Tages frei für Medina, Gärten oder Ausflüge." },
      { t: "h2", text: "Was Sie vom Korb aus sehen" },
      { t: "p", text: "Zwischen 200 und 800 Metern Höhe öffnet sich ein Panorama, das keine Dachterrasse der Medina bieten kann. Ihr Pilot steuert den Heißluftballon sanft höher und tiefer, sodass Sie beide Perspektiven erleben – den weiten Blick zum Atlas und den nahen Blick auf Dörfer und Felder. Typische Momente Ihres Morgens:" },
      { t: "ul", items: [
        "der Palmenhain von Marrakesch, ein endloses grünes Band rund um die Stadt",
        "die Steinwüste Agafay mit ihren ockerfarbenen Hügeln und ausgetrockneten Flussbetten",
        "das Atlasgebirge mit schneebedeckten Gipfeln – von November bis April besonders klar sichtbar",
        "die Haouz-Ebene mit Dörfern, Feldern, Eseln und Schafherden aus der Vogelperspektive",
        "die roten Mauern der Medina mit dem Minarett der Koutoubia-Moschee",
      ] },
      { t: "p", text: "Und dann ist da noch der Brenner: Er zischt nur alle paar Minuten, sonst hören Sie nichts als den Wind und gelegentlich eine Glocke von unten. Viele Gäste erzählen uns, dass genau diese Stille der schönste Unterschied zu jedem anderen Ausflug war." },
      { t: "p", text: "Nehmen Sie Ihre Kamera mit: Der Morgen liefert die Motive Ihrer Reise. In der langen, goldenen Stunde erscheinen die Palmenhaine fast schwarz vor dem rosafarbenen Himmel, ein dünner Dunstschleier liegt über der Haouz-Ebene, und die ersten Sonnenstrahlen fassen die Gipfel des Atlas in Rosa. Fotografen sagen uns regelmäßig, dass sie in dieser einen Stunde mehr verwertbare Bilder machen als im restlichen Urlaub zusammen." },
      { t: "h2", text: "Die Flugarten im Überblick: Welche Ballonfahrt passt zu Ihnen?" },
      { t: "p", text: "Jede Ballonfahrt bei Sonnenaufgang folgt demselben bewährten Ablauf – Abholung, Aufrichten des Ballons, eine Stunde Flug, Frühstück, Zertifikat. Der Unterschied liegt im Korb, in der Gruppengröße und im Rahmenprogramm:" },
      { t: "ul", items: [
        "Classic-Sonnenaufgangsflug: der beliebte Einstieg ab {{PRICE_CLASSIC}} pro Person, geteilter Korb mit maximal 16 Gästen – jeder Platz direkt am Korbrand",
        "Privater Ballonflug: der Korb gehört nur Ihnen, für 2 bis 8 Personen ab {{PRICE_PRIVATE}} – ideal für Paare und Heiratsanträge",
        "VIP-Flug: kleiner Korb mit maximal 8 Gästen, mehr Platz und persönlicher Betreuung, ab {{PRICE_VIP}}",
        "Ballon & Kamel: die Ballonfahrt kombiniert mit einem Kamelritt am Morgen, ab {{PRICE_CAMEL}}",
        "Agafay-Flug: Start am Rand der Steinwüste mit Frühstück im Wüstencamp, ab {{PRICE_AGAFAY}}",
        "Heißluftballon Agadir: die [Ballonfahrt über das grüne Souss-Tal](/de/heissluftballon-agadir/) ab {{PRICE_AGADIR}}, wenn Sie an der Küste wohnen",
      ] },
      { t: "p", text: "Kinder von 5 bis 11 Jahren zahlen auf dem Classic-Flug die ermäßigte Rate von {{PRICE_CLASSIC_CHILD}}; ab 12 Jahren gilt der Erwachsenenpreis. Alle Preise im Detail, alle Leistungen und die Zahlungsarten finden Sie auf unserer Seite [Heißluftballon Marrakesch: Alle Preise im Überblick](/de/heissluftballon-marrakesch-preis/)." },
      { t: "p", text: "Welche Flugart ist die richtige für Sie? Für den ersten Ballonflug empfehlen wir den Classic-Flug: Sie erleben denselben Himmel und dieselbe Stunde, zahlen aber nur für den geteilten Korb. Der private Korb lohnt sich für Paare, die einen Heiratsantrag planen, oder für Familien, die den Morgen ausschließlich für sich möchten. Der VIP-Flug ist die Mischung aus beidem: eine kleine, ruhige Gruppe, mehr Platz am Korbrand und eine persönlichere Betreuung durch Pilot und Crew." },
      { t: "h2", text: "So läuft Ihr Ballonmorgen ab – vom Wecker bis zum Frühstück" },
      { t: "p", text: "Der gesamte Morgen ist für Sie organisiert, vom Weckruf bis zur Rückkehr ans Hotel:" },
      { t: "ul", items: [
        "04:45 bis 05:15 – Abholung an Ihrem Hotel in Marrakesch im klimatisierten Minibus",
        "06:00 – Aufrichten des Ballons und Sicherheitsbriefing am Startfeld in der Palmeraie",
        "06:30 – Start bei Sonnenaufgang, eine volle Stunde in der Luft zwischen 200 und 800 Metern",
        "07:30 – sanfte Landung, traditioneller Piloten-Toast und Ihr persönliches Flugzertifikat",
        "08:00 – berberisches Frühstück mit Msemen, Amlou, Oliven, Datteln und Minztee unter dem Zelt",
        "10:00 bis 10:30 – zurück an Ihrem Hotel, rechtzeitig zum Frühstück am Pool oder zum ersten Ausflug",
      ] },
      { t: "p", text: "Planen Sie insgesamt etwa fünf Stunden ein. Der Flug selbst dauert eine volle Stunde – länger als bei den meisten Anbietern, und unsere Gäste merken den Unterschied." },
      { t: "p", text: "Ein Wort zum Frühstück: Es wird von denselben Familien frisch zubereitet wie am ersten Tag unserer Flughistorie – warme Msemen, Amlou aus Argannüssen, Oliven, Datteln und unendlich viel Minztee. Beim Frühstück signiert Ihr Pilot die Flugzertifikate, und die Crew beantwortet gern alle Fragen, die Ihnen in der Luft eingefallen sind." },
      { t: "h2", text: "Sicherheit, Wetter und Buchung: Ihre wichtigsten Fragen" },
      { t: "p", text: "Sicherheit kommt bei jeder Heißluftballonfahrt zuerst: Unsere Piloten sind von der Marokkanischen Luftfahrtbehörde lizenziert, jeder Ballon ist voll versichert, und wir starten nur bei ruhigem Wind und klarer Sicht. Wenn die Bedingungen nicht passen, sagen wir ab – ohne Kosten für Sie. Die ausführlichen Antworten zu Lizenzen, Versicherung, Kinder- und Gesundheitsfragen finden Sie auf unserer [FAQ-Seite](/de/faq/)." },
      { t: "p", text: "Die Buchung selbst ist bewusst einfach: Eine Nachricht auf WhatsApp genügt, Sie erhalten die Bestätigung mit Abholzeit noch am selben Tag, und bezahlt wird erst nach dem Flug – bar in MAD oder EUR oder mit Karte. Keine Anzahlung, kein Online-Formular. Bereit? Dann [buchen Sie Ihre Ballonfahrt hier](/de/buchen/) – oder schreiben Sie uns zuerst Ihre Fragen; wir antworten meist innerhalb von zehn Minuten." },
      { t: "p", text: "Kurz zusammengefasst: Abholung zwischen 04:45 und 05:15 Uhr, eine volle Stunde Flug zwischen 200 und 800 Metern, Mindestalter 5 Jahre, höchstens 16 Gäste im geteilten Korb, lizenzierte Piloten der Marokkanischen Luftfahrtbehörde, voll versicherte Flüge, Zahlung erst nach der Landung und kostenlose Absage bei Wind oder Nebel. Diese Punkte gelten für jede Flugart auf dieser Seite – alle weiteren Antworten sammeln wir auf unserer [FAQ-Seite](/de/faq/)." },
    ],
    gallery: [
      { key: "hero", alt: "Heißluftballon über dem Palmenhain von Marrakesch bei Sonnenaufgang mit dem Atlasgebirge im Hintergrund", caption: "Sonnenaufgang über der Palmeraie – unser meistfotografiertes Motiv" },
      { key: "inflation", alt: "Aufrichten des Heißluftballons vor der Ballonfahrt in Marrakesch", caption: "Der Aufblas-Moment: Der Brenner füllt die Hülle in der kalten Morgenluft" },
      { key: "passengers", alt: "Gäste im Korb eines Heißluftballons über Marrakesch", caption: "Höchstens 16 Gäste im geteilten Korb – jeder Platz direkt an der Kante" },
      { key: "agafay", alt: "Heißluftballon über der Steinwüste Agafay in der Nähe von Marrakesch", caption: "Die Steinwüste Agafay: eine Mondlandschaft vor den Toren der Stadt" },
      { key: "breakfast", alt: "Berberisches Frühstück mit Msemen und Minztee nach der Ballonfahrt in Marrakesch", caption: "Msemen, Amlou und Minztee nach der Landung" },
      { key: "certificate", alt: "Persönliches Flugzertifikat nach der Heißluftballonfahrt in Marrakesch", caption: "Ihr Flugzertifikat, signiert von Ihrem Piloten" },
    ],
    reviewIdx: [0, 1, 2],
    faqs: [
      { q: "Was kostet eine Heißluftballonfahrt in Marrakesch?", a: "Der Classic-Sonnenaufgangsflug kostet ab {{PRICE_CLASSIC}} pro Erwachsenem und {{PRICE_CLASSIC_CHILD}} für Kinder von 5 bis 11 Jahren – inklusive Hotelabholung, einer vollen Stunde Flug, berberischem Frühstück und Flugzertifikat. Private und VIP-Körbe sowie die Kombinationsflüge sind auf unserer Preisseite gelistet." },
      { q: "Wie lange dauert der Flug wirklich?", a: "Eine volle Stunde in der Luft, zwischen 200 und 800 Metern Höhe, je nach Wind und Pilotenentscheidung. Dazu kommen Abholung, Aufrichten des Ballons und Frühstück; rechnen Sie für den ganzen Morgen mit etwa fünf Stunden." },
      { q: "Wann werden wir abgeholt?", a: "Zwischen 04:45 und 05:15 Uhr, je nach Hotel und Jahreszeit, denn der Sonnenaufgang wandert durchs Jahr. Die genaue Abholzeit bestätigen wir Ihnen am Vorabend per WhatsApp." },
      { q: "Ab welchem Alter dürfen Kinder mitfliegen?", a: "Ab 5 Jahren, in Begleitung eines Erwachsenen. Der Flug ist ruhig, die Korbränder sind hoch, und Kinder lieben es, Esel und Schafherden von oben zu entdecken. Kinder unter 5 Jahren können aus Sicherheitsgründen nicht mitfliegen." },
      { q: "Was passiert, wenn das Wetter schlecht ist?", a: "Wir sagen kostenlos ab. Ballons brauchen ruhigen Wind und ausreichende Sicht; unsere Piloten prüfen die Prognosen zweimal täglich. Sie buchen auf einen anderen Morgen Ihrer Reise um – oder es bleibt ganz ohne Kosten, denn Sie zahlen ohnehin erst nach dem Flug." },
      { q: "Muss ich im Voraus bezahlen?", a: "Nein. Gebucht wird per WhatsApp, bezahlt wird nach der Landung am Landefeld – bar in MAD oder EUR oder mit Karte. Es gibt keine Anzahlung und keine Online-Zahlung." },
      { q: "Wie viele Gäste fliegen in einem Korb?", a: "Gemeinsame Körbe nehmen höchstens 16 Gäste mit, VIP-Körbe höchstens 8, und im privaten Korb fliegen nur die 2 bis 8 Personen Ihrer eigenen Gruppe. Jeder Platz steht direkt am Korbrand." },
      { q: "Wie weit im Voraus sollte ich buchen?", a: "Für den Classic-Flug genügen meist 2 bis 3 Tage; private und VIP-Körbe sowie die beliebten Wochenenden im April und Oktober sind schneller ausgebucht. Schreiben Sie uns Ihre Reisedaten – wir bestätigen innerhalb weniger Minuten." },
    ],
  },

  /* Stadtseite Agadir: Fokus "Heißluftballon Agadir"; Souss-Tal, Ablauf, Vergleich mit Marrakesch, Buchung */
  /* ============================== DE AGADIR (STADTSEITE) ============================== */
  "de-agadir": {
    intro: [
      "Vergessen Sie die vierstündige Fahrt nach Marrakesch: Die Ballonfahrt mit dem Heißluftballon Agadir startet bei Sonnenaufgang über das Souss-Tal – ein grünes Mosaik aus Arganwäldern, Orangenhainen und winzigen Dörfern, während der Atlantik am Horizont glitzert.",
      "Wir holen Sie vor Tagesanbruch von Ihrem Hotel in Agadir, Taghazout oder Tamraght ab, fliegen mit einem lizenzierten marokkanischen Piloten eine volle Stunde, landen sanft im Tal und beenden den Morgen mit einem berberischen Frühstück und Ihrem persönlichen Flugzertifikat – fertig, bevor Ihr Strandtag überhaupt beginnt. Der Ablauf ist seit unserem ersten Agadir-Morgen derselbe: Start im Souss-Tal, eine Stunde über Arganwäldern und Orangenhainen, Frühstück unter dem Zelt.",
    ],
    blocks: [
      { t: "h2", text: "Was Sie über dem Souss-Tal sehen" },
      { t: "p", text: "Das Souss ist der Obstgarten Marokkos. Aus dem Korb schweben Sie über Arganbäume – die knorrigen Bäume, auf denen Ziegen stehen und aus deren Kernen Arganöl gepresst wird –, über Zitrusplantagen, Weizenfelder und weiß getünchte Gehöfte. An klaren Morgen schimmert der Atlantik im Westen, und der Anti-Atlas zeichnet die südliche Horizontlinie. Es ist eine grünere, sanftere Ballonfahrt als die Wüstenrouten rund um Marrakesch, und das Licht über dem Wasser um 07:00 Uhr ist unvergesslich." },
      { t: "p", text: "Wie überall in Marokko ist das Ballonfahren hier ruhig: kein Motor, kein Wind im Gesicht – nur das gelegentliche Zischen des Brenners und Ihr Pilot, der Dörfer, die große Moschee von Agadir und den Surfpunkt von Taghazout in der Ferne zeigt." },
      { t: "p", text: "Der Morgen im Souss hat seinen eigenen Rhythmus: Eselkarren rollen auf Staubwegen zur ersten Wiese, Rauch steigt aus den ersten Backöfen der Dörfer, und in der Erntezeit von Dezember bis März duften die Orangenhaine bis in den Korb. Von oben sehen Sie außerdem, wie weit der Arganwald wirklich reicht – ein zusammenhängendes grünes Band über die ganze Region, als UNESCO-Biosphärenreservat streng geschützt." },
      { t: "img", key: "agadir", alt: "Heißluftballon Agadir über dem Souss-Tal mit Arganwäldern bei Sonnenaufgang" },
      { t: "p", text: "Wann lohnt sich der Flug in Agadir am meisten? Von Oktober bis April ist die Luft besonders klar, der Atlantik glitzert in der Frühe, und der Küstennebel verzieht sich meist schon vor der Abholung. Auch im Sommer fliegen wir an jedem Morgen; dann starten wir etwas früher und landen, bevor der Boden sich aufheizt und die Thermik stärker wird." },
      { t: "h2", text: "So läuft Ihr Ballonmorgen in Agadir ab" },
      { t: "ul", items: [
        "05:15 – Abholung an Ihrem Hotel in Agadir, Taghazout oder Tamraght (inklusive, klimatisierter Minibus)",
        "06:00 – Aufrichten des Ballons und Sicherheitsbriefing am Startfeld im Souss-Tal",
        "06:30 – Start bei Sonnenaufgang, eine volle Stunde in der Luft zwischen 200 und 800 Metern",
        "07:30 – sanfte Landung, traditioneller Piloten-Toast und Ihr persönliches Flugzertifikat",
        "08:00 – berberisches Frühstück mit Msemen, Amlou, Oliven, Datteln und Minztee",
        "10:00 – zurück an Ihrem Hotel, rechtzeitig zum Frühstück am Pool oder zur ersten Surfsession",
      ] },
      { t: "p", text: "Vom Startfeld bis zum Strand sind es rund 25 Minuten – wir starten bewusst im Landesinneren, damit der Heißluftballon weit weg von den Flugrouten des Flughafens steigt und offene Felder für eine sichere Landung zur Verfügung stehen." },
      { t: "p", text: "Die Agadir-Route passt besonders gut zu Familien, Surfern und Reisenden, die keinen ganzen Tag opfern möchten: Sie sind zur Mittagszeit wieder am Meer, und der Rest des Tages bleibt frei für Strand, Souk oder einen Ausflug in den Nationalpark Souss-Massa. Kinder ab 5 Jahren fliegen zum Kindertarif, und die Abholung erfolgt direkt an Ihrem Hotel oder Surfcamp." },
      { t: "h2", text: "Agadir oder Marrakesch – welche Ballonfahrt passt zu Ihnen?" },
      { t: "p", text: "Beide Flüge kosten dasselbe ({{PRICE_AGADIR}}), dauern dieselbe Stunde und enthalten dasselbe Paket – der Unterschied ist die Landschaft. Marrakesch bietet Palmen, Wüstenplateau und große Berge; Agadir bietet das grüne Souss-Tal und das Meer. Wenn Ihre Reise beide Städte umfasst, fliegen Sie einfach zweimal: Gäste, die das tun, erzählen uns oft, dass sich die zwei Morgen wie zwei verschiedene Länder angefühlt haben. Alle Flugarten im Vergleich sehen Sie auf [unserer Startseite](/de/), alle aktuellen Preise auf [unserer Preisseite](/de/heissluftballon-marrakesch-preis/)." },
      { t: "p", text: "Praktisch spielt es übrigens keine Rolle, für welche Stadt Sie sich entscheiden: dieselben lizenzierten Piloten, dieselbe Versicherung, dieselbe Abholverlässlichkeit am Morgen. Der einzige echte Unterschied liegt unter Ihrem Korb – Palmenhain und Steinwüste auf der einen Seite, Arganwald und Atlantik auf der anderen. Beide Routen fliegen wir an jedem Morgen des Jahres." },
      { t: "h2", text: "Sicherheit, Wetter und Buchung Ihrer Ballonfahrt in Agadir" },
      { t: "p", text: "Ihr Pilot ist von der Marokkanischen Luftfahrtbehörde lizenziert, und jeder Ballon ist mit voller Passagier-Haftpflichtversicherung unterwegs. Wir fliegen das ganze Jahr; die verlässlichsten Bedingungen herrschen von Oktober bis April. Küstennebel ist der häufigste Grund für eine Absage: Wir prüfen die Prognosen zweimal täglich und bestätigen Ihren Flug am Vorabend – wenn das Wetter nicht mitspielt, sagen wir kostenlos ab oder buchen Sie auf einen anderen Morgen um." },
      { t: "p", text: "Zur Buchung brauchen wir nur drei Angaben: Ihr Wunschdatum (gerne mit einem Ersatztermin), die Anzahl der Gäste und Ihr Hotel in Agadir, Taghazout oder Tamraght. Die Bestätigung mit Abholzeit erhalten Sie noch am selben Tag; bezahlt wird nach der Landung am Landefeld. Auch kurzfristige Anfragen für den nächsten Morgen sind oft möglich – eine WhatsApp-Nachricht lohnt sich immer." },
      { t: "p", text: "Häufige Fragen zu Abholzeiten, Kindern und Schwangerschaft beantworten wir auf unserer [FAQ-Seite](/de/faq/), und die Buchung selbst dauert eine einzige WhatsApp-Nachricht: [Hier buchen Sie Ihre Ballonfahrt in Agadir](/de/buchen/) – Zahlung erst nach dem Flug." },
    ],
    gallery: [
      { key: "agadir", alt: "Heißluftballon Agadir über dem Souss-Tal bei Sonnenaufgang", caption: "Sonnenaufgang über dem Souss-Tal – Arganwälder soweit das Auge reicht" },
      { key: "inflation", alt: "Aufrichten des Heißluftballons vor der Ballonfahrt in Agadir", caption: "Der Brenner füllt die Hülle, während das Tal noch schläft" },
      { key: "passengers", alt: "Gäste im Korb des Heißluftballons über dem Souss-Tal bei Agadir", caption: "Kleine Gruppen, jeder Platz direkt am Korbrand" },
      { key: "breakfast", alt: "Berberisches Frühstück nach der Ballonfahrt in Agadir", caption: "Msemen, Amlou und Minztee nach der Landung" },
    ],
    reviewIdx: [4, 0, 3],
    faqs: [
      { q: "Was kostet ein Heißluftballon in Agadir?", a: "Ab {{PRICE_AGADIR}} pro Erwachsenem; Kinder von 5 bis 11 Jahren zahlen {{PRICE_CLASSIC_CHILD}} – derselbe Preis wie in Marrakesch, inklusive Abholung in Agadir oder Taghazout, der einstündigen Ballonfahrt, berberischem Frühstück und Flugzertifikat." },
      { q: "Holen Sie mich auch in Taghazout und Tamraght ab?", a: "Ja, Abholung und Rückfahrt sind aus Agadir-Stadt, Taghazout und Tamraght (Hotels und Surfcamps) inbegriffen. Ihre genaue Abholzeit bestätigen wir am Vorabend per WhatsApp." },
      { q: "Wo startet der Ballon?", a: "Im Souss-Tal, rund 25 Minuten im Landesinneren von Agadir – weit weg von den Flugrouten des Flughafens, mit offenen Feldern für eine sichere Landung. Die genaue Startstelle legt Ihr Pilot am Morgen selbst fest; sie hängt allein von der Windrichtung ab." },
      { q: "Kann ich in Agadir und Marrakesch auf derselben Reise fliegen?", a: "Ja, und viele Gäste tun genau das. Buchen Sie beide Flüge per WhatsApp mit Ihren Reisedaten – wir legen sie auf verschiedene Morgen, denn die Landschaften sind völlig unterschiedlich." },
      { q: "Was passiert, wenn das Wetter meinen Flug in Agadir absagt?", a: "Sie zahlen nichts. Küstennebel ist der häufigste Grund; wir prüfen die Prognosen zweimal täglich, bestätigen am Vorabend, und Sie buchen auf einen anderen Morgen Ihrer Reise um oder sagen kostenlos ab. Buchen Sie also ruhig früh: Das Risiko bei Wind und Nebel trägt immer die Crew, niemals Sie." },
      { q: "Ist es sicher, in der Nähe des Ozeans zu fliegen?", a: "Wir starten 25 Kilometer im Landesinneren; der Flug findet komplett über den Feldern des Souss-Tals statt – der Ozean ist Aussicht, niemals Gefahr. Die Sicherheitsregeln sind dieselben wie in Marrakesch: lizenzierte Piloten, versicherte Flüge, strenge Windgrenzen." },
      { q: "Wie weit im Voraus sollte ich buchen?", a: "Agadir ist ruhiger als Marrakesch: Meist genügen 2 bis 3 Tage Vorlauf; an den beliebten Wochenenden im April und Oktober schneller. Schreiben Sie uns Ihre Reisedaten – wir bestätigen innerhalb weniger Minuten. In den beliebten Wochen im April und Oktober raten wir, den Wunschtermin gleich bei der Ankunft in Agadir festzumachen." },
    ],
  },

  /* Preisseite: alle Flugarten mit Preis-Tokens, Leistungen, Zahlung erst nach dem Flug */
  /* ============================== DE PREISE ============================== */
  "de-prices": {
    intro: [
      "Was kostet eine Heißluftballonfahrt in Marrakesch? Hier finden Sie unsere komplette, transparente Preisliste für {{YEAR}} – jede Flugart, jede inkludierte Leistung, keine versteckten Kosten und keine Zuschläge an Feiertagen. Sie zahlen erst nach dem Flug, nie online, und wenn das Wetter Ihren Morgen absagt, kostet Sie das gar nichts.",
      "Unten stehen die genauen Preise für die Classic-, Privat-, VIP-, Ballon-&-Kamel- und Agafay-Fahrten sowie für den Heißluftballon Agadir, dazu, was den Preis beeinflusst, was immer enthalten ist und wie Kinder zählen. Alle Preise gelten pro Person; alles bestätigen wir Ihnen in einer einzigen WhatsApp-Nachricht, bevor Sie sich irgendwo festlegen – so können Sie in Ruhe vergleichen.",
    ],
    blocks: [
      { t: "h2", text: "Was in jedem Preis immer enthalten ist" },
      { t: "ul", items: [
        "Hotelabholung und Rücktransfer (Marrakesch, Agadir, Taghazout – je nach Ihrer gebuchten Flugart)",
        "eine volle Stunde in der Luft mit lizenziertem Piloten – kein 20-Minuten-Kurzflug, sondern der komplette Ballonmorgen",
        "das traditionelle berberische Frühstück nach der Landung, frisch zubereitet von den Familien am Feld",
        "Ihr persönliches, vom Piloten signiertes Flugzertifikat",
        "vollständige Passagier-Versicherung und Trinkwasser an Bord",
        "die Aufblas-Show vor dem Start – zusehen, fotografieren und beim Mithelfen ausdrücklich erwünscht",
      ] },
      { t: "p", text: "Nichts auf dieser Liste ist optional oder mit Zuschlag verbunden: Kein Gast zahlt extra für die Abholung, das Frühstück, das Zertifikat oder die Versicherung. Wenn ein anderer Anbieter für solche Positionen Aufpreise verlangt, rechnen Sie bitte die Endsumme – unsere beginnt beim eigentlichen Flugpreis und ändert sich danach nicht mehr." },
      { t: "p", text: "Nicht im Preis enthalten – und ehrlich gesagt auch nicht nötig: Trinkgelder (freiwillig), professionelle Fotos vom Flug (optional, direkt vor Ort buchbar) und persönliche Ausgaben. Alles, was Sie für einen vollständigen Ballonmorgen brauchen, steht bereits auf der Liste oben." },
      { t: "h2", text: "Was den Preis einer Ballonfahrt verändert" },
      { t: "ul", items: [
        "Exklusivität des Korbs: ein privater Korb kostet pro Person mehr als ein geteilter, dafür gehört Ihnen der Morgen allein",
        "Gruppengröße: der Privatpreis pro Person sinkt mit jeder weiteren Person, von 2 bis 8 Gästen",
        "Extras: Piloten-Toast mit Sekt, professioneller Fotograf, Kamel- oder Quad-Zusatzprogramm – alles optional, nichts automatisch",
        "Saison: die Preise bleiben das ganze Jahr gleich – es gibt keinen Hochsaisonzuschlag und keine Feiertagsaufschläge",
        "Kinder: von 5 bis 11 Jahren gilt die Kinderrate; ab 12 Jahren der Erwachsenenpreis, und Kinder unter 5 können aus Sicherheitsgründen nicht mitfliegen",
      ] },
      { t: "h2", text: "Die Preise aller Flugarten im Überblick" },
      { t: "ul", items: [
        "Classic-Sonnenaufgangsflug, geteilter Korb mit maximal 16 Gästen: {{PRICE_CLASSIC}} pro Erwachsenem, {{PRICE_CLASSIC_CHILD}} für Kinder von 5 bis 11 Jahren",
        "Privater Ballonflug, der Korb nur für Ihre Gruppe von 2 bis 8 Personen: ab {{PRICE_PRIVATE}} pro Person",
        "VIP-Flug, kleiner Korb mit maximal 8 Gästen: {{PRICE_VIP}} pro Person",
        "Ballon & Kamel, die Ballonfahrt kombiniert mit einem Kamelritt: {{PRICE_CAMEL}} pro Person",
        "Agafay-Flug, Start in der Steinwüste mit Frühstück im Wüstencamp: {{PRICE_AGAFAY}} pro Person",
        "Heißluftballon Agadir über das Souss-Tal, Abholung an der Küste: {{PRICE_AGADIR}} pro Person, Kinderrate wie beim Classic-Flug",
      ] },
      { t: "p", text: "Alle Preise gelten pro Person und pro Flug in marokkanischen Dirham (MAD); Zahlung in Euro ist gegen den Tageskurs ebenfalls möglich. Es gibt keine Buchungsgebühr und keinen Aufschlag für die Zahlung mit Karte – was oben steht, ist die vollständige Rechnung." },
      { t: "p", text: "Ein Beispiel für den Gruppenrabatt im privaten Korb: Bei zwei Personen ist der Preis pro Gast am höchsten, mit jeder weiteren Person bis acht sinkt der Anteil spürbar. Für eine vierköpfige Familie wird der private Korb dadurch oft günstiger als erwartet – nennen Sie uns Ihre Personenzahl, und wir rechnen es Ihnen in der WhatsApp-Antwort vor. Auch gemischte Gruppen aus Erwachsenen und Kindern kalkulieren wir individuell – fragen Sie einfach nach." },
      { t: "p", text: "Trinkgelder sind nie erwartet und nie eingefordert – die Crew ist fest angestellt. Wenn ein Flug Ihre Reise besonders gemacht hat, freut sich die Crew natürlich über ein persönliches Dankeschön; es bleibt ganz Ihre Entscheidung." },
      { t: "h2", text: "Sonderfälle: Gruppen, Gutscheine und besondere Anlässe" },
      { t: "p", text: "Häufige Sonderfälle kurz erklärt: Für Gruppen ab 20 Personen fliegen wir zwei oder drei Ballone im Verband und stellen ein eigenes Frühstückszelt – der Preis pro Person sinkt dabei leicht. Geschenkgutscheine gelten 12 Monate für jede Flugart und werden ohne Vorkasse ausgestellt. Und für Heiratsanträge kombinieren wir gern privaten Korb, dekoriertes Zelt und Fotografen – nennen Sie uns Ihren Anlass, wir halten uns diskret im Hintergrund." },
      { t: "p", text: "Zum Vergleich: In der Türkei oder in Europa zahlen Sie für eine Ballonfahrt oft das Doppelte oder Dreifache – bei kürzeren Flugzeiten und größeren Körben. Marrakesch gehört damit zu den günstigsten Ballonzielen der Welt, und das liegt nicht an mangelnder Sicherheit, sondern an niedrigeren Betriebskosten: Ausrüstung, Lizenzen, Inspektionen und Versicherungsstandards entsprechen den europäischen, die Ballone fliegen an jedem Morgen des Jahres, und es gibt keine Zwischenplattformen, die Provision verlangen." },
      { t: "h2", text: "Wie und wann Sie zahlen" },
      { t: "p", text: "Es gibt keine Online-Zahlung und keine Anzahlung. Sie buchen per WhatsApp, wir bestätigen die Abholzeit am Vorabend, Sie fliegen – und Sie zahlen nach der Landung, bar in MAD oder EUR oder mit Karte, direkt am Landefeld. Das ist Absicht: Sagt das Wetter den Flug ab, muss niemand einer Erstattung hinterherlaufen. So bleibt es dabei: Der Preis auf dieser Seite ist der Preis, den Sie am Flugtag zahlen." },
      { t: "p", text: "Diese Regel gilt übrigens auch für Geschenkgutscheine und Firmenkunden: Auch große Gruppen zahlen erst nach dem Flug, und für Unternehmen stellen wir auf Wunsch eine ordentliche Rechnung aus. So bleiben alle Preisversprechen überprüfbar – erst fliegen, dann zahlen. Die Abrechnung erfolgt vollständig vor Ort, ohne Nachberechnung im Nachhinein." },
      { t: "h2", text: "Bereit, Ihren Ballonmorgen zu buchen?" },
      { t: "p", text: "Wählen Sie oben Ihre Flugart, schicken Sie uns Datum und Hotel über [unsere Buchungsseite](/de/buchen/), und wir bestätigen innerhalb weniger Minuten. Fragen zum Preis, die hier nicht beantwortet sind, klärt meist unsere [FAQ](/de/faq/) – oder Sie fragen einfach direkt. Alle Flugarten sehen Sie auf einen Blick auf [unserer Startseite](/de/), die Küstenvariante auf der Seite zum [Heißluftballon Agadir](/de/heissluftballon-agadir/). Wenn Sie zwischen zwei Flugarten schwanken, beschreiben wir Ihnen in der WhatsApp-Antwort ehrlich die Unterschiede – auch dann, wenn die günstigere die bessere Wahl für Sie ist. Fragen Sie auch nach freien Kapazitäten für Ihren Wunschtermin – wir prüfen sie sofort." },
    ],
    reviewIdx: [0, 1, 5],
    faqs: [
      { q: "Gibt es eine Anzahlung oder Vorauszahlung?", a: "Nein. Gebucht wird per WhatsApp, bezahlt wird nach dem Flug am Landefeld. Das schützt Sie, wenn das Wetter den Morgen absagt – es gab dann einfach nichts zu erstatten. Auch bei kurzfristigen Buchungen ändert sich daran nichts." },
      { q: "Akzeptieren Sie Kartenzahlung?", a: "Ja – Bargeld in MAD oder EUR sowie alle gängigen Karten werden nach dem Flug akzeptiert, ohne Kartengebühr. Die Quittung erhalten Sie direkt vor Ort." },
      { q: "Sind die Preise das ganze Jahr über gleich?", a: "Ja. Wir erhöhen die Preise weder an Feiertagen noch in der Hochsaison noch bei kurzfristigen Buchungen. Der Preis auf dieser Seite ist der Preis, den Sie zahlen – auch eine Buchung am Vorabend kostet denselben Betrag wie eine Buchung drei Monate vorher." },
      { q: "Zahlen Kinder den vollen Preis?", a: "Nein – Kinder von 5 bis 11 Jahren zahlen die Kinderrate ({{PRICE_CLASSIC_CHILD}} auf dem Classic-Flug), ab 12 Jahren den Erwachsenenpreis. Kinder unter 5 Jahren können aus Sicherheitsgründen nicht mitfliegen. Kinder ab 5 Jahren sind auf allen Flugarten willkommen; die genaue Kinderrate außerhalb des Classic-Flugs nennen wir Ihnen auf WhatsApp." },
      { q: "Warum ist Marrakesch günstiger als Europa?", a: "Niedrigere Betriebskosten, keine Zwischenplattformen und das Fliegen an jedem Morgen des Jahres, das die Ballons auslastet. Ausrüstung, Lizenzen und Versicherungsstandards entsprechen den europäischen; Lizenzen und Versicherungsnachweise zeigen wir Ihnen auf Wunsch vor der Buchung." },
      { q: "Was ist, wenn ich den Flug verschieben möchte?", a: "Datum, Flugart und Personenzahl ändern Sie kostenlos bis 24 Stunden vor der Abholung, nach Verfügbarkeit. Eine kurze Nachricht auf WhatsApp genügt; in der Hochsaison empfehlen wir, die Umbuchung so früh wie möglich zu melden." },
    ],
  },

  /* FAQ-Hub: thematische Gruppen, elf häufige Fragen, verlinkt zu Preisen, Startseite und Buchung */
  /* ============================== DE FAQ ============================== */
  "de-faq": {
    intro: [
      "Alle Fragen, die uns Gäste vor einer Heißluftballonfahrt in Marrakesch oder Agadir stellen – ehrlich beantwortet von den Piloten, die diese Routen jeden Morgen fliegen. Abholzeiten, Kinder, Schwangerschaft, Wetter, Zahlung, Kameras: alles hier. Und falls Sie gerade erst vergleichen: Alle Antworten gelten für jede Flugart.",
      "Falls Ihre Frage nicht dabei ist, schreiben Sie uns einfach auf WhatsApp – ein echtes Crew-Mitglied antwortet, meist innerhalb von zehn Minuten. Diese Seite wächst mit jeder Saison: Jede Frage, die uns mehr als zweimal gestellt wird, nehmen wir hier auf. Und wenn Sie bereit sind, [buchen Sie Ihre Ballonfahrt hier](/de/buchen/).",
    ],
    blocks: [
      { t: "h2", text: "Buchung und Zahlung" },
      { t: "h3", text: "Wie weit im Voraus sollte ich buchen?" },
      { t: "p", text: "Für die Classic-Ballonfahrt in Marrakesch genügen meist 2 bis 3 Tage; private und VIP-Körbe sowie die beliebten Wochenenden im April und Oktober sind schneller voll. Für den Heißluftballon Agadir genügen 1 bis 2 Tage. Auch kurzfristige Anfragen für den nächsten Morgen sind oft möglich – eine WhatsApp-Nachricht lohnt sich immer. Für Gruppen ab 10 Personen planen wir zusätzlich Zeit für die Organisation ein; nennen Sie uns die Gruppengröße gleich mit." },
      { t: "h3", text: "Muss ich im Voraus bezahlen?" },
      { t: "p", text: "Nein – bezahlt wird nach dem Flug am Landefeld, bar in MAD oder EUR oder mit Karte. Es gibt keine Anzahlung und keine Online-Zahlung; eine Wetterabsage kostet Sie deshalb nie etwas. Die komplette Preisübersicht finden Sie auf [unserer Preisseite](/de/heissluftballon-marrakesch-preis/); eine Quittung oder Rechnung für Ihr Unternehmen stellen wir auf Wunsch aus." },
      { t: "h2", text: "Der Morgen Ihrer Ballonfahrt" },
      { t: "h3", text: "Wann werden wir abgeholt?" },
      { t: "p", text: "Zwischen 04:45 und 05:15 Uhr, je nach Hotel und Jahreszeit – der Sonnenaufgang wandert durchs Jahr. Die genaue Abholzeit bestätigen wir Ihnen am Vorabend per WhatsApp, gemeinsam mit dem Namen Ihres Piloten. Mitbringen müssen Sie nur Ihre Buchungsbestätigung auf dem Handy." },
      { t: "h3", text: "Was ziehe ich an, was nehme ich mit?" },
      { t: "p", text: "Kleiden Sie sich in Schichten, denn vor der Dämmerung ist es kühl (im Winter 5 bis 10 Grad) und nach dem Start wird es angenehm warm. Geschlossene Schuhe, Sonnenbrille und der Reisepass fürs Flugmanifest gehören dazu – mehr brauchen Sie nicht. Eine leichte Jacke genügt; im Korb ist es durch die Brennerwärme wärmer, als die Uhrzeit vermuten lässt." },
      { t: "h2", text: "Sicherheit und Gesundheit" },
      { t: "h3", text: "Ist eine Ballonfahrt in Marokko sicher?" },
      { t: "p", text: "Mit einem lizenzierten Anbieter: ja. Unsere Piloten führen kommerzielle Lizenzen der Marokkanischen Luftfahrtbehörde, die Ballone werden laufend geprüft und dokumentiert, und wir sagen bei Wind oder schlechter Sicht ohne Zögern ab. Vor dem Start lernen Sie Ihren Piloten persönlich kennen – fragen Sie alles, dafür ist er da. Diese Ehrlichkeit gehört für uns dazu: Lieber ein abgesagter Morgen als ein unnötiges Risiko." },
      { t: "h3", text: "Kann ich bei Schwangerschaft oder mit gesundheitlichen Einschränkungen fliegen?" },
      { t: "p", text: "Von Flügen in der Schwangerschaft raten wir ab. Sie müssen eine Stunde stehen und über den 1,20 Meter hohen Korbrand steigen können. Nach neueren Operationen, bei ernsten Rücken- oder Herzproblemen: schreiben Sie uns zuerst – Sie erhalten eine ehrliche Antwort statt eines Verkaufsgesprächs. Melden Sie uns Besonderheiten einfach schon bei der Buchung; alles bleibt selbstverständlich diskret." },
      { t: "h3", text: "Dürfen Kinder mitfliegen?" },
      { t: "p", text: "Ab 5 Jahren, in Begleitung eines Erwachsenen. Der Flug ist ruhig, die Korbränder sind hoch, und Kinder lieben es, Esel und Schafherden von oben zu entdecken. Kinder unter 5 Jahren können aus Sicherheitsgründen nicht mitfliegen. Viele Familien wählen deshalb den privaten Korb, damit sich die Kinder ganz frei fühlen können." },
      { t: "h2", text: "Wetter und Absagen" },
      { t: "h3", text: "Was passiert bei Wind oder Nebel?" },
      { t: "p", text: "Wir sagen kostenlos ab. Ballons brauchen ruhigen Wind und ausreichende Sicht; unsere Piloten prüfen die Prognosen zweimal täglich und treffen die endgültige Entscheidung notfalls erst am Startfeld. Sie buchen auf einen anderen Morgen Ihrer Reise um – oder es bleibt völlig kostenlos, denn es gab ohnehin nichts zu zahlen. Genau deshalb gibt es bei uns keine Anzahlung: Ein Morgen, der nicht stattfindet, darf keinen Cent kosten." },
      { t: "h3", text: "Fliegen Sie das ganze Jahr über?" },
      { t: "p", text: "Ja, an jedem Morgen des Jahres, von Marrakesch und Agadir aus. Oktober bis April sind die verlässlichste und fotogenste Saison; im Sommer starten wir im Morgengrauen und landen, bevor die Hitze kommt. Welcher Monat am besten zu Ihrer Reise passt, klären wir gern individuell mit Ihnen." },
      { t: "h2", text: "Fotografie und Erinnerungen" },
      { t: "h3", text: "Bekomme ich Fotos von meinem Flug?" },
      { t: "p", text: "Ihre eigenen Bilder aus dem Korb werden meist die schönsten, weil Sie die Höhe mit eigenen Augen erlebt haben. Auf Wunsch fliegt zusätzlich ein Fotograf der Crew mit, der Korb, Ballon und Landschaft ins beste Licht setzt; Bildpakete und Preise besprechen Sie direkt bei der Buchung. Für die Wand daheim signiert Ihr Pilot anschließend Ihr Flugzertifikat." },
      { t: "h3", text: "Kann das Frühstückszelt dekoriert werden?" },
      { t: "p", text: "Ja – für Geburtstage, Jahrestage oder Heiratsanträge richten wir das Zelt mit frischen Blumen, einem Banner und Ihrer persönlichen Nachricht her. Sagen Sie uns bei der Buchung einfach, welcher Anlass gefeiert wird; die Crew hält sich beim großen Moment diskret im Hintergrund." },
      { t: "h2", text: "Noch Fragen offen?" },
      { t: "p", text: "Sehen Sie sich [alle unsere Ballonfahrten](/de/) an, vergleichen Sie die Preise auf der Preisseite, oder [schreiben Sie uns direkt auf WhatsApp](/de/buchen/) – wir beantworten lieber zehn Fragen, als dass Sie den falschen Morgen buchen." },
    ],
    faqs: [
      { q: "Darf ich eine Drohne oder eine professionelle Kamera mitbringen?", a: "Kameras und Handys: immer ja. Drohnen: nur vor dem Start und nach der Landung – niemals während des Flugs, und zusätzlich abhängig von den marokkanischen Drohnenbestimmungen, die Sie selbst einholen müssen. Bei Fragen zu den Bestimmungen senden wir Ihnen gern die aktuellen Informationen der Behörden." },
      { q: "Gibt es eine Toilette am Startfeld?", a: "Ja, einfache Sanitäranlagen am Startfeld und im Frühstückscamp. Der Flug selbst dauert eine Stunde." },
      { q: "Können Begleitpersonen mitkommen, die nicht fliegen?", a: "Ja – sie können das Aufrichten des Ballons ansehen, mit dem Bergungsfahrzeug zur Landestelle fahren und gegen eine reduzierte Bodenpauschale am Frühstück teilnehmen. Fragen Sie einfach auf WhatsApp; so bleibt der Morgen ein Erlebnis für die ganze Reisegruppe." },
      { q: "Fliegen Sie bei Regen?", a: "Leichter Regen ohne Wind kann fliegbar sein; wenn Regen die Sicht oder die Landebedingungen beeinträchtigt, sagen wir ab. Das Klima Marokkos macht Regenabsagen selten – wenige Tage im Jahr." },
      { q: "Wie viele Personen stehen im Korb?", a: "Gemeinsame Körbe fliegen mit 8 bis 16 Gästen, VIP-Körbe mit höchstens 8, und im privaten Korb sitzen nur die 2 bis 8 Personen Ihrer Gruppe. Jeder Platz steht direkt am Korbrand." },
      { q: "Welche Sprachen spricht die Crew?", a: "Arabisch, Französisch und Englisch bei jedem Flug; Spanisch, Deutsch und Niederländisch auf Voranmeldung – nennen Sie uns Ihre Sprache bei der Buchung, dann planen wir die passende Crew ein." },
      { q: "Können wir als Gruppe mit mehr als 20 Personen buchen?", a: "Ja – dafür fliegen wir zwei oder drei Ballone im Verband. Nennen Sie uns Gruppengröße und Datum, und wir erstellen Ihnen ein Gruppenangebot." },
      { q: "Kann ich im Ballon einen Heiratsantrag machen?", a: "Ja – und es ist unser Lieblingsauftrag. Wir empfehlen den privaten Korb, richten auf Wunsch das Frühstückszelt her und halten den Moment fotografisch fest. Erzählen Sie uns Ihren Plan auf WhatsApp; wir halten uns diskret im Hintergrund. Viele Anträge finden genau beim Frühstück statt – nach dem Applaus in der Luft." },
      { q: "Gibt es Geschenkgutscheine?", a: "Ja – auf WhatsApp erhalten Sie einen personalisierten Gutschein, 12 Monate gültig, für jede Flugart. Ideal für Geburtstage und Jahrestage." },
      { q: "Gibt es ein Gewichtslimit?", a: "Für den Fluglastplan fragen wir bei der Buchung nach dem Körpergewicht jedes Passagiers. Es gibt kein starres Einzellimit, aber der Pilot muss die Gesamtlast des Heißluftballons berechnen – bei sehr hohen Einzelgewichten bitten wir vorab um eine kurze Rückmeldung, damit wir den Korb richtig einteilen. Die Angaben dienen ausschließlich der sicheren Beladung und bleiben natürlich vertraulich." },
      { q: "Wie schnell erhalte ich eine Antwort auf WhatsApp?", a: "Meist innerhalb von zehn Minuten zwischen 07:00 und 21:00 Uhr (GMT+1). Nachrichten, die über Nacht kommen, beantworten wir am nächsten Morgen als Erstes; in der Hochsaison im April und Oktober kann es am Abend etwas länger dauern." },
    ],
  },

  /* Buchungsseite: Flugauswahl, Buchungsablauf in drei Schritten, WhatsApp-Sofortbuchung */
  /* ============================== DE BUCHUNG ============================== */
  "de-contact": {
    intro: [
      "Buchen Sie Ihre Heißluftballonfahrt mit einer einzigen WhatsApp-Nachricht: Nennen Sie uns Datum, Anzahl der Erwachsenen und Kinder sowie Ihr Hotel – wir bestätigen Verfügbarkeit und Abholzeit, und Sie zahlen erst nach dem Flug. Keine Online-Zahlung, keine Anzahlung, keine Stornogebühr, wenn das Wetter absagt. Das Formular auf dieser Seite öffnet WhatsApp mit einer vorausgefüllten Nachricht, sodass alle wichtigen Angaben an einem Ort landen; ein Crew-Mitglied antwortet meist innerhalb von zehn Minuten, sieben Tage die Woche.",
    ],
    blocks: [
      { t: "h2", text: "Welchen Flug buchen?" },
      { t: "ul", items: [
        "Erste Ballonfahrt oder bestes Preis-Leistungs-Verhältnis: der Classic-Sonnenaufgangsflug ab {{PRICE_CLASSIC}} – alle Flugarten sehen Sie auf [unserer Startseite](/de/)",
        "An der Küste zu Hause: die Ballonfahrt mit dem [Heißluftballon Agadir](/de/heissluftballon-agadir/) über das grüne Souss-Tal",
        "Preise vergleichen: die komplette Übersicht aller Flugarten und Kinderraten steht auf [unserer Preisseite](/de/heissluftballon-marrakesch-preis/)",
        "Paare, Feiern und Heiratsanträge: privater Korb für 2 bis 8 Personen oder VIP-Flug mit höchstens 8 Gästen – Details ebenfalls auf der Preisseite",
      ] },
      { t: "p", text: "Sind Sie unsicher, welche Flugart zu Ihrer Reise passt? Schreiben Sie uns einfach Reisedaten und Personenzahl – wir empfehlen ehrlich, auch dann, wenn die günstigste Flugart die richtige für Sie ist. Für Heiratsanträge und besondere Anlässe planen wir den Ablauf gemeinsam mit Ihnen im Detail." },
      { t: "h2", text: "So läuft die Buchung ab" },
      { t: "ul", items: [
        "Schritt 1: Nachricht auf WhatsApp mit Ihrem Datum (gerne mit einem Alternativmorgen), der Personenzahl und dem Namen Ihres Hotels",
        "Schritt 2: Wir bestätigen Verfügbarkeit und Abholzeit (zwischen 04:45 und 05:15 Uhr) noch am selben Tag, spätestens am Vorabend",
        "Schritt 3: Sie fliegen eine Stunde bei Sonnenaufgang und zahlen nach der Landung – bar in MAD oder EUR oder mit Karte",
      ] },
      { t: "p", text: "Für die Bestätigung brauchen wir keine Vorkasse, und Sie können jederzeit kostenlos umbuchen, wenn sich Ihre Reisepläne ändern. Die verbindliche Abholzeit erhalten Sie am Vorabend; sie liegt zwischen 04:45 und 05:15 Uhr, je nach Hotel und Jahreszeit." },
      { t: "h2", text: "Warum Gäste bei uns buchen" },
      { t: "ul", items: [
        "Antwort meist innerhalb von zehn Minuten, sieben Tage die Woche",
        "keine Anzahlung und keine Online-Zahlung – Sie zahlen erst nach dem Flug",
        "lizenzierte Piloten der Marokkanischen Luftfahrtbehörde und voll versicherte Ballone",
        "eine volle Stunde Flugzeit, berberisches Frühstück und Flugzertifikat inklusive",
        "kostenlose Umbuchung oder Absage, wenn das Wetter nicht mitspielt",
      ] },
      { t: "p", text: "Die meisten Buchungsfragen beantwortet unsere [FAQ](/de/faq/) bereits im Vorfeld – am schnellsten geht es ohnehin direkt: Wir sprechen Arabisch, Französisch, Englisch, Spanisch, Deutsch und Niederländisch. Schreiben Sie einfach auf Deutsch, wir antworten auf Deutsch." },
    ],
    faqs: [
      { q: "Wie schnell antworten Sie auf WhatsApp?", a: "Meist innerhalb von zehn Minuten zwischen 07:00 und 21:00 Uhr (GMT+1). Nachrichten, die über Nacht kommen, beantworten wir am nächsten Morgen als Erstes; in der Hochsaison April und Oktober lohnt sich eine frühe Anfrage besonders." },
      { q: "Welche Angaben brauchen Sie für die Buchung?", a: "Ihr Datum (gerne mit einem Alternativmorgen), die Zahl der Erwachsenen und Kinder sowie der Name Ihres Hotels oder Riads. Mehr brauchen wir nicht – den Rest organisieren wir; bei Gruppen senden wir die Aufteilung gern vorab als Übersicht." },
      { q: "Kann ich meine Buchung ändern?", a: "Ja – Datum, Flugart und Personenzahl ändern Sie kostenlos bis 24 Stunden vor der Abholung, nach Verfügbarkeit. Ein Wechsel zwischen Classic-, Privat- und VIP-Flug ist ebenfalls möglich; eine kurze Nachricht auf WhatsApp genügt." },
    ],
  },
};
