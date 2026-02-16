"use client";
import { useState } from "react";
interface Partner {
  name: string;
  description: string;
}
const partners: Partner[] = [
  { name: "СИ ЭМ И СИ ИНЖЕНЕРИНГ ХХК", description: "Сайншандын салхин цахилгаан станц төсөл (2018–2019)" },
  { name: "Цагаан өвөлжөө ХХК", description: "Өмнөговь аймгийн Ноён сум (2018–2019)" },
  { name: "СТЭП ГОЛД ХХК", description: "Дорнод аймгийн Цагаан овоо сум (2020–2021)" },
  { name: "М БИ СИ АЗИА ПАСИФИК ХХК", description: "TIGER шар айрагны үйлдвэр (2022)" },
  { name: "УБЦТС ХК", description: "Салбар нэгжүүд (2013 оноос)" },
  { name: "МОНГОЛ ЭКСПРЕСС ХХК", description: "Гаалийн баталгаат агуулах (2013 оноос)" },
  { name: "Корпорейт Хотел Энд Ресорт ХХК", description: "Нүхт зочид буудал (2015 оноос)" },
  { name: "Уламжлалт анагаах ухаан судлалын төв", description: "Богд уул сувилал (2016 оноос)" },
  { name: "UFC ТРЕЙД ХХК", description: "Чацарганы үйлдвэр (2017 оноос)" },
  { name: "СҮХБААТАР ДЭВШИЛ ОНӨААТҮГ", description: "Авто граж, оффис (2018 оноос)" },
  { name: "ПЕРФЕКТ МОТОР ХХК", description: "Засварын төв (2018 оноос)" },
  { name: "МҮГЭН КУАЛИТИ ХХК", description: "Засварын төв (2018 оноос)" },
  { name: "ДӨЛГӨӨН БАРС ХХК", description: "Хөнгөн блокны үйлдвэр (2018 оноос)" },
  { name: "АВТО ДИЗЕЛЬ ХХК", description: "Авто граж (2018 оноос)" },
  { name: "ДҮНХЭН УУЛЫН БУУРАЛ УЛИАСТАЙ ХХК", description: "World Teelj Resort (2019 оноос)" },
  { name: "MCM GROUP ХХК", description: "Оффис өргөх насосны засвар (2019 оноос)" },
  { name: "ПЕТРОВИС ХХК", description: "УБ хотын салбар ШТС-ууд (2019 оноос)" },
  { name: "КОМКАТ СИ ЭЛ ЭЙЧ ХХК", description: "Хүнд машин механизмын засвар (2019 оноос)" },
  { name: "МАЛЧИН ХХК", description: "Худалдааны салбар (2019 оноос)" },
  { name: "МОНГОЛ ИАНКААР МАРКЕТ ХХК", description: "Машин механизмын төв (2020 оноос)" },
  { name: "МОНМАГНИТ ХХК", description: "Тавилгын үйлдвэр (2022 оноос)" },
  { name: "МОНКАБЕЛЬ СИСТЕМС ХХК", description: "Оффис (2022 оноос)" },
  { name: "МАПА ИНШААТ ВЭ ТИЖАРЕТ ХХК", description: "Ус гүн цэвэршүүлэх байгууламжийн төсөл (2022 оноос)" },
  { name: "АКУМА ЭРИН ХХК", description: "Засварын төв (2022 оноос)" },
  { name: "М СИ ЭС ПРОПЕРТИ ХХК", description: "Чингис хаан нисэх буудал, ТЦБ төсөл (2023 оноос)" },
];
export default function PartnersPage() {
  const [query, setQuery] = useState("");

  const filtered = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* TITLE */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Хамтран ажилласан байгууллага, төслүүд
          </h1>
          <p className="mt-3 text-gray-600">
            MCSC Concrete компанитай хамтран хэрэгжүүлсэн бодит төслүүд
          </p>
        </header>
        {/* SEARCH */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Байгууллага эсвэл төсөл хайх..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            Илэрц олдсонгүй
          </p>
        )}
      </div>
    </section>
  );
}
