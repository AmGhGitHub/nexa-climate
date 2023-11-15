-- CreateTable
CREATE TABLE "st_combus_heat_content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fuel_type" VARCHAR(250) NOT NULL,
    "fuel_sub_type" VARCHAR(250) NOT NULL,
    "hc_value" DOUBLE PRECISION NOT NULL,
    "hc_unit" VARCHAR(250) NOT NULL,

    CONSTRAINT "st_combus_heat_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "st_combus_quant_based_emis" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fuel_type" VARCHAR(250) NOT NULL,
    "fuel_sub_type" VARCHAR(250) NOT NULL,
    "co2_emis_value" DOUBLE PRECISION NOT NULL,
    "co2_emis_unit" VARCHAR(250) NOT NULL,
    "ch4_emis_value" DOUBLE PRECISION NOT NULL,
    "ch4_emis_unit" VARCHAR(250) NOT NULL,
    "n2o_emis_value" DOUBLE PRECISION NOT NULL,
    "n2o_emis_unit" VARCHAR(250) NOT NULL,

    CONSTRAINT "st_combus_quant_based_emis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "st_combus_hc_based_emis" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fuel_type" VARCHAR(250) NOT NULL,
    "fuel_sub_type" VARCHAR(250) NOT NULL,
    "co2_emis_value" DOUBLE PRECISION NOT NULL,
    "co2_emis_unit" VARCHAR(250) NOT NULL,
    "ch4_emis_value" DOUBLE PRECISION NOT NULL,
    "ch4_emis_unit" VARCHAR(250) NOT NULL,
    "n2o_emis_value" DOUBLE PRECISION NOT NULL,
    "n2o_emis_unit" VARCHAR(250) NOT NULL,

    CONSTRAINT "st_combus_hc_based_emis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scope1_emission_sources" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "source" VARCHAR(500) NOT NULL,

    CONSTRAINT "scope1_emission_sources_pkey" PRIMARY KEY ("id")
);
