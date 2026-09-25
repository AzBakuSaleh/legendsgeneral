# Legends General

Azərbaycan dilində metal mebel və saxlama sistemləri saytı. React, Next.js və TypeScript ilə hazırlanıb. Kompüter və telefon ekranlarına uyğunlaşır. Server bazası tələb etmir; hazır nəticə adi statik hostinqdə işləyir.

## Hazır sayta baxmaq

Windows-da `SAYTI-AC.cmd` faylını açın. Görünən `http://127.0.0.1:5174` ünvanına brauzerdə keçin. Pəncərə açıq qalmalıdır. Bu paketdəki `out` qovluğu hazır saytdır. HTML faylını birbaşa iki dəfə klikləyərək açmayın: səhifə keçidləri üçün yerli server lazımdır.

## VS Code ilə işləmək

VS Code → File → Open Folder → bu `legends-general` qovluğunu seçin.

İnkişaf üçün Node.js 22.13 və ya daha yeni LTS versiya və onunla gələn npm lazımdır. Python lazım deyil.

```sh
npm install
npm run dev
```

İşçi ünvan: `http://127.0.0.1:5173`. Faylları dəyişib yadda saxlayanda brauzerdə nəticə yenilənir.

```sh
npm run typecheck
npm run build
npm start
```

`build` hazır saytı `out` qovluğuna yığır. `start` hazır nəticəni 5174 portunda açır. `out` qovluğunun içindəkilər domenin kök qovluğuna yerləşdirilə bilər. Hostinq qovluq ünvanları üçün `index.html` açmağı və olmayan ünvanlar üçün `404.html` qaytarmağı dəstəkləməlidir.

## Məzmunu dəyişmək

- `lib/content.ts`: telefonlar, ünvan, məhsullar, kateqoriyalar, görülən işlər və Instagram keçidləri.
- `app/page.tsx`: ana səhifənin bölmələri.
- `components/site/hero.tsx`: slaydların mətn və şəkilləri.
- `components/site/contact.tsx`: müraciət forması.
- `app/globals.css`: rənglər, ölçülər və mobil görünüş.
- `public/images`: saytın lokal şəkilləri.

Məhsul səhifələri `lib/content.ts` siyahısından avtomatik yaranır. Məhsul əlavə etdikdən sonra yenidən `npm run build` işlədin.

## Müraciət forması

Forma adı, əlaqə nömrəsini, məhsulu, üç şirkət nömrəsindən birini və sualı qəbul edir. Daxiletməni yoxlayır, mesaj önizləməsini göstərir və seçilmiş nömrə üçün WhatsApp keçidi yaradır. Mesaj yalnız müştəri WhatsApp-da göndərməyi tamamladıqda göndərilir. Sayt məlumatı bazada saxlamır və elektron məktub göndərmir. Heç bir API açarı tələb olunmur.

## Dillər və məzmun

Hazırkı razılaşmaya əsasən yalnız Azərbaycan dili aktivdir. Rus və ingilis tərcümələri hələ əlavə edilməyib; eyni komponentlər tərcümə lüğəti ilə istifadə oluna bilər. İşləməyən dil düymələri qoyulmayıb.

Kataloqdakı altı məhsul istiqamət üçün nümunə təqdimatdır; şirkətin tam model siyahısı deyil. Dəqiq ölçülər, qiymətlər, kilid seçimləri, hazırlanma müddətləri və sertifikat göstəriciləri təsdiqlənmədiyi üçün uydurulmayıb.

İlkin baxış versiyasında axtarış sistemlərində indeksləmə bağlıdır (`app/layout.tsx`, `robots`). Rəsmi domenə çıxarılarkən təsdiqlənmiş domen üçün canonical, sayt xəritəsi və indeksləmə əlavə olunmalıdır.

## Şəkillərin mənbələri

Loqo istifadəçinin təqdim etdiyi orijinal şəkildir; fayl dəyişdirilmədən yerləşdirilib. Kataloq və ilk slayd şəkilləri xüsusi yaradılmış məhsul illüstrasiyalarıdır, faktiki istehsal fotosu deyil. Saytda nümunə görüntü kimi qeyd olunur. Görülən işlər yalnız şirkətin açıq Instagram səhifəsindəki faktiki paylaşımlardan götürülüb; hər şəkildən orijinal paylaşımı açmaq mümkündür. `safe.ru` saytının loqosu, mətnləri və fotoları istifadə edilməyib.
