import React from "react";

export default function Example() {
  const stats = [
    { id: 1, name: "SCOPE 1", value: "8,000" },
    { id: 2, name: "SCOPE 2", value: "5,000" },
    { id: 3, name: "SCOPE 3", value: "30,000" },
    { id: 4, name: "TOTAL", value: "38,000" },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Emissions (CO2e-t) by Scope
            </h2>
            {/* <p className="mt-4 text-lg leading-8 text-gray-600">
              Emission is the total equivalent amount of CO2 produced
            </p> */}
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
