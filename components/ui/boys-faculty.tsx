'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export default function BoysFacultySection() {
    const [banner, setBanner] = useState({ backgroundImage: '/assets/hall.jpg', title: 'Boys\' Section Faculty', breadcrumb: 'Home › Boys Faculty' })
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        const fetchCms = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/auth/cms/boys-faculty')
                if (!mounted) return
                if (res.ok) {
                    const json = await res.json()
                    if (json.banner) setBanner(prev => ({ ...prev, ...json.banner }))
                    if (Array.isArray(json.members)) setMembers(json.members)
                } else if (res.status === 404) {
                    // keep defaults
                } else {
                    console.error('Failed to fetch boys faculty cms', res.status)
                }
            } catch (err) {
                console.error('Error fetching boys faculty cms', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCms()
        return () => { mounted = false }
    }, [])

    const displayMembers = loading ? [] : (members.length ? members : [
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
    ])

    return (
        <>
        {/* Banner Section */}
        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                    backgroundImage: `url('${banner.backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    inset: 0
                }}
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center text-white">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    style={{ fontSize: "3rem", fontWeight: 300, letterSpacing: "0.1em" }}
                >
                    {banner.title}
                </motion.h1>
                <motion.p
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    style={{ marginTop: "1rem", fontSize: "0.875rem" }}
                >
                    {banner.breadcrumb}
                </motion.p>
            </div>
        </div>
        
        <section className="py-4 md:py-8">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {displayMembers.map((member, index) => {
                            const directions = [
                                { x: -100, y: 0 },
                                { x: 0, y: -100 },
                                { x: 100, y: 0 }
                            ]
                            const direction = directions[index % 3]
                            
                            return (
                                <motion.div
                                    key={index}
                                    style={{ overflow: "hidden" }}
                                    initial={{ opacity: 0, x: direction.x, y: direction.y }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <div className="group overflow-hidden">
                                        <img className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 hover:grayscale group-hover:h-[22.5rem] group-hover:rounded-xl" src={member.avatar} alt="faculty member" width="826" height="1239" />
                                        <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                            <motion.div
                                                style={{ display: "flex", justifyContent: "space-between" }}
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
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}