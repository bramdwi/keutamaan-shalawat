export interface TasbihAmalan {
  id: string;
  name: string;
  badge: string;
  defaultTarget: number;
  arabic: string;
  latin: string;
  translation: string;
  fadhilah: string;
  source: string;
}

export const tasbihAmalanList: TasbihAmalan[] = [
  {
    id: 'wirid-jumat-80',
    name: 'Wirid Jumat 80x Ba\'da Ashar',
    badge: '80x Jumat',
    defaultTarget: 80,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَسَلِّمْ تَسْلِيمًا',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin-nabiyyil-ummiyyi wa \'alā ālihī wa sallim taslīmā',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad, Nabi yang ummi, dan kepada keluarganya, serta curahkanlah salam penghormatan kepadanya.',
    fadhilah: 'Diampuni dosa-dosa selama 80 tahun dan dicatat baginya pahala ibadah selama 80 tahun. Merupakan wirid istiqamah Syaikhul Hadits Maulana Zakariya selama 30 tahun setiap selesai shalat Ashar pada hari Jumat sebelum beranjak dari tempat duduknya.',
    source: 'Bab II Pasal 4 & Khatimah Pasal 6'
  },
  {
    id: 'wirid-hajat-100',
    name: 'Wirid 100x Pengabul 100 Hajat',
    badge: '100x Hajat',
    defaultTarget: 100,
    arabic: 'صَلَّى اللَّهُ عَلَى مُحَمَّدٍ',
    latin: 'Ṣallallāhu \'alā Muḥammad',
    translation: 'Semoga Allah melimpahkan sholawat (rahmat) kepada Nabi Muhammad ﷺ.',
    fadhilah: 'Barangsiapa bersholawat 100 kali setiap hari, niscaya Allah mengabulkan 100 hajatnya (30 hajat dunia dan 70 hajat akhirat) serta mendapatkan salam langsung dari Baginda Rasulullah ﷺ.',
    source: 'Bab I Pasal 3 & Bab II Pasal 7'
  },
  {
    id: 'wirid-pagi-petang-10',
    name: 'Wirid 10x Pagi & 10x Petang',
    badge: '10x Pagi/Petang',
    defaultTarget: 10,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa \'alā āli Muḥammad',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan kepada keluarga Nabi Muhammad.',
    fadhilah: 'Rasulullah ﷺ bersabda: "Barangsiapa bersholawat kepadaku sepuluh kali di waktu pagi dan sepuluh kali di waktu petang, maka ia pasti akan memperoleh syafaatku pada hari kiamat."',
    source: 'Bab I Pasal 10 (HR. Thabrani)'
  },
  {
    id: 'wirid-harian-300',
    name: 'Wirid Harian 300x Bimbingan Mursyid',
    badge: '300x Harian',
    defaultTarget: 300,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ النَّبِيِّ الأُمِّيِّ',
    latin: 'Allāhumma ṣalli \'alā sayyidinā Muḥammadin \'abdika wa rasūlikan-nabiyyil-ummiyy',
    translation: 'Ya Allah, limpahkanlah sholawat kepada junjungan kami Nabi Muhammad, hamba-Mu dan Rasul-Mu, Nabi yang ummi.',
    fadhilah: 'Batas minimal harian menurut Kitab Qutul Qulub dan bimbingan Syaikh Rasyid Ahmad Gangohi agar seorang hamba terhindar dari predikat kikir dan tidak tahu balas budi atas jasa agung Rasulullah ﷺ.',
    source: 'Bab I Pasal 3 & Bab III Pasal 4'
  },
  {
    id: 'wirid-jumat-7-pekan',
    name: 'Wirid 7x Jumat Selama 7 Pekan',
    badge: '7x Selama 7 Pekan',
    defaultTarget: 7,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَأَنْزِلْهُ الْمَقْعَدَ الْمُقَرَّبَ عِنْدَكَ يَوْمَ الْقِيَامَةِ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa anzilhul-maq\'adal-muqarraba \'indaka yaumal-qiyāmah',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan tempatkanlah beliau pada kedudukan yang amat dekat di sisi-Mu pada hari kiamat.',
    fadhilah: 'Dibaca 7 kali setiap hari Jumat selama 7 pekan berturut-turut untuk meraih kepastian syafaat Rasulullah ﷺ dan kedudukan mulia di sisi Allah.',
    source: 'Bab II Pasal 7'
  },
  {
    id: 'wirid-jumat-1000',
    name: 'Wirid 1.000x Hari Jumat',
    badge: '1.000x Hari Jumat',
    defaultTarget: 1000,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa āli Muḥammad',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan keluarga Nabi Muhammad.',
    fadhilah: 'Barangsiapa bersholawat 1.000 kali pada hari Jumat, ia tidak akan meninggal dunia melainkan telah diperlihatkan tempat duduknya di dalam surga.',
    source: 'Bab II Pasal 3 & Bab V Kisah 35'
  },
  {
    id: 'wirid-munjiyat',
    name: 'Shalawat Munjiyat (Penyelamat Badai)',
    badge: '300x / Bebas',
    defaultTarget: 300,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الأَهْوَالِ وَالآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ، وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ، وَتُبَلِّغُنَا بِهَا أَقْصَى الغَايَاتِ مِنْ جَمِيعِ الخَيْرَاتِ فِي الحَيَاةِ وَبَعْدَ المَمَاتِ',
    latin: 'Allāhumma ṣalli \'alā sayyidinā Muḥammadin ṣalātan tunjīnā bihā min jamī\'il-ahwāli wal-āfāt, wa taqḍī lanā bihā jamī\'al-ḥājāt, wa tuṭahhirunā bihā min jamī\'is-sayyi\'āt, wa tarfa\'unā bihā \'indaka a\'lad-darajāt, wa tuballighunā bihā aqṣal-ghāyāti min jamī\'il-khairāti fil-ḥayāti wa ba\'dal-mamāt',
    translation: 'Ya Allah, limpahkanlah sholawat kepada junjungan kami Nabi Muhammad, dengan sholawat yang menyelamatkan kami dari segala bencana dan marabahaya, mengabulkan seluruh hajat kami, menyucikan kami dari segala keburukan, mengangkat kami ke derajat tertinggi di sisi-Mu, dan menyampaikan kami ke puncak cita-cita kebaikan dalam hidup dan sesudah mati.',
    fadhilah: 'Amalan yang diajarkan Rasulullah ﷺ di dalam mimpi kepada Syaikh Musa Adh-Dharir tatkala kapalnya diterjang badai dahsyat di laut lepas, sehingga seluruh penumpang selamat berkat pertolongan Allah.',
    source: 'Bab V Kisah 2'
  },
  {
    id: 'wirid-khamsah-syafii',
    name: 'Shalawat Khamsah Imam Asy-Syafi\'i',
    badge: '33x Khamsah',
    defaultTarget: 33,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ كُلَّمَا ذَكَرَهُ الذَّاكِرُونَ وَغَفَلَ عَنْ ذِكْرِهِ الغَافِلُونَ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin kullamā dzakarahudz-dzākirūn, wa ghafala \'an dzikrihil-ghāfilūn',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad setiap kali orang-orang yang berdzikir mengingat beliau, dan setiap kali orang-orang yang lalai melupakan beliau.',
    fadhilah: 'Sebab Allah mengampuni dosa Imam Asy-Syafi\'i dan mengangkat derajatnya ke maqam tertinggi di surga tanpa hisab.',
    source: 'Bab V Kisah 6'
  },
  {
    id: 'wirid-ibrahimiyah',
    name: 'Shalawat Ibrahimiyah (Paling Utama)',
    badge: '33x Ibrahimiyah',
    defaultTarget: 33,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa \'alā āli Muḥammad, kamā ṣallaita \'alā Ibrāhīma wa \'alā āli Ibrāhīm, innaka Ḥamīdum Majīd. Allāhumma bārik \'alā Muḥammadin wa \'alā āli Muḥammad, kamā bārakta \'alā Ibrāhīma wa \'alā āli Ibrāhīm, innaka Ḥamīdum Majīd',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah melimpahkan sholawat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    fadhilah: 'Lafadz sholawat paling afdal dan paling sempurna yang diajarkan langsung oleh Rasulullah ﷺ kepada para sahabat untuk dibaca dalam shalat maupun wirid.',
    source: 'Bab II Pasal 1 (Shahih Bukhari & Muslim)'
  },
  {
    id: 'wirid-tasbih-bebas',
    name: 'Tasbih Bebas (Shalawat Jibril)',
    badge: 'Bebas / Istiqamah',
    defaultTarget: 0,
    arabic: 'صَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Ṣallallāhu \'alā sayyidinā Muḥammad',
    translation: 'Semoga Allah melimpahkan sholawat kepada junjungan kami Nabi Muhammad ﷺ.',
    fadhilah: 'Lafadz sholawat ringkas yang sangat mudah dibaca secara istiqamah ratusan hingga ribuan kali setiap hari tanpa batas waktu.',
    source: 'Bab I & Bab II'
  }
];
