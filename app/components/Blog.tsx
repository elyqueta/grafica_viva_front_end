'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

const POSTS: Post[] = [
  {
    slug: 'papel-certo-para-a-tua-marca',
    title: 'como escolher o papel certo para a tua marca',
    excerpt:
      'a textura e a gramagem do papel comunicam tanto quanto o design. um guia prático para não errar na escolha.',
    date: 'jan 2026',
  },
  {
    slug: 'embalagem-sustentavel-2026',
    title: 'tendências de embalagem sustentável em 2026',
    excerpt:
      'materiais reciclados, menos tinta, mais impacto. o que estamos a ver mudar na produção de embalagens.',
    date: 'fev 2026',
  },
  {
    slug: 'sinaletica-que-vende',
    title: 'sinalética que vende: o que aprendemos em 50 projetos',
    excerpt:
      'nem sempre o maior letreiro é o mais eficaz. partilhamos os padrões que realmente funcionam.',
    date: 'mar 2026',
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-blog-reveal]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div data-blog-reveal className="text-center">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [blog]
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
            do que estamos a falar
          </h2>
        </div>

        <div className="mt-16 divide-y divide-black/10 border-y border-black/10">
          {POSTS.map((post, index) => {
            const isActive = index === activeIndex;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-blog-reveal
                onMouseEnter={() => setActiveIndex(index)}
                className="block py-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-black/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className={`text-xl font-semibold transition-colors duration-300 sm:text-2xl ${
                      isActive ? 'text-black' : 'text-black/35'
                    }`}
                  >
                    {post.title}
                  </h3>
                </div>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isActive
                      ? 'mt-3 grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden pl-8">
                    <p className="text-sm text-black/60 sm:text-base">
                      {post.excerpt}
                    </p>
                    <p className="mt-2 text-xs text-black/40">{post.date}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div data-blog-reveal className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-5 py-2.5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            ver todos os artigos
          </Link>
        </div>
      </div>
    </section>
  );
}
