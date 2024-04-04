import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

window.Webflow ||= []
window.Webflow.push(() => {

    /**
     * Hero
     */
    const herotext = document.querySelector('.hero_text')
    const heroSecondText = document.querySelector('.hero_second-text')

    // Resize min height
    const heroTextHeight = {
        text: herotext.getBoundingClientRect().height,
        secondtext: heroSecondText.getBoundingClientRect().height
    }

    window.addEventListener('resize', () => {
        heroTextHeight.text = herotext.getBoundingClientRect().height
        heroTextHeight.secondtext = heroSecondText.getBoundingClientRect().height

        resizeHeroContent()
    })

    const resizeHeroContent = () => {
        document.querySelector('.hero_center').style.minHeight = `${Math.max(heroTextHeight.text, heroTextHeight.secondtext)}px`
    }
    resizeHeroContent()

    // Animate on load
    let titleSplit = new SplitType('.hero_text h1', { types: 'chars,lines' })
    let subtitleSplit = new SplitType('.hero_text p', { types: 'lines' })
    let secondTitleSplit = new SplitType('.hero_second-text h2', { types: 'chars,lines' })
    let secondSubtitleSplit = new SplitType('.hero_second-text p', { types: 'lines' })

    let heroTimeline = gsap.timeline()
    heroTimeline
        .from('.hero_video video', {
            opacity: 0,
            width: '50%',
            height: '50%',
            borderRadius: '4rem',
            duration: 2,
            ease: 'slow'
        })
        .from('.nav_fixed', {
            opacity: 0,
            y: '-100%',
            duration: 2,
            delay: 0.5,
            ease: 'power1.out'
        }, '<')
        .from('h1 .char', {
            opacity: 0,
            duration: 2,
            delay: 0.5,
            stagger: { each: 0.05, from: 'start', ease: 'slow' }
        }, '<')
        .from('.section_hero p .line', {
            opacity: 0,
            y: '10%',
            duration: 1.2,
            // ease: 'power1.out',
            delay: 1,
            stagger: { each: 0.2, from: 'start' }
        }, '<')

    // Animate on scroll
    let heroScroll = {
        trigger: '.section_hero',
        start: 'top top',
        end: 'bottom center',
        scrub: 0.5
    }

    gsap.to('html', { '--hero-radius': '2rem', scrollTrigger: heroScroll, ease: 'slow' })
    gsap.to('.hero_overlay', { opacity: 0.95, scrollTrigger: heroScroll, ease: 'slow' })
    gsap.to('.hero_scale', { scale: 1, scrollTrigger: heroScroll, ease: 'slow' })
    gsap.to('.hero_text', { yPercent: -100, scrollTrigger: heroScroll, ease: 'slow' })
    gsap.from('.hero_second-text', { yPercent: 50, scrollTrigger: heroScroll, ease: 'slow' })

    gsap.from('[data-x]', {
        scrollTrigger: heroScroll,
        x: (i, el) => el.getAttribute('data-x'),
        ease: 'slow'
    })
    gsap.from('[data-y]', {
        scrollTrigger: heroScroll,
        y: (i, el) => el.getAttribute('data-y'),
        ease: 'slow'
    })
    gsap.from('[data-xy]', {
        scrollTrigger: heroScroll,
        x: (i, el) => el.getAttribute('data-xy').split(',')[0],
        y: (i, el) => el.getAttribute('data-xy').split(',')[1],
        ease: 'slow'
    })

    // Change hero text
    let textTimeline = gsap.timeline()
    textTimeline
        .to('.hero_text', { opacity: 0 })
        .to('.hero_second-text h2', { opacity: 1 })
        .to('.hero_second-text p', { opacity: 1 })
        .paused(true)

    ScrollTrigger.create({
        trigger: '.section_hero',
        start: 'center center',
        end: 'center +=20%',
        scrub: 1,
        animation: textTimeline
    })

    /**
     * Box sections
     */
    const boxSections = document.querySelectorAll('.section_box')
    boxSections.forEach(box => {
        let wrapper = box.querySelector('.box_wrapper')
        let background = box.querySelector('.box_background')
        let content = box.querySelector('.box_content')

        let boxTimeline = gsap.timeline({ scrollTrigger: box })
        boxTimeline
            .from(wrapper, { scale: 0.5, borderRadius: '6rem' })
            .from(background, { width: '0%', height: '50%', duration: 2 })
            .from(content, { y: 100, opacity: 0, duration: 1.5, delay: 1.5 }, '<')
            .to(wrapper, { scale: 1, borderRadius: '2rem', duration: 2 })
    })

    /**
     * Parallax
     */
    const parallaxElements = document.querySelectorAll('[data-parallax = true]')
    parallaxElements.forEach(parallaxWrapper => {
        const parallax = parallaxWrapper.querySelector('video') || parallaxWrapper.querySelector('img')

        if (parallax) {
            const heightDiff = parallax.offsetHeight - parallaxWrapper.offsetHeight

            let parallaxTimeline = gsap.timeline()
            parallaxTimeline
                .from(parallax, { y: -heightDiff * 0.5 })
                .to(parallax, { y: heightDiff * 0.5 })
                .paused(true)

            ScrollTrigger.create({
                trigger: parallaxWrapper,
                start: "top center",
                scrub: 1.5,
                animation: parallaxTimeline
            })
        }
    })

    /**
     * CTA reveal
     */
    let studyTimeline = gsap.timeline({
        scrollTrigger: '.section_study'
    })
    studyTimeline
        .from('.study_image', { width: 0, duration: 1 })
        .from('.study_cta', { opacity: 0, y: 20, duration: 1 })
        .to('.study_image', { width: '100%', duration: 1, ease: 'power4.out' })
        .to('.study_cta', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: { each: 0.5, from: 'end' }
        })

    /**
     * Footer Parallax
     */
    let footerParallax = gsap.from('.footer', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top-=60% top',
            end: 'center center',
            scrub: 1.5
        },
        yPercent: -50
    })
})