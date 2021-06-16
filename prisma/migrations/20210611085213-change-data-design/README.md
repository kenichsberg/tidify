# Migration `20210611085213-change-data-design`

This migration has been generated at 6/11/2021, 5:52:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."Role" AS ENUM ('MANAGER', 'MEMBER')

CREATE TYPE "public"."Status" AS ENUM ('NEW', 'WIP', 'PENDING', 'DONE')

CREATE TYPE "public"."DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')

CREATE TYPE "public"."DayType" AS ENUM ('OFF', 'WORK')

CREATE TABLE "User" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'MEMBER',
    "durationPerDay" INTEGER NOT NULL DEFAULT 8,
    "dayOff" "DayOfWeek"[],

    PRIMARY KEY ("id")
)

CREATE TABLE "Project" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Task" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rank" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'WIP',
    "plannedDuration" INTEGER NOT NULL DEFAULT 0,
    "actualDuration" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "IrregularDate" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "DayType" NOT NULL DEFAULT E'OFF',
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "_ProjectToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "User.name_unique" ON "User"("name")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B")

CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B")

ALTER TABLE "Task" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Task" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "IrregularDate" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_ProjectToUser" ADD FOREIGN KEY("A")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_ProjectToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210611085213-change-data-design
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,87 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id          Int       @id @default(autoincrement())
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @default(now())
+  name        String    @unique
+  email       String    @unique
+  role        Role      @default(MEMBER)
+  projects    Project[]
+  tasks       Task[]
+  durationPerDay  Int   @default(8)
+  dayOff      DayOfWeek[]
+}
+
+model Project {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @default(now())
+  name        String
+  startAt     DateTime
+  endAt       DateTime
+  users       User[]
+  tasks       Task[]
+}
+
+model Task {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @default(now())
+  rank        Int
+  name        String
+  status      Status   @default(WIP)
+  plannedDuration   Int   @default(0)
+  actualDuration    Int   @default(0)
+  user        User     @relation(fields: [userId], references: [id])
+  userId      Int
+  project     Project  @relation(fields: [projectId], references: [id])
+  projectId   Int
+}
+
+model IrregularDate {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @default(now())
+  date  DateTime
+  type  DayType   @default(OFF)
+  user        User     @relation(fields: [userId], references: [id])
+  userId      Int
+}
+
+enum Role {
+  MANAGER
+  MEMBER
+}
+
+enum Status {
+  NEW
+  WIP
+  PENDING
+  DONE
+}
+
+enum DayOfWeek {
+  MON
+  TUE
+  WED
+  THU
+  FRI
+  SAT
+  SUN
+}
+
+enum DayType {
+  OFF
+  WORK
+}
```


