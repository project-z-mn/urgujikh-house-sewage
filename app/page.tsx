import Link from "next/link";
import Image from "next/image";
const CARDS = [
  {
    title: "Шингэн хог хаягдалын үйлчилгээ",
    desc:
      "Бүх төрлийн бетон зуурмагийг миксерээр баттай нийлүүлэх менежмент, үнэ, боломжийн нөхцөлтэй бетон зуурмаг гаргах боломжтой.",
    href: "/business/sewage transport",
    image: "/images/sewage.jpg",
  },
  {
    title: "Тээвэрлэх үйлчилгээ",
    desc:
      "Бетон шахуургын төхөөрөмж, бетон насос, миксер автоматын бетон зуурмаг түгэлт болон автомашин түрээсийн үйлчилгээ.",
    href: "/business/truck1",
    image: "/images/truck1.jpg",
  },
  {
    title: "Хамтран ажилласан",
    desc:
      "Манай улсын хэмжээнд томоохон төсөл хөтөлбөрүүдтэй хамтран хэрэгжүүлж байсан богино танилцуулга.",
    href: "/partner",
    image: "/images/card-project.jpg",
  },
];
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#eaeaea] font-sans text-gray-900">
    {/* ================= NEW HERO ================= */}
      <section className="bg-[#faf7f2] px-6 py-20">
    <div className="mx-auto max-w-7xl grid items-center gap-12 md:grid-cols-2">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black shadow">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green text-white">
          </span>
          Найдвартай үйлчилгээ
        </div>
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
         Найдвартай бохир ус <br />
          соруулах, тээвэрлэх <br />
          үйлчилгээ
       </h1>
        <p className="mt-5 max-w-xl text-gray-600">
          Өргөжих Хаус ХХК нь бохир ус соруулах, тээвэрлэх, цэвэрлэх
         үйлчилгээг түргэн шуурхай, баталгаатайгаар үзүүлдэг.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
         <Link
          href="/contact"
          className="rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:bg-gray-800"
        >
          Үнийн санал авах
        </Link>
        <a
          href="tel:99196855"
          className="rounded-full border border-black px-8 py-4 font-semibold text-black transition hover:bg-orange-50"
        >
          📞 9919-6855
        </a>
      </div>
    </div>
      {/* RIGHT IMAGE */}
      <div className="relative">
        <div className="relative h-[420px] w-full overflow-hidden rounded-4xl shadow-xl">
         <Image
            src="/images/hero.jpg"
            alt="Бохир ус соруулах автомашин"
           fill
           priority
           className="object-cover"
         />
        </div>
      </div>
    </div>
   </section>
      {/* ================= SECTION TITLE ================= */}
      <section className="mx-auto max-w-6xl px-4 py-6 text-center md:py-8">
        <h2 className="text-xl font-semibold md:text-2xl">
          Манай үйлчилгээ
        </h2>
      </section>
      {/* ================= CARDS ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="
                group flex min-h-[360px] flex-col justify-between
                rounded-2xl border border-gray-200 bg-white p-4
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                transition-transform hover:-translate-y-1
              "
            >
              <div>
                <h3 className="text-[17px] font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {c.desc}
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[12px] font-medium text-blue-600 group-hover:text-blue-700">
                    Дэлгэрэнгүй →
                  </span>
                </div>
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* ================= VIDEO SECTION ================= */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Видео мэдээлэл
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {["mdlRfAvBASE", "Sn2oRYJK6aI", "dJmOUT_cOIE"].map((id) => (
              <iframe
                key={id}
                className="w-full aspect-video rounded-xl shadow"
                src={`https://www.youtube.com/embed/${id}`}
                allowFullScreen
              />
            ))}
          </div>
        </div>
      </section>
      {/* ================= FAQ ================= */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Асуулт, хариулт
          </h2>
          {[
            ["Бохир ус соруулаыхад үнэ яагаад өөр,өөр байдаг вэ?", "Үнэ нь хэмжээ болон захиалгын давтамж байршилаас хамаарч өөрчлөгддөг."],
            ["Захиалгын дараа төлбөрөө хийж болох уу?", "Тийм, та 24 цагийн дотор төлбөрөө хийх боломжтой."],
            ["Бохир соруулах дуудлага хэрхэн өгөх вэ?", "Та манай вэб хуудас дээр байрлах хэрэглэгч цэсний холбоо барих хэсгээс дуудлага өгөх олон төрлийн сонголтоос сонгох боломтой."],
            ["Ямар төлбөрийн хэрэгслүүд ашиглах вэ?", "Та банкны гүйлгээ, QPay, SocialPay, бэлэн мөнгөөр төлбөрөө хийж болно."],
            ["Бохир ус соруулах дуудлага өгсөн өдрөө өөрчлөх боломжтой юу?", "Боломжтой. Манай операторт хандана уу."],
          ].map(([q, a]) => (
            <details
              key={q}
              className="mb-4 rounded-xl bg-white p-4 shadow"
            >
              <summary className="cursor-pointer font-semibold">
                {q}
              </summary>
              <p className="mt-2 text-gray-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="pb-10" />
    </div>
  );
}
