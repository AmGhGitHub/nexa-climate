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
