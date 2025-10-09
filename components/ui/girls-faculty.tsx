'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const members = [
    {
        name: 'Razan Abdulgalil',
        role: 'Admin Asst',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:rabdulgalil@alrasheedacademy.org',
    },
    {
        name: 'Muna Abdulla',
        role: 'Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:mabdulla@alrasheedacademy.org',
    },
    {
        name: 'Yasmeen Fadel',
        role: 'Religious Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:yasmeen_fadel@alrasheedacademy.org',
    },
    {
        name: 'Loula Ali',
        role: 'Religious Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:lali@alrasheedacademy.org',
    },
    {
        name: 'Nora Mohamed',
        role: 'Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-five.webp',
        link: 'mailto:noramohamed@alrasheedacademy.org',
    },
    {
        name: 'Hudda Al-Kalai',
        role: '4th & 5th Grade Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:halkalai@alrasheedacademy.org',
    },
    {
        name: 'Kemah Freeman',
        role: 'Social Studies Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:kfreeman@alrasheedacademy.org',
    },
    {
        name: 'Aseel Fadhil',
        role: 'Science Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:afadhil@alrasheedacademy.org',
    },
    {
        name: 'Zayba Yasin',
        role: 'Mathematics Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:zyasin@alrasheedacademy.org',
    },
    {
        name: 'Fatima Mohamed',
        role: 'Mathematics Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-five.webp',
        link: 'mailto:ffaadel@alrasheedacademy.org',
    },
    {
        name: 'Kawlah A Al-Kalai',
        role: 'ELA Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-one.webp',
        link: 'mailto:kalkalai@alrasheedacademy.org',
    },
    {
        name: 'Amira Mohamed',
        role: 'Health/Gym Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-two.webp',
        link: 'mailto:amiramohamed@alrasheedacademy.org',
    },
    {
        name: 'Asma Nashwan',
        role: 'Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-three.webp',
        link: 'mailto:anashwan@alrasheedacademy.org',
    },
    {
        name: 'Raheq Abdulla',
        role: 'Islamic Studies Teacher',
        avatar: 'https://alt.tailus.io/images/team/member-four.webp',
        link: 'mailto:Sali@alrasheedacademy.org',
    },
]

export default function GirlsFacultySection() {
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
                        <h2 className="text-3xl font-bold sm:text-4xl">Girls&apos; Section Faculty</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>Meet our dedicated faculty members for the Girls&apos; Section at Al-Rasheed Academy.</p>
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