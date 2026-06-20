// ============================================
// מִקְרָא — Bible Data & Strong's Lexicon
// ============================================

// Sample Strong's Hebrew Lexicon (H1–H50 subset + key words)
const STRONGS_HEBREW = {
  "H1": {
    number: "H1",
    hebrew: "אָב",
    translit: "ʾāḇ",
    pronunciation: "awb",
    pos: "Nom. masc.",
    definition: "père, ancêtre, origine. Désigne le père naturel ou le père spirituel, l'ancêtre d'une famille ou d'une nation. Utilisé aussi pour désigner Dieu comme père.",
    etymology: "Mot primitif ; probablement apparenté à une racine signifiant « vouloir » ou « désirer ».",
    occurrences: 1191,
    related: ["H25", "H2", "H3"],
    relatedWords: ["אָבִי", "אַבְרָהָם", "אָבוֹת"],
    books: { "Genèse": 198, "Exode": 67, "Nombres": 54, "Psaumes": 12, "Proverbes": 32 }
  },
  "H2": {
    number: "H2",
    hebrew: "אַב",
    translit: "ʾab",
    pronunciation: "ab",
    pos: "Nom. masc. (araméen)",
    definition: "Père (forme araméenne). Équivalent araméen de H1 אָב.",
    etymology: "Forme araméenne du terme hébreu père.",
    occurrences: 9,
    related: ["H1"],
    relatedWords: [],
    books: { "Daniel": 7, "Esdras": 2 }
  },
  "H3": {
    number: "H3",
    hebrew: "אֵב",
    translit: "ʾēḇ",
    pronunciation: "abe",
    pos: "Nom. masc.",
    definition: "Bourgeon, fleur, verdure fraîche. Désigne la végétation dans son stade initial d'éclosion.",
    etymology: "D'une racine primitive signifiant germer, pousser.",
    occurrences: 3,
    related: ["H4", "H5"],
    relatedWords: ["אָבִיב"],
    books: { "Job": 2, "Exode": 1 }
  },
  "H120": {
    number: "H120",
    hebrew: "אָדָם",
    translit: "ʾādām",
    pronunciation: "aw-dawm'",
    pos: "Nom. masc.",
    definition: "Homme, être humain, Adam. Désigne l'humanité en général ou un individu. Utilisé comme nom propre pour le premier homme Adam. Peut faire allusion à la couleur rouge de la terre (H127 אֲדָמָה) d'où l'humanité fut formée.",
    etymology: "De H119 (אָדַם, être rouge) ; peut-être en lien avec H127 (אֲדָמָה, terre, sol rouge).",
    occurrences: 562,
    related: ["H119", "H127", "H128"],
    relatedWords: ["אֲדָמָה", "אָדֹם", "אֱדוֹם"],
    books: { "Genèse": 38, "Job": 49, "Psaumes": 62, "Ézéchiel": 87 }
  },
  "H127": {
    number: "H127",
    hebrew: "אֲדָמָה",
    translit: "ʾădāmāh",
    pronunciation: "ad-aw-maw'",
    pos: "Nom. fém.",
    definition: "Sol, terre, terre cultivable. Désigne le sol comme matière, la terre agricole ou le pays d'une nation. Intimement lié à H120 (אָדָם, homme) : l'homme est formé de la poussière de l'adamah.",
    etymology: "Féminin de H119 (être rouge), se référant à la couleur rouge-brun du sol fertile.",
    occurrences: 225,
    related: ["H120", "H776"],
    relatedWords: ["אָדָם", "אֶרֶץ"],
    books: { "Genèse": 46, "Deutéronome": 23, "Jérémie": 20, "Ézéchiel": 28 }
  },
  "H430": {
    number: "H430",
    hebrew: "אֱלֹהִים",
    translit: "ʾĕlōhîm",
    pronunciation: "el-o-heem'",
    pos: "Nom. masc. plur.",
    definition: "Dieu, dieux, magistrats. La forme plurielle la plus commune pour Dieu dans l'Ancien Testament. Bien que grammaticalement pluriel, elle est souvent utilisée avec des verbes singuliers quand elle désigne le Dieu d'Israël (pluriel de majesté). Peut désigner d'autres divinités ou des êtres surnaturels.",
    etymology: "Pluriel de H433 (אֱלוֹהַּ) ; d'une racine signifiant puissance, force.",
    occurrences: 2606,
    related: ["H410", "H433", "H3068"],
    relatedWords: ["אֵל", "אֱלוֹהַּ", "יְהוָה", "שַׁדַּי"],
    books: { "Genèse": 231, "Psaumes": 365, "Deutéronome": 134, "Ésaïe": 67, "Job": 56 }
  },
  "H776": {
    number: "H776",
    hebrew: "אֶרֶץ",
    translit: "ʾereṣ",
    pronunciation: "eh'-rets",
    pos: "Nom. fém.",
    definition: "Terre, pays, contrée, sol. Peut désigner la totalité de la terre (planète), un pays spécifique, une région, le territoire d'une nation, ou le sol sur lequel on marche. Dans Genèse 1:1 : création de la totalité de la réalité physique.",
    etymology: "Racine incertaine ; peut-être d'une racine primitive signifiant « être ferme ».",
    occurrences: 2505,
    related: ["H127", "H8398"],
    relatedWords: ["אֲדָמָה", "תֵּבֵל"],
    books: { "Genèse": 309, "Deutéronome": 195, "Psaumes": 188, "Ésaïe": 174 }
  },
  "H1254": {
    number: "H1254",
    hebrew: "בָּרָא",
    translit: "bārāʾ",
    pronunciation: "baw-raw'",
    pos: "Verbe qal",
    definition: "Créer, former, produire. Ce verbe est uniquement utilisé avec Dieu comme sujet dans la Bible hébraïque — jamais avec un être humain. Il implique une création qui ne requiert pas de matière préexistante (créatio ex nihilo), bien que ce concept théologique soit débattu.",
    etymology: "Racine primitive ; distinct de H3335 (יָצַר, former) et H6213 (עָשָׂה, faire).",
    occurrences: 54,
    related: ["H3335", "H6213", "H1277"],
    relatedWords: ["יָצַר", "עָשָׂה", "בְּרֵאשִׁית"],
    books: { "Genèse": 11, "Ésaïe": 21, "Psaumes": 5, "Ézéchiel": 4 }
  },
  "H7225": {
    number: "H7225",
    hebrew: "רֵאשִׁית",
    translit: "rēʾšîṯ",
    pronunciation: "ray-sheeth'",
    pos: "Nom. fém.",
    definition: "Commencement, début, premier, origine. Indique le point de départ dans le temps ou le rang. En Genèse 1:1 (בְּרֵאשִׁית), il introduit la narration de la création. Peut aussi désigner les prémices (prémices des fruits, des revenus) comme offrandes.",
    etymology: "De H7218 (רֹאשׁ, tête, sommet, chef) + suffixe féminin -ית.",
    occurrences: 51,
    related: ["H7218", "H314", "H319"],
    relatedWords: ["רֹאשׁ", "אַחֲרִית", "תְּחִלָּה"],
    books: { "Genèse": 3, "Deutéronome": 4, "Proverbes": 5, "Jérémie": 8, "Ésaïe": 6 }
  },
  "H8064": {
    number: "H8064",
    hebrew: "שָׁמַיִם",
    translit: "šāmayim",
    pronunciation: "shaw-mah'-yim",
    pos: "Nom. masc. plur. dual.",
    definition: "Cieux, ciel, firmament. Terme hébreu pour le ciel qui est toujours au pluriel ou dual en hébreu. Peut désigner le ciel visible (atmosphère), le firmament, les étoiles et l'espace, ou le domaine spirituel où Dieu réside. \"Cieux des cieux\" = la totalité du domaine céleste.",
    etymology: "Du duel de H8065 ; peut-être de H5377 (être haut) ou d'une racine signifiant être élevé.",
    occurrences: 421,
    related: ["H8065", "H7549", "H6160"],
    relatedWords: ["שָׁחַק", "רָקִיעַ", "עָב"],
    books: { "Genèse": 53, "Deutéronome": 52, "Psaumes": 75, "Ésaïe": 54 }
  },
  "H216": {
    number: "H216",
    hebrew: "אוֹר",
    translit: "ʾôr",
    pronunciation: "ore",
    pos: "Nom. masc.",
    definition: "Lumière, lumière du jour, aurore. Désigne la lumière dans son sens physique mais aussi métaphorique : vérité divine, prospérité, guidance, salut. Dans Genèse 1:3, première création par la parole divine. La lumière comme symbole de la présence et de la révélation de Dieu.",
    etymology: "De H215 (אוֹר, être ou devenir lumineux).",
    occurrences: 120,
    related: ["H215", "H5051", "H3974"],
    relatedWords: ["אוּרִים", "נֵר", "נֹגַהּ"],
    books: { "Genèse": 4, "Job": 28, "Psaumes": 24, "Ésaïe": 19 }
  },
  "H2822": {
    number: "H2822",
    hebrew: "חֹשֶׁךְ",
    translit: "ḥōšeḵ",
    pronunciation: "kho-shek'",
    pos: "Nom. masc.",
    definition: "Obscurité, ténèbres, nuit. Désigne l'obscurité physique ou les ténèbres dans un sens spirituel et moral. Représente souvent le domaine du mal, du jugement, de la mort ou de l'ignorance spirituelle. Antonyme de H216 (אוֹר).",
    etymology: "De H2821 (חָשַׁךְ, être obscur) ; racine primitive.",
    occurrences: 80,
    related: ["H216", "H652", "H6205"],
    relatedWords: ["אֲפֵלָה", "אֹפֶל", "צַלְמָוֶת"],
    books: { "Genèse": 5, "Job": 15, "Psaumes": 21, "Ésaïe": 16 }
  },
  "H3068": {
    number: "H3068",
    hebrew: "יְהוָה",
    translit: "YHWH / Yahweh",
    pronunciation: "yeh-ho-vaw'",
    pos: "Nom. propre",
    definition: "L'Éternel, YHWH, Yahweh — le nom propre de Dieu dans l'Ancien Testament. Le Tétragramme sacré, composé des quatre lettres יהוה. Signifie « Il est », « Il sera », « Il était » — l'Être éternel et auto-existant. Les Juifs le remplacent à la lecture par אֲדֹנָי (Adonaï, Seigneur).",
    etymology: "De H1961 (הָיָה, être, exister). En rapport avec l'autoprésentation divine en Exode 3:14 : אֶהְיֶה אֲשֶׁר אֶהְיֶה (\"Je suis celui qui suis\").",
    occurrences: 6828,
    related: ["H3069", "H430", "H136", "H1961"],
    relatedWords: ["אֲדֹנָי", "אֵל", "אֱלֹהִים", "שַׁדַּי"],
    books: { "Genèse": 143, "Exode": 356, "Deutéronome": 550, "Psaumes": 695, "Jérémie": 735 }
  },
  "H7307": {
    number: "H7307",
    hebrew: "רוּחַ",
    translit: "rûaḥ",
    pronunciation: "roo'-akh",
    pos: "Nom. commun",
    definition: "Esprit, vent, souffle, respiration. L'un des termes les plus polyvalents de l'hébreu biblique. Peut désigner : le vent physique, le souffle humain, le principe vital (âme), l'esprit d'une personne (siège des émotions), l'Esprit de Dieu (Esprit Saint), ou des esprits surnaturels.",
    etymology: "De H7306 (רוּחַ, percevoir une odeur, humer) ou racine primitive liée au mouvement de l'air.",
    occurrences: 389,
    related: ["H5397", "H5315", "H4151"],
    relatedWords: ["נְשָׁמָה", "נֶפֶשׁ", "נֶשֶׁר"],
    books: { "Genèse": 15, "Job": 30, "Psaumes": 39, "Ésaïe": 50, "Ézéchiel": 52 }
  },
  "H4325": {
    number: "H4325",
    hebrew: "מַיִם",
    translit: "mayim",
    pronunciation: "mah'-yim",
    pos: "Nom. masc. plur.",
    definition: "Eaux, eau. Toujours au pluriel en hébreu. Désigne l'eau dans ses différentes formes : rivières, mers, pluie, eaux souterraines. Symboliquement : chaos primordial, purification, abondance de blessures. Dans Genèse 1 : les eaux précèdent la création ordonnée.",
    etymology: "Mot primitif du duel ; connexion possible avec H4326.",
    occurrences: 585,
    related: ["H3220", "H5104", "H1794"],
    relatedWords: ["יָם", "נַחַל", "נָהָר"],
    books: { "Genèse": 44, "Exode": 47, "Nombres": 32, "Psaumes": 66, "Ézéchiel": 44 }
  }
};

// Sample Bible Text — Genesis 1 with Strong's
const BIBLE_DATA = {
  "gen": {
    name: "Genèse",
    hebrewName: "בְּרֵאשִׁית",
    chapters: 50,
    data: {
      1: [
        {
          v: 1,
          lsg: "Au commencement, Dieu créa les cieux et la terre.",
          kjv: "In the beginning God created the heaven and the earth.",
          hebrew: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃",
          words: [
            { heb: "בְּרֵאשִׁית", translit: "bə-rē-šîṯ", strong: "H7225", fr: "Au commencement" },
            { heb: "בָּרָא", translit: "bā-rā", strong: "H1254", fr: "créa" },
            { heb: "אֱלֹהִים", translit: "ʾĕ-lō-hîm", strong: "H430", fr: "Dieu" },
            { heb: "אֵת", translit: "ʾēṯ", strong: "H853", fr: "[particule]" },
            { heb: "הַשָּׁמַיִם", translit: "haš-šā-ma-yim", strong: "H8064", fr: "les cieux" },
            { heb: "וְאֵת", translit: "wə-ʾēṯ", strong: "H853", fr: "et" },
            { heb: "הָאָרֶץ", translit: "hā-ʾā-reṣ", strong: "H776", fr: "la terre" }
          ]
        },
        {
          v: 2,
          lsg: "La terre était informe et vide ; il y avait des ténèbres à la surface de l'abîme, et l'Esprit de Dieu se mouvait au-dessus des eaux.",
          kjv: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
          hebrew: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם׃",
          words: [
            { heb: "וְהָאָרֶץ", translit: "wə-hā-ʾā-reṣ", strong: "H776", fr: "Et la terre" },
            { heb: "הָיְתָה", translit: "hā-yə-ṯāh", strong: "H1961", fr: "était" },
            { heb: "תֹהוּ", translit: "ṯō-hū", strong: "H8414", fr: "informe" },
            { heb: "וָבֹהוּ", translit: "wā-ḇō-hū", strong: "H922", fr: "et vide" },
            { heb: "וְחֹשֶׁךְ", translit: "wə-ḥō-šeḵ", strong: "H2822", fr: "des ténèbres" },
            { heb: "עַל", translit: "ʿal", strong: "H5921", fr: "à la surface" },
            { heb: "פְּנֵי", translit: "pə-nê", strong: "H6440", fr: "de la face" },
            { heb: "תְהוֹם", translit: "ṯə-hōm", strong: "H8415", fr: "de l'abîme" },
            { heb: "וְרוּחַ", translit: "wə-rū-aḥ", strong: "H7307", fr: "et l'Esprit" },
            { heb: "אֱלֹהִים", translit: "ʾĕ-lō-hîm", strong: "H430", fr: "de Dieu" },
            { heb: "מְרַחֶפֶת", translit: "mə-ra-ḥe-feṯ", strong: "H7363", fr: "se mouvait" },
            { heb: "עַל", translit: "ʿal", strong: "H5921", fr: "au-dessus" },
            { heb: "פְּנֵי", translit: "pə-nê", strong: "H6440", fr: "de la surface" },
            { heb: "הַמָּיִם", translit: "ham-mā-yim", strong: "H4325", fr: "des eaux" }
          ]
        },
        {
          v: 3,
          lsg: "Dieu dit : Que la lumière soit ! Et la lumière fut.",
          kjv: "And God said, Let there be light: and there was light.",
          hebrew: "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר׃",
          words: [
            { heb: "וַיֹּאמֶר", translit: "way-yō-mer", strong: "H559", fr: "Dit" },
            { heb: "אֱלֹהִים", translit: "ʾĕ-lō-hîm", strong: "H430", fr: "Dieu" },
            { heb: "יְהִי", translit: "yə-hî", strong: "H1961", fr: "Que soit" },
            { heb: "אוֹר", translit: "ʾōr", strong: "H216", fr: "lumière" },
            { heb: "וַיְהִי", translit: "way-hî", strong: "H1961", fr: "et fut" },
            { heb: "אוֹר", translit: "ʾōr", strong: "H216", fr: "lumière" }
          ]
        },
        {
          v: 4,
          lsg: "Dieu vit que la lumière était bonne ; et Dieu sépara la lumière d'avec les ténèbres.",
          kjv: "And God saw the light, that it was good: and God divided the light from the darkness.",
          hebrew: "וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ׃",
          words: [
            { heb: "וַיַּרְא", translit: "way-yar", strong: "H7200", fr: "vit" },
            { heb: "אֱלֹהִים", translit: "ʾĕ-lō-hîm", strong: "H430", fr: "Dieu" },
            { heb: "אֶת", translit: "ʾeṯ", strong: "H853", fr: "[acc.]" },
            { heb: "הָאוֹר", translit: "hā-ʾōr", strong: "H216", fr: "la lumière" },
            { heb: "כִּי", translit: "kî", strong: "H3588", fr: "que" },
            { heb: "טוֹב", translit: "ṭōḇ", strong: "H2896", fr: "bonne" },
            { heb: "וַיַּבְדֵּל", translit: "way-yaḇ-dêl", strong: "H914", fr: "sépara" },
            { heb: "אֱלֹהִים", translit: "ʾĕ-lō-hîm", strong: "H430", fr: "Dieu" },
            { heb: "בֵּין", translit: "bên", strong: "H996", fr: "entre" },
            { heb: "הָאוֹר", translit: "hā-ʾōr", strong: "H216", fr: "la lumière" },
            { heb: "וּבֵין", translit: "ū-ḇên", strong: "H996", fr: "et" },
            { heb: "הַחֹשֶׁךְ", translit: "ha-ḥō-šeḵ", strong: "H2822", fr: "les ténèbres" }
          ]
        },
        {
          v: 5,
          lsg: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin : ce fut le premier jour.",
          kjv: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
          hebrew: "וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם וְלַחֹשֶׁךְ קָרָא לָיְלָה וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד׃",
          words: [
            { heb: "וַיִּקְרָא", translit: "way-yiq-rā", strong: "H7121", fr: "appela" },
            { heb: "אֱלֹהִים", translit: "ʾĕ-lō-hîm", strong: "H430", fr: "Dieu" },
            { heb: "לָאוֹר", translit: "lā-ʾōr", strong: "H216", fr: "la lumière" },
            { heb: "יוֹם", translit: "yōm", strong: "H3117", fr: "jour" },
            { heb: "וְלַחֹשֶׁךְ", translit: "wə-la-ḥō-šeḵ", strong: "H2822", fr: "et les ténèbres" },
            { heb: "קָרָא", translit: "qā-rā", strong: "H7121", fr: "il appela" },
            { heb: "לָיְלָה", translit: "lā-yə-lāh", strong: "H3915", fr: "nuit" },
            { heb: "וַיְהִי", translit: "way-hî", strong: "H1961", fr: "il y eut" },
            { heb: "עֶרֶב", translit: "ʿe-reḇ", strong: "H6153", fr: "un soir" },
            { heb: "וַיְהִי", translit: "way-hî", strong: "H1961", fr: "il y eut" },
            { heb: "בֹקֶר", translit: "ḇō-qer", strong: "H1242", fr: "un matin" },
            { heb: "יוֹם", translit: "yōm", strong: "H3117", fr: "jour" },
            { heb: "אֶחָד", translit: "ʾe-ḥāḏ", strong: "H259", fr: "un" }
          ]
        }
      ]
    }
  },
  "psa": {
    name: "Psaumes",
    hebrewName: "תְּהִלִּים",
    chapters: 150,
    data: {
      23: [
        {
          v: 1,
          lsg: "L'Éternel est mon berger : je ne manquerai de rien.",
          kjv: "The LORD is my shepherd; I shall not want.",
          hebrew: "יְהוָה רֹעִי לֹא אֶחְסָר׃",
          words: [
            { heb: "יְהוָה", translit: "Yah-weh", strong: "H3068", fr: "L'Éternel" },
            { heb: "רֹעִי", translit: "rō-ʿî", strong: "H7462", fr: "mon berger" },
            { heb: "לֹא", translit: "lō", strong: "H3808", fr: "ne...pas" },
            { heb: "אֶחְסָר", translit: "ʾeḥ-sār", strong: "H2637", fr: "je manquerai" }
          ]
        },
        {
          v: 2,
          lsg: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.",
          kjv: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
          hebrew: "בִּנְאוֹת דֶּשֶׁא יַרְבִּיצֵנִי עַל־מֵי מְנֻחוֹת יְנַהֲלֵנִי׃",
          words: [
            { heb: "בִּנְאוֹת", translit: "bin-ʾōṯ", strong: "H4999", fr: "dans des pâturages" },
            { heb: "דֶּשֶׁא", translit: "de-šeʾ", strong: "H1877", fr: "verdoyants" },
            { heb: "יַרְבִּיצֵנִי", translit: "yar-bî-ṣê-nî", strong: "H7257", fr: "il me fait reposer" },
            { heb: "עַל", translit: "ʿal", strong: "H5921", fr: "près de" },
            { heb: "מֵי", translit: "mê", strong: "H4325", fr: "eaux de" },
            { heb: "מְנֻחוֹת", translit: "mə-nu-ḥōṯ", strong: "H4496", fr: "repos" },
            { heb: "יְנַהֲלֵנִי", translit: "yə-na-ha-lê-nî", strong: "H5095", fr: "il me dirige" }
          ]
        }
      ]
    }
  }
};

// Search index across books
const SEARCH_INDEX = [
  { ref: "Genèse 1:1", text: "Au commencement, Dieu créa les cieux et la terre.", book: "gen", ch: 1, v: 1 },
  { ref: "Genèse 1:2", text: "La terre était informe et vide ; il y avait des ténèbres à la surface de l'abîme, et l'Esprit de Dieu se mouvait au-dessus des eaux.", book: "gen", ch: 1, v: 2 },
  { ref: "Genèse 1:3", text: "Dieu dit : Que la lumière soit ! Et la lumière fut.", book: "gen", ch: 1, v: 3 },
  { ref: "Genèse 1:4", text: "Dieu vit que la lumière était bonne ; et Dieu sépara la lumière d'avec les ténèbres.", book: "gen", ch: 1, v: 4 },
  { ref: "Genèse 1:5", text: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin : ce fut le premier jour.", book: "gen", ch: 1, v: 5 },
  { ref: "Psaumes 23:1", text: "L'Éternel est mon berger : je ne manquerai de rien.", book: "psa", ch: 23, v: 1 },
  { ref: "Psaumes 23:2", text: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.", book: "psa", ch: 23, v: 2 }
];

// Translation comparison data
const TRANSLATIONS = {
  "Genèse 1:1": {
    lsg: "Au commencement, Dieu créa les cieux et la terre.",
    kjv: "In the beginning God created the heaven and the earth.",
    hebrewTrad: "En début/commencement, Dieu-les-puissances créa les cieux et la terre.",
    nkjv: "In the beginning God created the heavens and the earth.",
    esv: "In the beginning, God created the heavens and the earth.",
    hebraw: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
    notes: "בְּרֵאשִׁית (bərēšîṯ) : sans article défini en hébreu, ce qui laisse place au débat : « Au commencement » (absolu) vs « En un commencement » (relatif). La LXX grecque utilise ἐν ἀρχῇ (en arkhē)."
  },
  "Psaumes 23:1": {
    lsg: "L'Éternel est mon berger : je ne manquerai de rien.",
    kjv: "The LORD is my shepherd; I shall not want.",
    hebrewTrad: "YHWH mon-berger, pas je-manquerai.",
    nkjv: "The LORD is my shepherd; I shall not want.",
    esv: "The LORD is my shepherd; I shall not want.",
    hebraw: "יְהוָה רֹעִי לֹא אֶחְסָר",
    notes: "Psaume davidique. רֹעִי (rōʿî) est la 1ère pers. sing. avec suffixe possessif (mon berger). אֶחְסָר (ʾeḥsār) : manquer, avoir besoin — nié par לֹא."
  }
};
