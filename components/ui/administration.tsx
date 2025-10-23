import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AdministrationSection() {
    const [banner, setBanner] = useState({ backgroundImage: '/assets/hall.jpg', title: 'General Administration', breadcrumb: 'Home › Administration' })
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true
        const fetchCms = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/auth/cms/administration')
                if (!mounted) return
                if (res.ok) {
                    const json = await res.json()
                    if (json.banner) setBanner(prev => ({ ...prev, ...json.banner }))
                    if (Array.isArray(json.members)) setMembers(json.members)
                } else if (res.status === 404) {
                    // keep defaults
                } else {
                    console.error('Failed to fetch administration cms', res.status)
                }
            } catch (err) {
                console.error('Error fetching administration cms', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchCms()
        return () => { mounted = false }
    }, [])

    const displayMembers = loading ? [] : (members.length ? members : [
        { name: 'Anwar Al-Kalai', role: 'School Principal', avatar: 'https://www.alrasheedacademy.org/Admin/images/26a478f08fa3204098346fcbcdbfc2831758763720jpeg', link: '#' },
        { name: 'Ahmed Nada', role: 'Academic Director', avatar: 'https://www.alrasheedacademy.org/Admin/images/289648f191687d568b74a00ccd76f3771758763603.png', link: '#' },
        { name: 'Abdullah Mardaie', role: 'Office Manager', avatar: 'https://alt.tailus.io/images/team/member-three.webp', link: '#' },
    ])

    return (
        <>
        {/* Banner Section */}
        <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url('${banner.backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 text-center text-white">
                <h1 className="text-5xl font-light tracking-wide">{banner.title}</h1>
                <p className="mt-4 text-sm">{banner.breadcrumb}</p>
            </div>
        </div>
        
        <section className="py-4 md:py-8">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {displayMembers.map((member, index) => (
                            <div key={index} className="group overflow-hidden">
                                <img className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 hover:grayscale group-hover:h-[22.5rem] group-hover:rounded-xl" src={member.avatar} alt="administration member" width="826" height="1239" />
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                                        <span className="text-xs">_0{index + 1}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{member.role}</span>
                                        <Link href={member.link} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-flex items-center gap-1 translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                            LinkedIn
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}