import Head from "next/head";
import NavBarOnly from "../components/NavBarOnly";
import Footer from "../components/Footer";
import Ticker from "../components/Ticker";
import { CalendarDemo } from "../components/ui/calendar-demo";

export default function Calendar() {
  return (
    <>
      <Head>
        <title>Calendar - Al-Rasheed Academy</title>
      </Head>

      <NavBarOnly />
      <Ticker />
      
      <main className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32 mr-4 flex-shrink-0">
              <img src="https://www.alrasheedacademy.org/images/Untitled-1.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-2.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/qqdd.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/48999.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/1333.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-13.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-12.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-6.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/qqq.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-9.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/7788.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-11.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-10.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/Untitled-1qwe.png" alt="" className="absolute w-full h-full object-contain" />
              <img src="https://www.alrasheedacademy.org/images/qw.png" alt="" className="absolute w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Calendar</h1>
              <p className="text-gray-600">Al-Rasheed Academy - K12 Schools</p>
            </div>
          </div>
        </div>
        <CalendarDemo />
      </main>

      <Footer />
    </>
  );
}