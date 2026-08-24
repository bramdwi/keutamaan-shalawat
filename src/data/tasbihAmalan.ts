export interface TasbihAmalan {
  id: string;
  name: string;
  category: 'jumat' | 'harian' | 'ibadah' | 'penyelamat';
  categoryLabel: string;
  badge: string;
  defaultTarget: number;
  arabic: string;
  latin: string;
  translation: string;
  fadhilah: string;
  source: string;
  targetChapterId: string;
  targetSectionId: string;
}

export const tasbihAmalanList: TasbihAmalan[] = [
  // 1. KATEGORI: HARI JUMAT
  {
    id: 'wirid-jumat-80',
    name: 'Wirid Jumat 80x Ba\'da Ashar',
    category: 'jumat',
    categoryLabel: 'Hari Jumat',
    badge: '80x Ba\'da Ashar',
    defaultTarget: 80,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَسَلِّمْ تَسْلِيمًا',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin-nabiyyil-ummiyyi wa \'alā ālihī wa sallim taslīmā',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad, Nabi yang ummi, dan kepada keluarganya, serta curahkanlah salam penghormatan kepadanya.',
    fadhilah: 'Diampuni dosa-dosa selama 80 tahun dan dicatat baginya pahala ibadah selama 80 tahun. Merupakan wirid istiqamah Syaikhul Hadits Maulana Zakariya selama 30 tahun setiap selesai shalat Ashar pada hari Jumat sebelum beranjak dari tempat duduknya.',
    source: 'Bab II: Pasal 4 (Hadits 4)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-4'
  },
  {
    id: 'wirid-jumat-1000',
    name: 'Wirid 1.000x Hari Jumat',
    category: 'jumat',
    categoryLabel: 'Hari Jumat',
    badge: '1.000x Hari Jumat',
    defaultTarget: 1000,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa āli Muḥammad',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan keluarga Nabi Muhammad.',
    fadhilah: 'Barangsiapa bersholawat 1.000 kali pada hari Jumat, ia tidak akan meninggal dunia melainkan telah diperlihatkan tempat duduknya di dalam surga.',
    source: 'Bab II: Pasal 3 (Hadits 3)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-3'
  },
  {
    id: 'wirid-jumat-7-pekan',
    name: 'Wirid 7x Jumat Selama 7 Pekan',
    category: 'jumat',
    categoryLabel: 'Hari Jumat',
    badge: '7x Selama 7 Pekan',
    defaultTarget: 7,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَأَنْزِلْهُ الْمَقْعَدَ الْمُقَرَّبَ عِنْدَكَ يَوْمَ الْقِيَامَةِ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa anzilhul-maq\'adal-muqarraba \'indaka yaumal-qiyāmah',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan tempatkanlah beliau pada kedudukan yang amat dekat di sisi-Mu pada hari kiamat.',
    fadhilah: 'Dibaca 7 kali setiap hari Jumat selama 7 pekan berturut-turut untuk meraih kepastian syafaat Rasulullah ﷺ dan kedudukan mulia di Maqam Al-Muqarrab.',
    source: 'Bab II: Pasal 7 (Hadits 6)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-7'
  },
  {
    id: 'wirid-ruyah-nabi',
    name: 'Amalan Menatap Wajah Suci Nabi ﷺ',
    category: 'jumat',
    categoryLabel: 'Hari Jumat',
    badge: 'Ruh, Jasad & Kubur',
    defaultTarget: 33,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى رُوحِ مُحَمَّدٍ فِي الأَرْوَاحِ، وَعَلَى جَسَدِ مُحَمَّدٍ فِي الأَجْسَادِ، وَعَلَى قَبْرِ مُحَمَّدٍ فِي القُبُورِ',
    latin: 'Allāhumma ṣalli \'alā rūḥi Muḥammadin fil-arwāḥ, wa \'alā jasadi Muḥammadin fil-ajsād, wa \'alā qabri Muḥammadin fil-qubūr',
    translation: 'Ya Allah, limpahkanlah sholawat kepada ruh Sayyidina Muhammad di alam arwah, kepada jasad Sayyidina Muhammad di alam jasad, dan kepada makam Sayyidina Muhammad di alam kubur.',
    fadhilah: 'Dinukilkan oleh Imam Al-Qasthalani dalam Al-Mawahib Al-Ladunniyyah sebagai amalan mujarab yang dibaca menjelang tidur dengan hati bersih agar dikaruniai anugerah ru\'yah (bermimpi memandang wajah suci Baginda Nabi ﷺ).',
    source: 'Bab II: Pasal 10',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-10'
  },

  // 2. KATEGORI: HARIAN & PAGI PETANG
  {
    id: 'wirid-pagi-petang-10',
    name: 'Wirid 10x Pagi & 10x Petang',
    category: 'harian',
    categoryLabel: 'Harian & Pagi/Petang',
    badge: '10x Pagi & Petang',
    defaultTarget: 10,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa \'alā āli Muḥammad',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan kepada keluarga Nabi Muhammad.',
    fadhilah: 'Rasulullah ﷺ bersabda: "Barangsiapa bersholawat kepadaku sepuluh kali di waktu pagi dan sepuluh kali di waktu petang, maka ia pasti akan memperoleh syafaatku pada hari kiamat."',
    source: 'Bab I: Pasal 19 (Hadits 10)',
    targetChapterId: 'bab-1',
    targetSectionId: 'bab1-sec-19'
  },
  {
    id: 'wirid-hajat-100',
    name: 'Wirid 100x Pengabul 100 Hajat',
    category: 'harian',
    categoryLabel: 'Harian & Pagi/Petang',
    badge: '100x Hajat',
    defaultTarget: 100,
    arabic: 'صَلَّى اللَّهُ عَلَى مُحَمَّدٍ',
    latin: 'Ṣallallāhu \'alā Muḥammad',
    translation: 'Semoga Allah melimpahkan sholawat (rahmat) kepada Nabi Muhammad ﷺ.',
    fadhilah: 'Barangsiapa bersholawat 100 kali setiap hari, niscaya Allah mengabulkan 100 hajatnya (30 hajat dunia dan 70 hajat akhirat) serta mendapatkan salam langsung dari Baginda Rasulullah ﷺ.',
    source: 'Bab I: Pasal 7 (Hadits 3)',
    targetChapterId: 'bab-1',
    targetSectionId: 'bab1-sec-7'
  },
  {
    id: 'wirid-harian-300',
    name: 'Wirid Harian 300x Bimbingan Mursyid',
    category: 'harian',
    categoryLabel: 'Harian & Pagi/Petang',
    badge: '300x Harian',
    defaultTarget: 300,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ النَّبِيِّ الأُمِّيِّ',
    latin: 'Allāhumma ṣalli \'alā sayyidinā Muḥammadin \'abdika wa rasūlikan-nabiyyil-ummiyy',
    translation: 'Ya Allah, limpahkanlah sholawat kepada junjungan kami Nabi Muhammad, hamba-Mu dan Rasul-Mu, Nabi yang ummi.',
    fadhilah: 'Batas minimal harian menurut Kitab Qutul Qulub dan bimbingan Syaikh Rasyid Ahmad Gangohi agar seorang hamba terhindar dari predikat kikir dan tidak tahu balas budi atas jasa agung Rasulullah ﷺ.',
    source: 'Bab III: Pasal 4',
    targetChapterId: 'bab-3',
    targetSectionId: 'bab3-sec-4'
  },
  {
    id: 'wirid-jazallahu-anna',
    name: 'Doa "Jazallahu \'Anna Muhammadan"',
    category: 'harian',
    categoryLabel: 'Harian & Pagi/Petang',
    badge: 'Pahala 1.000 Hari',
    defaultTarget: 10,
    arabic: 'جَزَى اللَّهُ عَنَّا مُحَمَّدًا مَا هُوَ أَهْلُهُ',
    latin: 'Jazallāhu \'annā Muḥammadan mā huwa ahluh',
    translation: 'Semoga Allah membalas kebaikan Muhammad dari kami dengan balasan yang layak bagi keluhuran martabat beliau.',
    fadhilah: 'Rasulullah ﷺ bersabda bahwa membaca kalimat ini membuat 70 malaikat pencatat amal kepayahan mencatat pahalanya selama 1.000 hari (1.000 pagi). Sangat dianjurkan dibaca pagi, petang, atau 100x sehari.',
    source: 'Bab II: Pasal 7 (Hadits 6)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-7'
  },
  {
    id: 'wirid-tasbih-bebas',
    name: 'Tasbih Bebas (Shalawat Jibril)',
    category: 'harian',
    categoryLabel: 'Harian & Pagi/Petang',
    badge: 'Bebas / Istiqamah',
    defaultTarget: 0,
    arabic: 'صَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Ṣallallāhu \'alā sayyidinā Muḥammad',
    translation: 'Semoga Allah melimpahkan sholawat kepada junjungan kami Nabi Muhammad ﷺ.',
    fadhilah: 'Lafadz sholawat ringkas yang sangat mudah dibaca secara istiqamah ratusan hingga ribuan kali setiap hari tanpa batas waktu.',
    source: 'Bab I: Pasal 7 (Hadits 3)',
    targetChapterId: 'bab-1',
    targetSectionId: 'bab1-sec-7'
  },

  // 3. KATEGORI: IBADAH, SHALAT & TEMPAT SUCI
  {
    id: 'wirid-ibrahimiyah',
    name: 'Shalawat Ibrahimiyah (Paling Utama)',
    category: 'ibadah',
    categoryLabel: 'Ibadah & Shalat',
    badge: 'Paling Afdal',
    defaultTarget: 33,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin wa \'alā āli Muḥammad, kamā ṣallaita \'alā Ibrāhīma wa \'alā āli Ibrāhīm, innaka Ḥamīdum Majīd. Allāhumma bārik \'alā Muḥammadin wa \'alā āli Muḥammad, kamā bārakta \'alā Ibrāhīma wa \'alā āli Ibrāhīm, innaka Ḥamīdum Majīd',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah melimpahkan sholawat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Nabi Muhammad dan keluarga Nabi Muhammad sebagaimana Engkau telah memberkahi Nabi Ibrahim dan keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    fadhilah: 'Lafadz sholawat paling afdal dan paling sempurna yang diajarkan langsung oleh Rasulullah ﷺ kepada para sahabat untuk dibaca dalam shalat maupun wirid.',
    source: 'Bab II: Pasal 1 (Hadits 1)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-1'
  },
  {
    id: 'wirid-mikyalul-aufa',
    name: 'Shalawat Al-Mikyālul Aufā (Timbangan Sempurna)',
    category: 'ibadah',
    categoryLabel: 'Ibadah & Shalat',
    badge: 'Timbangan Penuh',
    defaultTarget: 33,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ النَّبِيِّ وَأَزْوَاجِهِ أُمَّهَاتِ الْمُؤْمِنِينَ وَذُرِّيَّتِهِ وَأَهْلِ بَيْتِهِ كَمَا صَلَّيْتَ عَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin-nabiyyi wa azwājihī ummahātil-mu\'minīn, wa dzurriyyatihī wa ahli baitihī kamā ṣallaita \'alā āli Ibrāhīma innaka Ḥamīdum Majīd',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad, para istrinya ibunda kaum mukminin, keturunannya, dan keluarganya, sebagaimana Engkau telah melimpahkan sholawat kepada keluarga Nabi Ibrahim, sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    fadhilah: 'Rasulullah ﷺ bersabda: "Barangsiapa senang ditakar pahalanya dengan takaran yang paling penuh dan paling sempurna saat bersholawat kepada kami, hendaklah ia membaca sholawat ini."',
    source: 'Bab II: Pasal 2 (Hadits 2)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-2'
  },
  {
    id: 'wirid-wasilah-adzan',
    name: 'Shalawat & Doa Wasilah Adzan',
    category: 'ibadah',
    categoryLabel: 'Ibadah & Shalat',
    badge: 'Halal Syafaat',
    defaultTarget: 1,
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    latin: 'Allāhumma Rabba hādhihid-da\'watit-tāmmati waṣ-ṣalātil-qā\'imah, āti Muḥammadanil-wasīlata wal-faḍīlata wab\'atshu maqāmam maḥmūdanil-ladzī wa\'adtah',
    translation: 'Ya Allah, Tuhan pemilik seruan yang sempurna dan shalat yang senantiasa ditegakkan, karuniakanlah kepada Nabi Muhammad kedudukan Al-Wasilah dan keutamaan, serta tempatkanlah beliau pada Maqam Terpuji yang telah Engkau janjikan.',
    fadhilah: 'Dibaca seusai menjawab seruan adzan dan bersholawat kepada Nabi ﷺ. Rasulullah ﷺ bersabda: "Barangsiapa memohonkan Wasilah untukku, pasti halal baginya syafaatku."',
    source: 'Bab II: Pasal 8 (Hadits 7)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-8'
  },
  {
    id: 'wirid-masjid',
    name: 'Shalawat & Doa Masuk/Keluar Masjid',
    category: 'ibadah',
    categoryLabel: 'Ibadah & Shalat',
    badge: 'Pintu Rahmat & Karunia',
    defaultTarget: 3,
    arabic: 'بِسْمِ اللَّهِ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: 'Bismillāh was-salāmu \'alā Rasūlillāh, Allāhummaghfir lī dzunūbī waftaḥ lī abwāba raḥmatik (Saat keluar: «abwāba faḍlik»)',
    translation: 'Dengan menyebut nama Allah dan salam sejahtera atas Rasulullah. Ya Allah, ampunilah dosa-dosaku dan bukakanlah untukku pintu-pintu rahmat-Mu (dan saat keluar: pintu-pintu karunia-Mu).',
    fadhilah: 'Sunnah muakkadah saat memasuki rumah Allah agar meraih curahan taufik ibadah dan saat keluar diampuni dosa serta dilimpahi rezeki halal.',
    source: 'Bab II: Pasal 9 (Hadits 8)',
    targetChapterId: 'bab-2',
    targetSectionId: 'bab2-sec-9'
  },
  {
    id: 'wirid-salam-raudhah',
    name: 'Tuntunan Salam di Raudhah Makam Nabi ﷺ',
    category: 'ibadah',
    categoryLabel: 'Ibadah & Shalat',
    badge: 'Ziarah Madinah',
    defaultTarget: 3,
    arabic: 'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا نَبِيَّ اللَّهِ، السَّلَامُ عَلَيْكَ يَا خِيَرَةَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا حَبِيبَ اللَّهِ',
    latin: 'As-salāmu \'alaika yā Rasūlallāh, as-salāmu \'alaika yā Nabiyyallāh, as-salāmu \'alaika yā Khiyaratallāh, as-salāmu \'alaika yā Ḥabīballāh',
    translation: 'Salam sejahtera atasmu wahai Rasulullah, salam sejahtera atasmu wahai Nabiyullah, salam sejahtera atasmu wahai insan pilihan Allah, salam sejahtera atasmu wahai Kekasih Allah.',
    fadhilah: 'Tuntunan lafadz salam ziarah Raudhah Makam Suci Nabi ﷺ di Madinah Munawwarah yang dianjurkan Syaikhul Hadits Maulana Muhammad Zakariya, di mana Nabi ﷺ membalas salam peziarahnya secara langsung.',
    source: 'Bab I: Pasal 16 & 17',
    targetChapterId: 'bab-1',
    targetSectionId: 'bab1-sec-16'
  },

  // 4. KATEGORI: KISAH TELADAN, KAROMAH & PENYELAMAT
  {
    id: 'wirid-munjiyat',
    name: 'Shalawat Munjiyat (Penyelamat Badai)',
    category: 'penyelamat',
    categoryLabel: 'Karomah & Penyelamat',
    badge: 'Penyelamat Marabahaya',
    defaultTarget: 300,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الأَهْوَالِ وَالآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ، وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ، وَتُبَلِّغُنَا بِهَا أَقْصَى الغَايَاتِ مِنْ جَمِيعِ الخَيْرَاتِ فِي الحَيَاةِ وَبَعْدَ المَمَاتِ',
    latin: 'Allāhumma ṣalli \'alā sayyidinā Muḥammadin ṣalātan tunjīnā bihā min jamī\'il-ahwāli wal-āfāt, wa taqḍī lanā bihā jamī\'al-ḥājāt, wa tuṭahhirunā bihā min jamī\'is-sayyi\'āt, wa tarfa\'unā bihā \'indaka a\'lad-darajāt, wa tuballighunā bihā aqṣal-ghāyāti min jamī\'il-khairāti fil-ḥayāti wa ba\'dal-mamāt',
    translation: 'Ya Allah, limpahkanlah sholawat kepada junjungan kami Nabi Muhammad, dengan sholawat yang menyelamatkan kami dari segala bencana dan marabahaya, mengabulkan seluruh hajat kami, menyucikan kami dari segala keburukan, mengangkat kami ke derajat tertinggi di sisi-Mu, dan menyampaikan kami ke puncak cita-cita kebaikan dalam hidup dan sesudah mati.',
    fadhilah: 'Amalan yang diajarkan Rasulullah ﷺ di dalam mimpi kepada Syaikh Musa Adh-Dharir tatkala kapalnya diterjang badai dahsyat di laut lepas, sehingga seluruh penumpang selamat berkat pertolongan Allah.',
    source: 'Bab V: Kisah 2',
    targetChapterId: 'bab-5',
    targetSectionId: 'bab5-sec-2'
  },
  {
    id: 'wirid-khamsah-syafii',
    name: 'Shalawat Khamsah Imam Asy-Syafi\'i',
    category: 'penyelamat',
    categoryLabel: 'Karomah & Penyelamat',
    badge: 'Ampunan Tanpa Hisab',
    defaultTarget: 33,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ كُلَّمَا ذَكَرَهُ الذَّاكِرُونَ وَغَفَلَ عَنْ ذِكْرِهِ الغَافِلُونَ',
    latin: 'Allāhumma ṣalli \'alā Muḥammadin kullamā dzakarahudz-dzākirūn, wa ghafala \'an dzikrihil-ghāfilūn',
    translation: 'Ya Allah, limpahkanlah sholawat kepada Nabi Muhammad setiap kali orang-orang yang berdzikir mengingat beliau, dan setiap kali orang-orang yang lalai melupakan beliau.',
    fadhilah: 'Sebab Allah mengampuni dosa Imam Asy-Syafi\'i dan mengangkat derajatnya ke maqam tertinggi di surga tanpa hisab.',
    source: 'Bab V: Kisah 6',
    targetChapterId: 'bab-5',
    targetSectionId: 'bab5-sec-6'
  },
  {
    id: 'wirid-ubay-kaab',
    name: 'Shalawat Ubay (Pelepas Segala Kegelisahan)',
    category: 'penyelamat',
    categoryLabel: 'Karomah & Penyelamat',
    badge: 'Dicukupi Semua Hajat',
    defaultTarget: 100,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Allāhumma ṣalli \'alā sayyidinā Muḥammadin wa \'alā āli sayyidinā Muḥammad',
    translation: 'Ya Allah, limpahkanlah sholawat kepada junjungan kami Nabi Muhammad dan kepada keluarga junjungan kami Nabi Muhammad.',
    fadhilah: 'Tatkala Sayyidina Ubay bin Ka\'ab radhiyallahu \'anhu berkata: "Aku akan menjadikan seluruh waktu doaku khusus untuk bersholawat kepadamu", Rasulullah ﷺ bersabda: "Jika demikian, Allah akan mencukupi segala urusan kegelisahan duniamu dan mengampuni seluruh dosamu."',
    source: 'Bab I: Pasal 5 (Hadits 1)',
    targetChapterId: 'bab-1',
    targetSectionId: 'bab1-sec-5'
  }
];
