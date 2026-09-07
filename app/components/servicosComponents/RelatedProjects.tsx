import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioCard } from '../../data/portfolio';

type RelatedProjectsProps = {
  projects: PortfolioCard[];
  asDetailLinks?: boolean;
};

/**
 * Prova visual por serviço: nada, uma imagem de destaque, ou uma pequena
 * galeria, consoante quantos projectos reais têm serviceId a apontar para
 * este serviço. Nunca lista todos os projectos, apenas reforça confiança.
 */
export default function RelatedProjects({ projects, asDetailLinks = false }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  const href = (project: PortfolioCard) =>
    asDetailLinks ? `/portfolio/${project.slug}` : '/portfolio';

  if (projects.length === 1) {
    const project = projects[0];
    return (
      <Link
        href={href(project)}
        className="group relative mt-3 block h-40 w-full overflow-hidden rounded-sm sm:h-48"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 32vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        <p className="absolute bottom-3 left-3 text-xs font-medium text-white">
          {project.client}
        </p>
      </Link>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {projects.slice(0, 3).map((project) => (
        <Link
          key={project.slug}
          href={href(project)}
          className="group relative block aspect-square overflow-hidden rounded-sm"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        </Link>
      ))}
    </div>
  );
}