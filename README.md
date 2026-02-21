# KittyType

A fast, cute, and responsive typing speed test application. Developed and designed to help users track their typing speed (WPM) and accuracy with a clean, pastel-themed interface.

Developed by **codedbyelif**.

---

## English Documentation

### What is KittyType?
KittyType is a web-based typing test platform. Users can challenge themselves to type as fast and accurately as possible within a given time limit. It features a modern, pastel-pink user interface, real-time keystroke feedback, and a global leaderboard to compete with other typists.

### Features
*   **Real-time Feedback:** Instantly see correct and incorrect keystrokes as you type.
*   **Performance Metrics:** Calculates Words Per Minute (WPM), Accuracy, Correct Characters, Errors, and Adjusted WPM.
*   **Global Leaderboard:** View the fastest typists globally across different difficulty levels (powered by Supabase).
*   **User Authentication:** Secure signup and login system to track personal scores.
*   **Responsive Design:** Fully responsive layout that looks great on desktops, tablets, and mobile devices.
*   **Custom Theming:** A unique pastel pink color scheme (#FFD6EC primary) with dynamic animations and modern web design principles.

### Technologies Used
*   **Next.js:** The core React framework used for building the application, handling routing, and server-side rendering (SSR).
*   **React:** Used for building the interactive user interface and managing component state.
*   **TypeScript:** Adds static typing to JavaScript for improved code quality, maintainability, and developer experience.
*   **CSS Modules:** Scoped, modular styling to prevent CSS conflicts and manage the application's design system effectively.
*   **Supabase:** The backend-as-a-service (BaaS) used for the PostgreSQL database (leaderboard data), and user authentication.

### How to Run Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/codedbyelif/kitty-finger.git
    cd kitty-finger
    ```

2.  **Install dependencies:**
    Ensure you have Node.js installed. Then, run:
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:3000` in your web browser to see the application running.

---

## Turkce Dokumantasyon (Turkish Documentation)

### KittyType Nedir?
KittyType, web tabanli bir hizli yazma (on parmak kilavye) test platformudur. Kullanicilar, belirli bir sure icinde mumkun oldugunca hizli ve hatasiz yazarak kendilerini test edebilirler. Modern, pastel pembe temali bir kullanici arayuzu, anlik tus vurusu geri bildirimi ve diger kullanicilarla rekabet etmek icin kuresel bir liderlik tablosu sunar.

### Ozellikler
*   **Anlik Geri Bildirim:** Yazarken dogru ve yanlis yazilan tuslari aninda reklerle gorun.
*   **Performans Olcumleri:** Dakikadaki Kelime Sayisi (WPM), Dogruluk Yuzdesi, Dogru Karakterler, Hatalar ve Duzenlenmis WPM degerlerini hesaplar.
*   **Kuresel Liderlik Tablosu:** Farkli zorluk seviyelerinde dunya capindaki en hizli yazicilari gorun (Supabase altyapisi ile).
*   **Kullanici Kimlik Dogrulamasi:** Kisisel skorlari kaydetmek icin guvenli kayit olma ve giris yapma sistemi.
*   **Duyarli Tasarim (Responsive):** Masaustu, tablet ve mobil cihazlarda harika gorunen, her ekrana uyumlu yapi.
*   **Ozel Tema:** Dinamik animasyonlar ve modern web tasarimi prensipleriyle olusturulmus, on planinda pastel pembe (#FFD6EC) olan ozel bir renk paleti.

### Kullanilan Teknolojiler
*   **Next.js:** Uygulamayi insa etmek, yonlendirmeleri (routing) ve sunucu tarafli olusturmayi (SSR) yonetmek icin kullanilan temel React framework'u.
*   **React:** Etkilesimli kullanici arayuzunu olusturmak ve bilesen durumlarini (state) yonetmek icin kullanilir.
*   **TypeScript:** JavaScript'e statik tip denetimi ekleyerek kod kalitesini, bakimini ve gelistirici deneyimini artirir.
*   **CSS Modules:** CSS cakismalarini onlemek ve uygulamanin tasarim sistemini etkili bir sekilde yonetmek icin kapsamlandirilmis (scoped), moduler stillendirme.
*   **Supabase:** PostgreSQL veritabani (liderlik tablosu verileri) ve kullanici kimlik dogrulamasi (auth) icin kullanilan arka plan servisi (BaaS).

### Nasil Calistirilir (Localhost)

Bu projeyi kendi bilgisayarinizda calistirmak icin asagidaki adimlari izleyin:

1.  **Projeyi klonlayin:**
    ```bash
    git clone https://github.com/codedbyelif/kitty-finger.git
    cd kitty-finger
    ```

2.  **Baginliliklari (Dependencies) yukleyin:**
    Bilgisayarinizda Node.js yuklu oldugundan emin olun. Daha sonra terminalde su komutu calistirin:
    ```bash
    npm install
    ```

3.  **Cevre Degiskenleri (Environment Variables):**
    Ana dizinde `.env.local` adinda bir dosya olusturun ve Supabase bilgilerinizi ekleyin:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=senin_supabase_proje_urlyn
    NEXT_PUBLIC_SUPABASE_ANON_KEY=senin_supabase_anon_key_in
    ```

4.  **Gelistirme sunucusunu baslatin:**
    ```bash
    npm run dev
    ```

5.  **Tarayicida Acin:**
    Uygulamayi kullanmak icin web tarayicinizda `http://localhost:3000` adresine gidin.
