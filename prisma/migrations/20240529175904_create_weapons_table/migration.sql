-- CreateTable
CREATE TABLE "weapons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weapons_name_key" ON "weapons"("name");

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
