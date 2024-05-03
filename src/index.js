import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const isHome = window.location.pathname === '/'

window.Webflow ||= []
window.Webflow.push(() => {
    // wait until window, stylesheets, images, links, and other media assets are loaded
    window.onload = function () {
        document.querySelector('.page-wrapper').classList.add('loaded')
    }

    if (isHome) {
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
        let secondTitleSplit = new SplitType('.hero_second-text h2', { types: 'chars,lines' })

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
            .from('.section_hero p', {
                opacity: 0,
                y: '10%',
                duration: 1.2,
                delay: 1
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
    }

    /**
     * Parallax
     */
    const parallaxElements = document.querySelectorAll('[data-parallax = true]')
    if (parallaxElements) {
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
    }

    /**
     * Page transition
     */
    const menuLinks = document.querySelectorAll('.nav_container a')
    let loadOutTimeline = gsap.timeline()

    const loadOut = () => {
        loadOutTimeline
            .to('.main-wrapper', {
                opacity: 0,
                y: 100,
                duration: 0.5,
                ease: 'slow'
            })
            .to('.nav_fixed', {
                opacity: 0,
                duration: 0.5,
                ease: 'power1.out'
            }, '<')
    }

    menuLinks.forEach(link => {
        const linkUrl = new URL(link, window.location.href)
        const currentUrl = new URL(window.location.href)
        const isAnchor = linkUrl.pathname === currentUrl.pathname && linkUrl.hash

        if (!isAnchor) {
            link.addEventListener('click', function (e) {
                e.preventDefault() // Prevent default anchor behavior
                var goTo = this.getAttribute('href') // Store anchor href
                loadOut()

                setTimeout(function () {
                    window.location = goTo
                }, 500); // The duration of the "load out" animation in milliseconds
            })
        }
    })
})