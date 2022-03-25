-- DropForeignKey
ALTER TABLE "IrregularDate" DROP CONSTRAINT "IrregularDate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IrregularDate" ADD CONSTRAINT "IrregularDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "IrregularDate.uuid_unique" RENAME TO "IrregularDate_uuid_key";

-- RenameIndex
ALTER INDEX "Project.uuid_unique" RENAME TO "Project_uuid_key";

-- RenameIndex
ALTER INDEX "Task.uuid_unique" RENAME TO "Task_uuid_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.name_unique" RENAME TO "User_name_key";

-- RenameIndex
ALTER INDEX "User.uuid_unique" RENAME TO "User_uuid_key";
