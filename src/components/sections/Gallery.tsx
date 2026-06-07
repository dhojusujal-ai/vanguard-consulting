"use client";

import { Camera, ChevronLeft, ChevronRight, Images, PlayCircle, X } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { galleryItems as defaultGalleryItems, pageSections } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryItem, PageSectionContent } from "@/types";

const galleryIcons = [Images, Camera, PlayCircle];

function imageBackground(value: string) {
  return `url("${value.replace(/"/g, '\\"')}")`;
}

function getGalleryPhotos(item: GalleryItem) {
  const photos = item.photos?.filter(Boolean) ?? [];

  if (photos.length > 0) {
    return photos;
  }

  return [item.image ?? item.photo ?? "/counselling-people.svg"];
}

export function Gallery({
  items = defaultGalleryItems,
  content = pageSections,
}: {
  items?: GalleryItem[];
  content?: PageSectionContent;
}) {
  const displayItems = items.filter((item) => item.status !== "Draft");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const activeGallery =
    activeGalleryIndex === null ? null : displayItems[activeGalleryIndex] ?? null;
  const activePhotos = activeGallery ? getGalleryPhotos(activeGallery) : [];

  const openGallery = (index: number) => {
    setActiveGalleryIndex(index);
    setActivePhotoIndex(0);
  };

  const showPreviousPhoto = () => {
    setActivePhotoIndex((index) =>
      activePhotos.length > 0
        ? (index - 1 + activePhotos.length) % activePhotos.length
        : index,
    );
  };

  const showNextPhoto = () => {
    setActivePhotoIndex((index) =>
      activePhotos.length > 0 ? (index + 1) % activePhotos.length : index,
    );
  };

  return (
    <section id="gallery" className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.galleryEyebrow}
          title={content.galleryTitle}
          description={content.galleryDescription}
        />

        <div className="mt-14 grid auto-rows-[minmax(31rem,1fr)] items-stretch gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {displayItems.map((item, index) => {
            const Icon = galleryIcons[index] ?? Images;
            const photos = getGalleryPhotos(item);

            return (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => openGallery(index)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-white/70 text-left shadow-[0_18px_55px_rgba(8,32,70,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#087ec3]/35 hover:shadow-[0_24px_70px_rgba(8,32,70,0.13)]"
                >
                  <div
                    role="img"
                    aria-label={item.title}
                    className="relative h-72 shrink-0 overflow-hidden bg-white bg-cover bg-center transition duration-500 group-hover:scale-[1.02] md:h-80 xl:h-[22rem]"
                    style={{ backgroundImage: imageBackground(photos[0]) }}
                  >
                    <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-xl bg-white/86 text-[#087ec3] shadow-[0_14px_40px_rgba(8,32,70,0.14)] backdrop-blur-xl">
                      <Icon size={21} />
                    </span>
                    <span className="absolute bottom-4 right-4 rounded-full bg-slate-950/78 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                      View {photos.length} photos
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      <span>{photos.length} photos</span>
                      <span>{item.format}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.description ?? "Published gallery media from Vanguard."}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {activeGallery ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/82 px-4 py-6 backdrop-blur-md">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/15 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 md:px-5">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-950">
                  {activeGallery.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {activePhotoIndex + 1} of {activePhotos.length}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close gallery"
                onClick={() => setActiveGalleryIndex(null)}
                className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative bg-slate-950">
              <div
                role="img"
                aria-label={`${activeGallery.title} photo ${activePhotoIndex + 1}`}
                className="h-[58vh] min-h-80 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: imageBackground(activePhotos[activePhotoIndex]) }}
              />
              {activePhotos.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={showPreviousPhoto}
                    className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-[#087ec3] hover:text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={showNextPhoto}
                    className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-[#087ec3] hover:text-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              ) : null}
            </div>

            {activePhotos.length > 1 ? (
              <div className="flex gap-3 overflow-x-auto bg-slate-50 p-4">
                {activePhotos.map((photo, index) => (
                  <button
                    key={`${photo}-${index}`}
                    type="button"
                    aria-label={`Show photo ${index + 1}`}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`h-20 w-28 shrink-0 rounded-lg border bg-cover bg-center transition ${
                      activePhotoIndex === index
                        ? "border-[#087ec3] ring-2 ring-[#087ec3]/30"
                        : "border-slate-200 opacity-72 hover:opacity-100"
                    }`}
                    style={{ backgroundImage: imageBackground(photo) }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
