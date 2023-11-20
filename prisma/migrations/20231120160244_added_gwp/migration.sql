-- AlterTable
ALTER TABLE "scope1_emission_summary" ADD COLUMN     "emission_source" VARCHAR(250);

-- AlterTable
ALTER TABLE "st_combus_hc_based_emis" ADD COLUMN     "per_unit" VARCHAR(255);

-- AlterTable
ALTER TABLE "st_combus_quant_based_emis" ADD COLUMN     "per_unit" VARCHAR(255);

-- CreateTable
CREATE TABLE "gwp" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reference" VARCHAR(50) NOT NULL,
    "gas" VARCHAR(50) NOT NULL,
    "gwp_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "gwp_pkey" PRIMARY KEY ("id")
);
