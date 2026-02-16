"use client";

import Image from "next/image";
import Header from "../../app/components/Header";
import TruckCard from "../../app/components/TruckCard";
/*TRUCK DATA*/
const TRUCKS = [
  {
    image: "/images/truck1.jpg",
    driver: "—",
    phone: "94076855",
    capacity: "8 тонн",
  },
  {
    image: "/images/truck2.jpg",
    driver: "Алтансүх",
    phone: "94086855",
    capacity: "10 тонн",
  },
  {
    image: "/images/truck3.jpg",
    driver: "Олзбаяр",
    phone: "94096855",
    capacity: "18 тонн",
  },
];
  export default function AboutPage() {
   return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 text-gray-900">
         {/* ================= HERO ================= */}
          <section className="mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-2 items-center">
           <div>
              <p className="text-xs tracking-widest text-gray-500 mb-2">
                БОХИР УС • ТЭЭВЭРЛЭЛТ • ҮЙЛЧИЛГЭЭ
              </p>
             <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Өргөжих Хаус ХХК <br />
                <span className="text-black">
                 Найдвартай бохир ус соруулах үйлчилгээ
               </span>
              </h1>
              <p className="text-sm text-gray-700 leading-relaxed mb-5">
               Манай компани нь шингэн хог хаягдал (бохир ус) соруулах,
               тээвэрлэх, татан зайлуулах үйлчилгээг
               албан байгууллага, уул уурхайн компани, хувь хүмүүст
               мэргэжлийн түвшинд үзүүлж байна.
             </p>
             <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-6">
               <li>2005 оноос хойш тасралтгүй үйл ажиллагаа</li>
               <li>2014 оноос тусгай зөвшөөрөлтэй</li>
               <li>Hyundai, Kia тусгай зориулалтын машинууд</li>
             </ul>
           </div>
           <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/sewage.jpg"
                alt="Bohir us soruulah"
                width={700}
               height={450}
               className="object-cover w-full h-full"
             />
           </div>
         </section>
          {/* ================= COMPANY INFO ================= */}
         <section className="mx-auto max-w-5xl px-4 py-12">
           <h2 className="text-2xl font-semibold mb-6 text-center">
             Компаний танилцуулга
            </h2>
           <div className="space-y-4 text-gray-700 leading-relaxed">
             <p><strong>Байгуулагдсан он:</strong> 2005</p>
             <p><strong>Үйл ажиллагаа явуулсан хугацаа:</strong> 20 жил</p>
             <p><strong>Тусгай зөвшөөрөл:</strong> Тусгай зөвшөөрөлтэй үйл ажиллагааны мэдээлэл</p>
             <p>
               Ус хангамж, ариутгал татуургын чиглэлээр
                <strong> 2014 оноос тусгай зөвшөөрөлтэй</strong>.
             </p>
             <p>
                Гэрээт болон гэрээт бус байгууллага, уул уурхайн компани,
                хувь хүмүүстэй хамтран шингэн хог хаягдал тээвэрлэх,
               соруулах үйлчилгээ үзүүлдэг.
              </p>
              <p>
                Солонгос улсын тусгай зориулалтын Hyundai Truck, Kia Rhino автомашинуудыг ашиглан 
               шингэн хог хаягдал тээвэрлэх, бохирын шугамын бөглөрөл гаргах үйлчилгээ үзүүлж байна.
             </p>
             <p className="font-semibold">
                Өргөжих Хаус ХХК – таны итгэлт түнш.
             </p>
            </div>
         </section>
          {/* ================= TRUCKS ================= */}
          <section className="mx-auto max-w-5xl px-4 py-14">
           <h2 className="text-2xl font-semibold mb-8 text-center">
             Манай бохирын машинууд
           </h2>
           <div className="space-y-6">
              {TRUCKS.map((truck, index) => (
               <TruckCard key={index} {...truck} />
             ))}
           </div>
         </section>
       </main>
      </>
   );
 }
