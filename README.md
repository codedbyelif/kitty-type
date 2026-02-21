<div align="center">
  <img src="public/Adsız%20tasarım%20kopyası.png" alt="KittyType Logo" width="150" />
  <h1>KittyType</h1>
  <h3>The Cutest Typing Speed Test on the Internet</h3>
  <p>
    <em>A pastel-pink, Hello Kitty inspired web application to test your typing skills.</em>
  </p>
  <p>
    <strong>Developed by codedbyelif</strong>
  </p>
</div>

---

## (づ｡◕‿‿◕｡)づ English Documentation

### About KittyType
Welcome to **KittyType**! This is a web-based typing test platform designed with a soft, pastel-pink (#FFD6EC) aesthetic inspired by adorable Kitty themes. It allows users to challenge their typing speed and accuracy in a relaxing yet competitive environment. With real-time keystroke feedback, personalized accounts, and a global leaderboard, you can train your paws to type faster than ever before.

### Features
- **Real-Time Visual Feedback:** Watch your text turn soft green for correct inputs and dark pink for errors as you type.
- **Detailed Analytics:** Calculates your Words Per Minute (WPM), Accuracy Percentage, Correct Characters, Total Errors, and Adjusted WPM instantly after the test.
- **Global Leaderboard:** Driven by Supabase, the leaderboard showcases the fastest typists across multiple difficulty levels (All, Easy, Medium, Hard).
- **User Authentication:** Secure email and password signup system to track your personal typing history.
- **Cute Aesthetic:** A fully custom CSS-driven UI featuring cloud-like gradients, bouncy hover animations, and an adorable Kitty mascot.

### Project Structure
Below is a high-level overview of the KittyType project directory structure:

```text
kitty-finger/
├── public/                     # Static assets (images, icons)
│   ├── Adsız tasarım kopyası.png # Custom Kitty Logo
│   ├── askım.jpg                 # Fallback results image (< 85 WPM)
│   └── iiiiii.jpeg               # Pro results image (>= 85 WPM)
├── src/                        # Main application source code
│   ├── app/                    # Next.js App Router directories
│   │   ├── auth/               # Login and Signup pages
│   │   ├── globals.css         # Pastel pink theme variables
│   │   ├── layout.tsx          # Root layout provider
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable React components
│   │   ├── Footer.tsx          # Wavy pastel footer
│   │   ├── Hero.tsx            # Main call to action
│   │   ├── KittyLogo.tsx       # Logo container component
│   │   ├── Leaderboard.tsx     # Supabase-connected scorings
│   │   ├── Navbar.tsx          # Navigation with cute dropdowns
│   │   ├── Results.tsx         # WPM calculations & dynamic kitty images
│   │   └── TypingTest.tsx      # Core typing test logic
│   ├── context/                # Global React Contexts (AuthContext)
│   ├── data/                   # Static data (words list)
│   └── lib/                    # Utility scripts & Configuration
│       ├── db.ts               # Database helpers
│       └── supabase/           # Supabase client instantiation
└── supabase/                   # Database configurations
    └── migrations/             # SQL files for Leaderboard & Auth schema
```

### Technologies Used
- **Next.js (App Router):** The core React framework for routing and server-side logic.
- **React 18:** For building interactive components and managing local states.
- **TypeScript:** Ensuring strict type safety and a better developer experience.
- **CSS Modules:** Scoped, modular, and customized vanilla CSS styling for the unique Hello Kitty aesthetic without relying on external UI libraries.
- **Supabase:** The open-source Firebase alternative powering PostgreSQL databases and Authentication operations.

### How to Run Locally

If you want to run KittyType on your own local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codedbyelif/kitty-finger.git
   cd kitty-finger
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory. You will need your own Supabase project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Start Typing:**
   Open your browser and navigate to `http://localhost:3000` to begin your KittyType experience.

---

## (づ｡◕‿‿◕｡)づ Turkce Dokumantasyon (Turkish Documentation)

### KittyType Nedir?
**KittyType**'a hos geldiniz! Bu proje, Hello Kitty temalarindan ilham alinarak tasarlanmis yumusak, pastel pembe (#FFD6EC) estetik cizgilerine sahip web tabanli bir hizli yazma (on parmak kilavye) test platformudur. Kullanicilarin hem rahatlatici hem de rekabetci bir ortamda yazma hizlarini ve dogruluk oranlarini test etmelerini saglar. Anlik tus vurusu geri bildirimleri, kisisel hesaplar ve kuresel liderlik tablosu sayesinde patilerinizi her zamankinden daha hizli yazmak icin egitibilirsiniz.

### Ozellikler
- **Anlik Gorsel Geri Bildirim:** Yazarken dogru bastiginiz kelimelerin yumusak bir yesile, yanlis bastiginiz harflerin ise koyu pembeye donusmesini aninda izleyin.
- **Detayli Analizler:** Testin hemen ardindan Dakikadaki Kelime Sayiniz (WPM), Dogruluk Yuzdeniz, Dogru Karakterleriniz, Toplam Hata Sayiniz ve Duzenlenmis WPM degeriniz otomatik olarak hesaplanir.
- **Kuresel Liderlik Tablosu:** Supabase destekli bu tablo, tum zorluk seviyelerinde (Tumu, Kolay, Orta, Zor) dunya capindaki en hizli kullanicilari listeler.
- **Kullanici Kimlik Dogrulamasi:** Kendi kisisel rekorlarinizi takip edebilmeniz adina guvenli e-posta ve sifre kayit sistemi icerir.
- **Sirin Estetik Yapi:** Bulutlari andiran renk gecisleri, zıplayan (bounce) baglanti animasyonlari ve sevimli Kedi maskotu ile tamamen CSS kullanilarak ozellestirilmis arayuz.

### Proje Dosya Yapisi (Project Structure)
KittyType proje yapisinin genel bir ozeti asagidaki gibidir:

```text
kitty-finger/
├── public/                     # Statik dosyalar (Gorseller, iconlar)
│   ├── Adsız tasarım kopyası.png # Ozel Kedi Logosu
│   ├── askım.jpg                 # 85 WPM alti icin cikan sonuc fotografi
│   └── iiiiii.jpeg               # 85 WPM uzeri basarilar icin cikan sonuc fotografi
├── src/                        # Ana uygulama kodari
│   ├── app/                    # Next.js App Router yapisi
│   │   ├── auth/               # Giris yapma ve Kayit olma sayfalari
│   │   ├── globals.css         # Pastel pembe tema degiskenleri (variables)
│   │   ├── layout.tsx          # Ana sayfa duzeni
│   │   └── page.tsx            # Acilis (Landing) sayfasi
│   ├── components/             # Tekrar kullanilabilir React bilesenleri
│   │   ├── Footer.tsx          # Dalgalari olan pastel alt bilgi kismi
│   │   ├── Hero.tsx            # Ana yazi ve karsilama ekrani
│   │   ├── KittyLogo.tsx       # Logo gosterici bilesen
│   │   ├── Leaderboard.tsx     # Supabase ile calisan liderlik tablosu
│   │   ├── Navbar.tsx          # Tatli acilir menuye sahip navigasyon
│   │   ├── Results.tsx         # WPM hesaplama ve duruma gore degisen kedi resimleri
│   │   └── TypingTest.tsx      # Klavye hiz testinin ana mantigi
│   ├── context/                # Global React Context dosyalari (AuthContext)
│   ├── data/                   # Sabit veriler (Ingilizce kelime listesi)
│   └── lib/                    # Yardimci komut dizileri & Konfigurasyonlar
│       ├── db.ts               # Veritabani yardimcilari
│       └── supabase/           # Supabase istemci (client) baglantisi
└── supabase/                   # Veritabani ayarlari
    └── migrations/             # Liderlik tablosu ve Kullanici veritabani SQL sablonlari
```

### Kullanilan Teknolojiler
- **Next.js (App Router):** Yonlendirmeler (routing) ve sunucu tarafli islemler icin temel React framework'u.
- **React 18:** Etkilesimli bilesenler (components) olusturmak ve durum (state) yonetimi saglamak icin kullanildi.
- **TypeScript:** Kati tip guvenligi (type safety) ve cok daha iyi bir kod yazma deneyimi sunmasi icin eklendi.
- **CSS Modules:** Disaridaki UI kutuphanelerine bagli kalmadan saf CSS (Vanilla) kodlariyla sadece bu projeye ozel yazilmis, cakisma yapmayan moduler yapilar kullanildi. Tum Hello Kitty tasarimi buradan gelir.
- **Supabase:** PostgreSQL veritabanini ve kullanici kimlik dogrulama (Auth) islemlerini yoneten acik kaynakli, hizli bir arka plan (BaaS) servisi.

### Kendi Bilgisayarinda Nasil Calistirilir (Localhost)

Eger KittyType testini kendi cihazinizda baslatmak isterseniz su adimlari uygulayin:

1. **Projeyi klonlayin:**
   ```bash
   git clone https://github.com/codedbyelif/kitty-finger.git
   cd kitty-finger
   ```

2. **Gerekli paketleri yukleyin:**
   Bilgisayarinizda Node.js bulundugundan emin olun ve ardindan terminale sunu yazin:
   ```bash
   npm install
   ```

3. **Cevre Degiskenlerini Ayarlayin:**
   Proje ana klasorune `.env.local` isminde bir dosya olusturun. Kenidi Supabase proje bilgilerinizi girin:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=senin_supabase_proje_urlyn
   NEXT_PUBLIC_SUPABASE_ANON_KEY=senin_supabase_anon_key_in
   ```

4. **Gelistirme (Dev) sunucusunu calistirin:**
   ```bash
   npm run dev
   ```

5. **Klavyenizle Tanisin:**
   Uygulamamizi gormek ve hemen yazmaya baslamak icin tarayicinizdan `http://localhost:3000` adresini ziyaret edin.
