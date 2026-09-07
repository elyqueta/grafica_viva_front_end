"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PageShell from "../components/homeComponents/PageShell";
import MediaReveal from "../components/MediaReveal";

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const BLOG_HERO_VIDEO = '/videos/blog.mp4';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? BLOG_POSTS.filter((post) => post.category === activeCategory)
    : BLOG_POSTS;

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50 px-6 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [blog]
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            artigos sobre impressão, branding e digital
          </h1>
          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            partilhamos o que aprendemos no dia a dia: papel, embalagem,
            sinalética, identidade e produção gráfica.
          </p>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === null
                ? "bg-black text-white"
                : "bg-black/5 text-black/70 hover:bg-black/10"
            }`}
          >
            todos
          </button>
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {featuredPost && (
        <section className="relative w-full bg-amber-50 px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block overflow-hidden rounded-sm"
            >
              <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
                <MediaReveal
                  poster={featuredPost.image}
                  alt={featuredPost.title}
                  priority
                  videoSrc={BLOG_HERO_VIDEO}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 px-6 pb-8 lg:px-10 lg:pb-12">
                <div className="mx-auto max-w-4xl">
                  <p className="text-xs font-semibold tracking-widest text-white/70">
                    [{featuredPost.category}]
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-base text-white/80 sm:text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-white/60">{featuredPost.date}</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {remainingPosts.length > 0 && (
        <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                    <p className="text-xs font-semibold tracking-widest text-white/70">
                      [{post.category}]
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                      {post.title}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed text-black/60">
                    {post.excerpt}
                  </p>
                  <p className="mt-2 text-xs text-black/40">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
