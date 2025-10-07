import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Ticker from "../components/Ticker";
import Footer from "../components/Footer";
import React from 'react';
import { LatestNewsCard, NewsItem } from '../components/ui/card-11';

// --- MOCK DATA ---
// Sample data to showcase the component's functionality.
const sampleNewsItems: NewsItem[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    title: 'Bank Indonesia Maintains Interest Rates at 3.5%',
    date: 'June 10, 2024',
    source: 'CNN Indonesia',
    href: '#',
  },
  {
    id: 2,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1683121825174-ff1620a5e387?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2lsfGVufDB8fDB8fHww?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    title: 'Global Oil Prices Drop: Impacts on Mining Stocks',
    date: 'June 9, 2024',
    source: 'Kontan',
    href: '#',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300',
    title: 'IDX Rises 2% After First Quarter Earnings Reports',
    date: 'June 8, 2024',
    source: 'CNBC Indonesia',
    href: '#',
  },
];

/**
 * A demo page to display the LatestNewsCard component.
 */
const LatestNewsCardDemo = () => {
  return (
    <>
      <Head>
        <title>Latest News - Al-Rasheed Academy</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <NavBarOnly />
      <Ticker />

      <main className="bg-white">
        {/* News Components */}
        <div className="flex w-full items-center justify-center bg-white p-4 py-8">
          <LatestNewsCard
            title="Latest News"
            viewAllText="View all"
            viewAllHref="#"
            newsItems={sampleNewsItems}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LatestNewsCardDemo;