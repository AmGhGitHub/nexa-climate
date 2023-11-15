-- CreateTable
CREATE TABLE "scope1_emission_summary" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "report_date" TIMESTAMP(3) NOT NULL,
    "CO2_emis" DOUBLE PRECISION NOT NULL,
    "CH4_emis" DOUBLE PRECISION NOT NULL,
    "N2O_emis" DOUBLE PRECISION NOT NULL,
    "total_emis" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "scope1_emission_summary_pkey" PRIMARY KEY ("id")
);
