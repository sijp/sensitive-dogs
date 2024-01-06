export const locations: Record<
  string,
  {
    label: string;
    lineColor: string;
    fillColor: string;
    polygon: Array<[number, number]>;
  }
> = {
  "Tel Aviv": {
    label: "תל אביב - יפו",
    lineColor: "orange",
    fillColor: "orange",
    polygon: [
      [32.14160649321828, 34.790611267089844],
      [32.06017315415814, 34.760398864746094],
      [32.05639055725355, 34.751129150390625],
      [32.03631107904959, 34.74323272705078],
      [32.03485587323872, 34.76177215576171],
      [32.038057295494845, 34.78099822998047],
      [32.03165433905028, 34.80365753173828],
      [32.05318977618135, 34.83043670654297],
      [32.063082737657666, 34.79679107666015],
      [32.09566374875704, 34.803314208984375],
      [32.109914288831845, 34.8486328125],
      [32.12387184528523, 34.85481262207031],
      [32.14160649321828, 34.790611267089844]
    ]
  },
  "Ramat-Gan-Givataim": {
    label: "רמת גן - גבעתיים",
    lineColor: "green",
    fillColor: "green",
    polygon: [
      [32.10933267766434, 34.8486328125],
      [32.09595459833164, 34.803314208984375],
      [32.06351916720022, 34.79679107666015],
      [32.0524623103222, 34.83386993408203],
      [32.0639555946604, 34.83884811401367],
      [32.072101858328686, 34.8431396484375],
      [32.09130089401913, 34.84537124633789],
      [32.10933267766434, 34.8486328125]
    ]
  },
  "Petah Tikva": {
    label: "פתח תקווה והסביבה",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [32.10089889941537, 34.847602844238274],
      [32.07268370653683, 34.843997955322266],
      [32.064246545143625, 34.83884811401367],
      [32.067737878750336, 34.86579895019531],
      [32.064392020038184, 34.900474548339844],
      [32.068028817201444, 34.925880432128906],
      [32.112240696452005, 34.903221130371094],
      [32.11456704479077, 34.876441955566406],
      [32.10089889941537, 34.847602844238274]
    ]
  },
  "Holon Bat-Yam": {
    label: "חולון - בת-ים",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [32.035437958338264, 34.74357604980469],
      [32.00720256944707, 34.731903076171875],
      [31.992644847013356, 34.75971221923828],
      [31.99439189573705, 34.77447509765625],
      [32.001670907193514, 34.78752136230469],
      [31.992644847013356, 34.80571746826172],
      [32.0159360933931, 34.82460021972656],
      [32.03107222989981, 34.803314208984375],
      [32.03893039122854, 34.78134155273437],
      [32.03456482930134, 34.758338928222656],
      [32.035437958338264, 34.74357604980469]
    ]
  },
  "Rishon Lezion": {
    label: "ראשון לציון",
    lineColor: "orange",
    fillColor: "orange",
    polygon: [
      [32.006620304927935, 34.733619689941406],
      [31.955075251909054, 34.71199035644531],
      [31.948666499428395, 34.78511810302734],
      [31.944587969619008, 34.822540283203125],
      [31.955075251909054, 34.83558654785156],
      [31.992644847013356, 34.807090759277344],
      [32.001088607540446, 34.78752136230469],
      [31.993809549860114, 34.774818420410156],
      [31.992062490043562, 34.75799560546874],
      [32.006620304927935, 34.733619689941406]
    ]
  },
  Rehovot: {
    label: "רחובות והסביבה",
    lineColor: "green",
    fillColor: "green",
    polygon: [
      [31.94808386339691, 34.78065490722656],
      [31.950997006605856, 34.75318908691406],
      [31.89912925004609, 34.73464965820312],
      [31.829732296454807, 34.85343933105469],
      [31.84810716236533, 34.86614227294922],
      [31.944005307724854, 34.82219696044922],
      [31.94808386339691, 34.78065490722656]
    ]
  },
  Gadera: {
    label: "גדרה והסביבה",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [31.89912925004609, 34.73396301269531],
      [31.827398718328755, 34.69928741455078],
      [31.759991214243893, 34.78992462158203],
      [31.8291489074541, 34.85309600830078],
      [31.89912925004609, 34.73396301269531]
    ]
  },
  Ashdod: {
    label: "אשדוד והסביבה",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [31.843440876420004, 34.65362548828125],
      [31.762618400791368, 34.60968017578124],
      [31.77400201397002, 34.664955139160156],
      [31.763494113067303, 34.706153869628906],
      [31.794138821124903, 34.74494934082031],
      [31.827107016914944, 34.698944091796875],
      [31.843440876420004, 34.65362548828125]
    ]
  },
  Ashqelon: {
    label: "אשקלון והסביבה",
    lineColor: "orange",
    fillColor: "orange",
    polygon: [
      [31.70684766602465, 34.574317932128906],
      [31.63409093108523, 34.51904296875],
      [31.617135397511692, 34.58290100097656],
      [31.65776503883107, 34.604530334472656],
      [31.710352574793028, 34.625816345214844],
      [31.70684766602465, 34.574317932128906]
    ]
  },
  QiriatGat: {
    label: "קרית גת והסביבה",
    lineColor: "green",
    fillColor: "green",
    polygon: [
      [31.662148471209694, 34.751129150390625],
      [31.588479372712193, 34.723663330078125],
      [31.55162295891314, 34.79988098144531],
      [31.62532121329918, 34.816360473632805],
      [31.662148471209694, 34.751129150390625]
    ]
  },
  "Beer Sheva": {
    label: "באר שבע והסביבה",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [31.395260427356035, 34.7882080078125],
      [31.393502061653894, 34.71954345703125],
      [31.33252503230784, 34.70375061035156],
      [31.33604401284106, 34.65911865234375],
      [31.31434153691389, 34.57672119140625],
      [31.22219703210317, 34.70306396484375],
      [31.175797312361503, 34.80262756347656],
      [31.213388709053987, 34.885711669921875],
      [31.286766314555713, 34.87953186035156],
      [31.329592448016598, 34.93309020996094],
      [31.38588209641799, 34.87541198730469],
      [31.395260427356035, 34.7882080078125]
    ]
  },
  Arad: {
    label: "ערד והסביבה",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [31.258302574372216, 35.174102783203125],
      [31.221022636447476, 35.20362854003906],
      [31.221316236729276, 35.233154296875],
      [31.24039829876376, 35.25238037109375],
      [31.27561659420767, 35.24620056152344],
      [31.281485032398894, 35.210838317871094],
      [31.274736296985857, 35.18474578857422],
      [31.258302574372216, 35.174102783203125]
    ]
  },
  Negev: {
    label: "איזור הנגב",
    lineColor: "orange",
    fillColor: "orange",
    polygon: [
      [31.21984822620118, 34.3707275390625],
      [31.156408414557, 34.3048095703125],
      [30.07860131571654, 34.727783203125],
      [30.09523698193298, 35.13153076171875],
      [30.90929451672016, 35.33203125],
      [31.125848160720036, 35.23040771484375],
      [31.16110911780645, 34.80743408203125],
      [31.21984822620118, 34.3707275390625]
    ]
  },
  Eilat: {
    label: "אילת",
    lineColor: "green",
    fillColor: "green",
    polygon: [
      [29.64628817811431, 34.87884521484374],
      [29.482643134466617, 34.907684326171875],
      [29.54000879252545, 34.9639892578125],
      [29.654642479663647, 35.02304077148437],
      [29.64628817811431, 34.87884521484374]
    ]
  },
  Jerusalem: {
    label: "ירושלים",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [31.808144448024276, 35.15350341796875],
      [31.766121200173643, 35.15350341796875],
      [31.731671248829198, 35.19538879394531],
      [31.739263016960418, 35.2386474609375],
      [31.809895002118832, 35.22697448730469],
      [31.808144448024276, 35.15350341796875]
    ]
  },
  Modiin: {
    label: "מודיעין והסביבה",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [31.94808386339691, 34.987335205078125],
      [31.9084559472447, 34.97222900390624],
      [31.85598098460412, 34.95918273925781],
      [31.85948024535741, 35.035400390625],
      [31.92244422070713, 35.031280517578125],
      [31.94808386339691, 34.987335205078125]
    ]
  },
  LodRamla: {
    label: "רמלה לוד והסביבה",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [31.921570015932414, 34.84039306640625],
      [31.91574177175371, 34.86339569091796],
      [31.91953017247695, 34.88433837890625],
      [31.948666499428395, 34.90974426269531],
      [31.95449265652254, 34.88433837890625],
      [31.9390525324623, 34.866485595703125],
      [31.960901002531415, 34.847602844238274],
      [31.943713975392356, 34.82288360595703],
      [31.92360981414739, 34.83112335205078],
      [31.921570015932414, 34.84039306640625]
    ]
  },
  Herzlia: {
    label: "הרצליה ורמת השרון",
    lineColor: "green",
    fillColor: "green",
    polygon: [
      [32.142479, 34.789581],
      [32.123581, 34.857216],
      [32.159919, 34.869576],
      [32.170672, 34.864769],
      [32.211058, 34.811211],
      [32.142479, 34.789581]
    ]
  },
  Raanana: {
    label: "רעננה והסביבה",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [32.159919, 34.869576],
      [32.170672, 34.864769],
      [32.211058, 34.811211],
      [32.235165, 34.821167],
      [32.226743, 34.883995],
      [32.214834, 34.897041],
      [32.197695, 34.888115],
      [32.172416, 34.887428]
    ]
  },
  "Kfar Saba": {
    label: "כפר סבא",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [32.172416, 34.887428],
      [32.197695, 34.888115],
      [32.214834, 34.897041],
      [32.222096, 34.943733],
      [32.193628, 34.94236],
      [32.18956, 34.949913],
      [32.172125, 34.953003],
      [32.151781, 34.941673]
    ]
  },
  "Hod Hasharon": {
    label: "הוד השרון",
    lineColor: "orange",
    fillColor: "orange",
    polygon: [
      [32.159919, 34.869576],
      [32.172416, 34.887428],
      [32.151781, 34.941673],
      [32.118929, 34.904938],
      [32.123581, 34.857216],
      [32.159919, 34.869576]
    ]
  },
  "North Sharon": {
    label: "נתניה והסביבה",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [32.280747153922746, 34.834556579589844],
      [32.256362100282246, 34.85893249511719],
      [32.26332992710898, 34.91626739501953],
      [32.314701127170984, 34.95643615722656],
      [32.36894302288859, 34.91077423095703],
      [32.3715527751685, 34.859619140625],
      [32.280747153922746, 34.834556579589844]
    ]
  },
  "Emek Hefer": {
    label: "עמק חפר",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [32.41923996863082, 34.87163543701172],
      [32.37227769298472, 34.85910415649414],
      [32.370537880457896, 34.8900032043457],
      [32.37691702932188, 34.90991592407226],
      [32.39039874854987, 34.944934844970696],
      [32.410690015207734, 34.934635162353516],
      [32.41923996863082, 34.87163543701172]
    ]
  },
  Hadera: {
    label: "חדרה והסביבה",
    lineColor: "orange",
    fillColor: "orange",
    polygon: [
      [32.4205441275944, 34.87232208251953],
      [32.40547269651596, 34.95798110961914],
      [32.449665431344606, 34.96450424194335],
      [32.447782248455646, 34.94373321533203],
      [32.46241209596961, 34.935150146484375],
      [32.47327430689967, 34.88605499267578],
      [32.4205441275944, 34.87232208251953]
    ]
  },
  Haifa: {
    label: "חיפה והסביבה",
    lineColor: "green",
    fillColor: "green",
    polygon: [
      [32.71046664083003, 34.946136474609375],
      [32.75090009950632, 35.06904602050781],
      [32.81901782332612, 35.152130126953125],
      [32.866323137679224, 35.068359375],
      [32.81670960219091, 35.01686096191406],
      [32.839212199942395, 34.981842041015625],
      [32.82421110161336, 34.95506286621094],
      [32.71046664083003, 34.946136474609375]
    ]
  },
  Galil: {
    label: "הגליל",
    lineColor: "blue",
    fillColor: "blue",
    polygon: [
      [33.09499310776808, 35.09857177734375],
      [32.869206792437446, 35.066986083984375],
      [32.81844077366436, 35.149383544921875],
      [32.68446402087721, 35.28808593749999],
      [32.62780989050403, 35.57647705078124],
      [32.67521681957013, 35.613555908203125],
      [32.81844077366436, 35.52703857421875],
      [32.87612718124057, 35.54351806640625],
      [32.89342578969234, 35.606689453125],
      [33.07658322673801, 35.64788818359375],
      [33.090390998837975, 35.496826171875],
      [33.05816949218732, 35.352630615234375],
      [33.10879798900969, 35.297698974609375],
      [33.09499310776808, 35.09857177734375]
    ]
  },
  Golan: {
    label: "הגולן",
    lineColor: "purple",
    fillColor: "purple",
    polygon: [
      [33.09499310776808, 35.503692626953125],
      [33.078884672628604, 35.652008056640625],
      [32.89688510614291, 35.613555908203125],
      [32.708733368521585, 35.595703125],
      [32.672904869656634, 35.61767578125],
      [32.73877198768001, 35.7659912109375],
      [32.93838636388491, 35.89233398437499],
      [33.33511774753217, 35.77148437499999],
      [33.23983613293645, 35.624542236328125],
      [33.293803558346596, 35.56549072265625],
      [33.09499310776808, 35.503692626953125]
    ]
  }
};

export const services: Record<
  string,
  {
    label: string;
    icon: string;
  }
> = {
  trainers: {
    label: "אימון כלבים רגישים",
    icon: "sound_detection_dog_barking"
  },
  separation: { label: "חרדת נטישה", icon: "door_open" },
  puppies: { label: "אימון גורים", icon: "pets" },
  walkers: { label: "הולכת כלבים", icon: "podiatry" },
  "dog hotels": { label: "פנסיון", icon: "night_shelter" },
  sitters: { label: "סיטינג", icon: "Home" },
  groomers: { label: "טיפוח כלבים", icon: "Cut" },
  veterinarians: { label: "וטרינריה", icon: "stethoscope" },
  "complementary medicine": {
    label: "רפואה משלימה",
    icon: "medication_liquid"
  },
  Shops: { label: "חנויות", icon: "shopping_cart" },
  Photography: { label: "צילום", icon: "photo_camera" },
  Agility: { label: "ספורט כלבני", icon: "sports_baseball" }
};
