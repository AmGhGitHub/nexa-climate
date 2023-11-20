-- CreateTable
CREATE TABLE "st_combus" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fuel_type" VARCHAR(250) NOT NULL,
    "fuel_sub_type" VARCHAR(250) NOT NULL,
    "hc_value_mmbtu_per_base_unit" DOUBLE PRECISION NOT NULL,
    "base_unit" VARCHAR(50) NOT NULL,
    "unit_type" VARCHAR(50) NOT NULL,
    "CO2_emis_kgCO2_per_mmbtu" DOUBLE PRECISION NOT NULL,
    "CH4_emis_grCH4_per_mmbtu" DOUBLE PRECISION NOT NULL,
    "N2O_emis_grN2O_per_mmbtu" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "st_combus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "unit_type" VARCHAR(50) NOT NULL,
    "legit_unit" VARCHAR(50) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);
