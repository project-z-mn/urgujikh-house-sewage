import Image from "next/image";
interface TruckCardProps {
  image: string;
  driver: string;
  phone: string;
  capacity: string;
}
export default function TruckCard({
  image,
  driver,
  phone,
  capacity,
}: TruckCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-5 rounded-2xl bg-white p-5 shadow-md border">
      
      {/* IMAGE */}
      <div className="relative w-full md:w-[260px] h-[180px] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt="Бохирын машин"
          fill
          className="object-cover"
        />
      </div>
      {/* INFO */}
      <div className="flex flex-col justify-center text-gray-700">
        <p className="mb-1">
          <span className="font-semibold">Жолооч:</span>{" "}
          {driver || "—"}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Утас:</span>{" "}
          <a
            href={`tel:${phone}`}
            className="text-blue-600 hover:underline"
          >
            {phone}
          </a>
        </p>
        <p>
          <span className="font-semibold">Багтаамж:</span> {capacity}
        </p>
      </div>
    </div>
  );
}
