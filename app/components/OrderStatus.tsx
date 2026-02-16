const steps = [
  'PENDING',
  'CONFIRMED',
  'DONE',
]

const labels = {
  PENDING: 'Хүлээгдэж байна',
  CONFIRMED: 'Баталгаажсан',
  DONE: 'Дууссан',
  CANCELLED: 'Цуцлагдсан',
}

export default function OrderStatus({
  status,
}: {
  status: string
}) {
  if (status === 'CANCELLED') {
    return (
      <div className="mt-4 text-red-600 text-sm font-medium">
        ❌ Захиалга цуцлагдсан
      </div>
    )
  }

  const current = steps.indexOf(status)

  return (
    <div className="flex items-center gap-3 mt-4">
      {steps.map((step, i) => (
        <div
          key={step}
          className="flex items-center gap-2"
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
            ${
              i <= current
                ? 'bg-green-600 text-white'
                : 'bg-gray-300'
            }`}
          >
            {i + 1}
          </div>

          <span className="text-xs">
            {labels[
              step as keyof typeof labels
            ]}
          </span>

          {i < steps.length - 1 && (
            <div className="w-6 h-px bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
}
