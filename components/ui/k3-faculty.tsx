import Link from 'next/link'
import { motion } from 'framer-motion'

const members = [
    {
        name: 'Kafaih Abdallah',
        role: 'Admin Asst',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:kabdallah@alrasheedacademy.org',
    },
    {
        name: 'Fatima Faadel',
        role: 'Quran Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:ffaadel@alrasheedacademy.org',
    },
    {
        name: 'Nusrah Ali',
        role: 'Religious Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:nali@alrasheedacademy.org',
    },
    {
        name: 'Ammarah Gaber',
        role: '1st Grade Homeroom Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:agaber@alrasheedacademy.org',
    },
    {
        name: 'Asma Zaied',
        role: '1st Grade Homeroom Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-five.webp',
        link: 'mailto:azaied@alrasheedacademy.org',
    },
    {
        name: 'Sumaya Nasser',
        role: '2nd Grade Homeroom Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:snasser@alrasheedacademy.org',
    },
    {
        name: 'Alaa Abadi',
        role: '2nd Grade Homeroom Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:aabadi@alrasheedacademy.org',
    },
    {
        name: 'Ayih Elbaneh',
        role: '3rd Grade Homeroom Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:aelbaneh@alrasheedacademy.org',
    },
    {
        name: 'Nathar Eloudi',
        role: '3rd Grade Homeroom Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:neloudi@alrasheedacademy.org',
    },
]

export default function K3FacultySection() {
    return (
        <>
        {/* Banner Section */}
        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('/assets/hall.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center text-white">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-5xl font-light tracking-wide"
                >
                    K-3 Section Faculty
                </motion.h1>
                <motion.p
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="mt-4 text-sm"
                >
                    Home › K-3 Faculty
                </motion.p>
            </div>
        </div>
        
        <section className="py-4 md:py-8">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((member, index) => (
                            <motion.div 
                                key={index} 
                                className="group overflow-hidden"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
                            >
                                <img className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 hover:grayscale group-hover:h-[22.5rem] group-hover:rounded-xl" src={member.avatar} alt="faculty member" width="826" height="1239" />
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between overflow-visible">
                                        <motion.h3 
                                            className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider"
                                            initial={{ opacity: 0, y: -200 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            transition={{ duration: 0.5, delay: 0.25 + index * 0.06, ease: "easeOut" }}
                                        >
                                            {member.name}
                                        </motion.h3>
                                        <motion.span 
                                            className="text-xs"
                                            initial={{ opacity: 0, y: -200 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, amount: 0.2 }}
                                            transition={{ duration: 0.5, delay: 0.3 + index * 0.06, ease: "easeOut" }}
                                        >
                                            _0{index + 1}
                                        </motion.span>
                                    </div>
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
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}