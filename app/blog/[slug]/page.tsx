import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PageShell from '../../components/homeComponents/PageShell';
import MediaReveal from '../../components/MediaReveal';
import { BLOG_POSTS } from '../../data/blog';
import { ORCAMENTO_LINK } from '../../lib/constants';
import Link from 'next/link';
import Image from 'next/image';

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const BLOG_POST_VIDEO = '/videos/blog-individual.mp4';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: 'Artigo | Gráfica Viva',
      description: 'Artigos sobre impressão, branding e digital da Gráfica Viva.',
    };
  }

  return {
    title: `${post.title} | Gráfica Viva`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  const currentIndex = BLOG_POSTS.findIndex((item) => item.slug === slug);
  const previousPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  if (!post) {
    return (
      <PageShell footer={<Footer />}>
        <Navbar />
        <section className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              Artigo não encontrado
            </h2>
            <p className="mt-4 text-base text-black/60 sm:text-lg">
              O artigo que procura não existe ou foi removido.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Ver todos os artigos
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    (item) => item.slug !== post.slug && item.category === post.category,
  );

  const fallbackRelated = BLOG_POSTS.filter(
    (item) => item.slug !== post.slug && !relatedPosts.includes(item),
  );

  const finalRelated = relatedPosts.length > 0
    ? relatedPosts.slice(0, 3)
    : fallbackRelated.slice(0, 3);

  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
          <MediaReveal
            poster={post.image}
            alt={post.title}
            priority
            videoSrc={BLOG_POST_VIDEO}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                [{post.category}]
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mt-2 text-base text-white/70 sm:text-lg">{post.date}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-black/70 sm:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-12 space-y-8">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-black/80 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {post.gallery.length > 0 && (
        <section className="relative w-full bg-amber-50 px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-black/40">
              [galeria]
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {post.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
                >
                  <Image
                    src={src}
                    alt={post.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {finalRelated.length > 0 && (
        <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-black/40">
              [artigos relacionados]
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl">
              Continuar a ler
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {finalRelated.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                      <p className="text-xs font-semibold tracking-widest text-white/70">
                        [{related.category}]
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                        {related.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-black/60">{related.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            Já sabe do que precisa?
          </h2>
          <p className="mt-6 text-base text-black/60 sm:text-lg">
            Fale connosco e peça um orçamento para o seu próximo projecto.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ORCAMENTO_LINK}
              className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Pedir orçamento
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <div>
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 transition-colors hover:text-black"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                {previousPost.title}
              </Link>
            ) : (
              <span className="text-sm text-black/30">                Artigo anterior</span>
            )}
          </div>
          <div>
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 transition-colors hover:text-black"
              >
                {nextPost.title}
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              </Link>
            ) : (
              <span className="text-sm text-black/30">                Artigo seguinte</span>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
