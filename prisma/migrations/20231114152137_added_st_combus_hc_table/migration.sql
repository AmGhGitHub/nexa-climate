-- CreateTable
CREATE TABLE "st_combus_heat_content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fuel_type" VARCHAR(250) NOT NULL,
    "fuel_sub_type" VARCHAR(250) NOT NULL,
    "hc_value" DOUBLE PRECISION NOT NULL,
    "hc_unit" VARCHAR(250) NOT NULL,

    CONSTRAINT "st_combus_heat_content_pkey" PRIMARY KEY ("id")
);
