'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const members = [
    {
        name: 'Abdullah M Mardaie',
        role: 'Administrator',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:amardaie@alrasheedacademy.org',
    },
    {
        name: 'Walid Al Salahi',
        role: 'Quran Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:aibrahim@alrasheedacademy.org',
    },
    {
        name: 'Abdo M Fadhel',
        role: 'Islamic Studies Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:afadhel@alrasheedacademy.org',
    },
    {
        name: 'Mohamed A Mohamed',
        role: 'Arabic Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:mmohamed@alrasheedacademy.org',
    },
    {
        name: 'Yousif Ahmed',
        role: 'Religious Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-five.webp',
        link: 'mailto:yousifahmed@alrasheedacademy.org',
    },
    {
        name: 'Yousif Fadhel',
        role: 'Religious Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:yfadhel@alrasheedacademy.org',
    },
    {
        name: 'Mohamed Al-Kalai',
        role: 'GYM & Health Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:maalkalai@alrasheedacademy.org',
    },
    {
        name: 'Rathwan G Ali',
        role: 'ELA Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:rali@alrasheedacademy.org',
    },
    {
        name: 'Magdi Ahmed',
        role: 'Social Studies Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:mahmed@alrasheedacademy.org',
    },
    {
        name: 'Nieal Alwan',
        role: 'Science Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-five.webp',
        link: 'mailto:nalwan@alrasheedacademy.org',
    },
    {
        name: 'Hisham khelly',
        role: 'Mathematics Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:hkhelly@alrasheedacademy.org',
    },
    {
        name: 'Ahmed Mohamed',
        role: 'Health/Gym Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:amohamed@alrasheedacademy.org',
    },
    {
        name: 'Mohammad A Rahman',
        role: 'Support Staff',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:mrahman@alrasheedacademy.org',
    },
]

export default function BoysFacultySection() {
    return (
        <section className="bg-gray-50 py-4 md:py-8 dark:bg-transparent">
            <div className="mx-auto max-w-5xl border-t px-6">

                <motion.div
                    className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="sm:w-2/5">
                        <h2 className="text-3xl font-bold sm:text-4xl">Boys&apos; Section Faculty</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>Meet our dedicated faculty members for the Boys&apos; Section at Al-Rasheed Academy.</p>
                    </div>
                </motion.div>
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((member, index) => {
                            const directions = [
                                { x: -100, y: 0 },
                                { x: 0, y: -100 },
                                { x: 100, y: 0 }
                            ]
                            const direction = directions[index % 3]
                            
                            return (
                                <motion.div
                                    key={index}
                                    className="group overflow-hidden"
                                    initial={{ opacity: 0, x: direction.x, y: direction.y }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <img className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 hover:grayscale group-hover:h-[22.5rem] group-hover:rounded-xl" src={member.avatar} alt="faculty member" width="826" height="1239" />
                                    <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                        <motion.div
                                            className="flex justify-between"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, amount: 0.3 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                                            <span className="text-xs">_0{index + 1}</span>
                                        </motion.div>
                                        <div className="mt-1 flex items-center justify-between">
                                            <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{member.role}</span>
                                            <Link href={member.link} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-flex items-center gap-1 translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}